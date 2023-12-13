/* eslint-disable @typescript-eslint/no-explicit-any */
import { TCourse } from "./course.interface";
import Course from "./course.model";

const createCourseIntoDb = async (payload: TCourse) => {
    const result = await Course.create(payload)
    return result;

}
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
    const page = query?.page ? parseInt(query.page as string) : 1;
    const limit = query?.limit ? parseInt(query.limit as string) : 10;
    const sortBy = query?.sortBy || 'createdAt';
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

export const CourseServices = {
    createCourseIntoDb,
    getAllCourseFromDB
}