import { TReview } from "./review.interface";
import { ReviewModel } from "./review.model";

const createCourseIntoDb = async (payload: TReview) => {
    const result = await ReviewModel.create(payload)
    return result;

}
const getAllReviews = async () => {
    const result = await ReviewModel.find()
    return result;
}

export const ReviewServices = {
    createCourseIntoDb,
    getAllReviews
}