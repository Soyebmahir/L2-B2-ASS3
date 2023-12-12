import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";
import httpStatus from 'http-status';

const createCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.createCourseIntoDb(req.body)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Course Created Successfully',
        data: result

    })
})
export const CourseController = {
    createCourse
}