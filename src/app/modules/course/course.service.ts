/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TCourse } from "./course.interface";
import Course from "./course.model";
import httpStatus from "http-status";
import AppError from "../../Errors/AppError";
import { ReviewModel } from "../review/review.model";


const createCourseIntoDb = async (payload: TCourse) => {
    const result = await Course.create(payload)
    return result;

}
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
    const sortFields = ["title", "price", "startDate", " endDate", "language", "durationInWeeks"]

    const page = query?.page ? parseInt(query.page as string) : 1;
    const limit = query?.limit ? parseInt(query.limit as string) : 10;


    let sortBy = query?.sortBy || 'createdAt';
    if (!sortFields.includes(sortBy as string)) {
        // If not, default to 'createdAt'
        sortBy = 'createdAt';
    }
    const sortOrder = query?.sortOrder && (query.sortOrder as string).toLowerCase() as string === 'desc' ? -1 : 1;

    const filter: Record<string, any> = {};

    if (query?.minPrice) {
        filter.price = { $gte: parseFloat(query.minPrice as string) };
    }

    if (query?.maxPrice) {
        filter.price = { ...filter.price, $lte: parseFloat(query.maxPrice as string) };
    }

    if (query?.tags) {
        filter['tags.name'] = query.tags;
    }

    if (query?.startDate) {
        filter.startDate = { $gte: new Date(query.startDate as string) };
    }

    if (query?.endDate) {
        filter.endDate = { $lte: new Date(query.endDate as string) };
    }

    if (query?.language) {
        filter.language = query.language;
    }

    if (query?.provider) {
        filter.provider = query.provider;
    }

    if (query?.durationInWeeks) {
        filter.durationInWeeks = parseInt(query.durationInWeeks as string);
    }

    if (query?.level) {
        filter['details.level'] = query.level;
    }


    const result = await Course.aggregate([
        {
            $match: filter,
        },
        {
            $sort: { [sortBy as string]: sortOrder },
        },
        {
            $skip: (page - 1) * limit,
        },
        {
            $limit: limit,
        },
    ])
    return result;
}

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {


    const { tags, details, startDate, endDate, ...remainingInfo } = payload;


    const session = await mongoose.startSession()

    try {
        session.startTransaction();
        const modifiedUpdateData: Record<string, unknown> = { ...remainingInfo }
        if (details && Object.keys(details).length) {
            for (const [key, value] of Object.entries(details)) {
                modifiedUpdateData[`details.${key}`] = value
            }
        }
        const basicCourseInfoUpdate = await Course.findByIdAndUpdate(id, modifiedUpdateData, {
            new: true,
            runValidators: true,
            session
        })
        if (!basicCourseInfoUpdate) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Course')
        }
        // console.log();
        if (startDate || endDate) {
            // Update startDate, endDate, and recalculate durationInWeeks
            const updatedCourse = await Course.findByIdAndUpdate(id, {
                startDate: startDate || basicCourseInfoUpdate.startDate,
                endDate: endDate || basicCourseInfoUpdate.endDate,
            }, {
                new: true,
                runValidators: true,
                session
            });
            if (updatedCourse) {
                const startDateToUpdate = updatedCourse.startDate;
                const endDateToUpdate = updatedCourse.endDate;

                const durationInWeeks = Math.ceil((new Date(endDateToUpdate).getTime() - new Date(startDateToUpdate).getTime()) / (7 * 24 * 60 * 60 * 1000));

                // Update durationInWeeks
                await Course.findByIdAndUpdate(id, { durationInWeeks }, {
                    new: true,
                    runValidators: true,
                    session
                });
            }

        }

        if (tags && tags.length > 0) {
            const deleteTags = tags?.filter(el => el.name && el.isDeleted).map(el => el.name)
            const deletedTags = await Course.findByIdAndUpdate(id, {
                $pull: { tags: { name: { $in: deleteTags } } }
            }, {
                new: true,
                runValidators: true,
                session
            })

            if (!deletedTags) {
                throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Tags ')
            }

            const newTagsForCourse = tags.filter(el => el.name && !el.isDeleted)
            const addedTagsIntoCourse = await Course.findByIdAndUpdate(id, {
                $addToSet: {
                    tags: {
                        $each: newTagsForCourse
                    }
                }
            },
                {
                    new: true,
                    runValidators: true,
                    session
                })
            if (!addedTagsIntoCourse) {
                throw new AppError(httpStatus.BAD_REQUEST, 'Failed To add new Tags')
            }
        }


        const result = await Course.findById(id)
        await session.commitTransaction()
        await session.endSession()
        return result


    } catch (error) {

        await session.abortTransaction()
        await session.endSession()
        throw new AppError(httpStatus.BAD_REQUEST, 'Something Went Wrong')


    }


}


const getSingleCourseWithReviewsFromDB = async (courseId: string) => {
    const course = await Course.findById(courseId).select(
        "-createdAt -updatedAt -__v",
    );
    if (!course) {
        throw new AppError(httpStatus.NOT_FOUND, "Course Not Exits!!!");
    }
    const reviews = await ReviewModel.find({ courseId: course._id }).select(
        "-createdAt -updatedAt -__v -_id",
    );
    return {
        course,
        reviews,
    };
};

const getBestCourseWithReviewAverageFromDB = async () => {
    const bestCourse = await ReviewModel.aggregate([
        {
            $group: {
                _id: "$courseId",
                reviewCount: { $sum: 1 },
                ratings: { $sum: "$rating" },
            },
        },
        {
            $project: {
                course: "$_id",
                reviewCount: 1,
                averageRating: { $divide: ["$ratings", "$reviewCount"] },
                _id: 0,
            },
        },
        {
            $sort: { averageRating: -1 },
        },
        {
            $limit: 1,
        },
        {
            $lookup: {
                from: "courses",
                localField: "course",
                foreignField: "_id",
                as: "course",
            },
        },
        {
            $project: {
                "course.createdAt": 0,
                "course.updatedAt": 0,
                "course.__v": 0,
            },
        },
    ]);

    const course = bestCourse[0];
    return {
        course: course.course[0],
        averageRating: course.averageRating,
        reviewCount: course.reviewCount,
    };

};

export const CourseServices = {
    createCourseIntoDb,
    getAllCourseFromDB,
    updateCourseIntoDB,
    getSingleCourseWithReviewsFromDB,
    getBestCourseWithReviewAverageFromDB
}