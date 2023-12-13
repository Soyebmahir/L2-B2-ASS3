import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CategoryServices } from "./category.service";


const createCategory = catchAsync(async (req, res) => {
    const result = await CategoryServices.createCategoryIntoDb(req.body)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Category Created Successfully',
        data: result
    })
})
const getAllCategories = catchAsync(async (req, res) => {
    const result = await CategoryServices.getAllCategoriesFromDb()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Categories Found Successfully',
        data: result
    })
})
export const CategoryController = {
    createCategory,
    getAllCategories
}