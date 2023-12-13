import { TReview } from "./review.interface";
import { ReviewModel } from "./review.model";

const createCourseIntoDb = async (payload: TReview) => {
    const result = await ReviewModel.create(payload)
    return result;

}

export const ReviewServices = {
    createCourseIntoDb
}