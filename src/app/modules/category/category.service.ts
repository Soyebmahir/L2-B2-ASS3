import { TCategory } from "./category.interface"
import { Category } from "./category.model"

const createCategoryIntoDb = async (payload: TCategory) => {
    const result = Category.create(payload)
    return result
}
const getAllCategoriesFromDb = async () => {
    const result = await Category.find()
    return result
}

export const CategoryServices = {
    createCategoryIntoDb,
    getAllCategoriesFromDb
}