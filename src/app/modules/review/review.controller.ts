import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { ReviewServices } from "./review.service";


const createReview = catchAsync(async (req, res) => {
    const result = await ReviewServices.createCourseIntoDb(req.body)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Review Created Successfully',
        data: result
    })
})
const getAllReviews = catchAsync(async (req, res) => {
    const result = await ReviewServices.getAllReviews()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Reviews Found Successfully',
        data: result
    })
})
export const ReviewController = {
    createReview,
    getAllReviews

}