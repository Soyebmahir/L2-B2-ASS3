import { Schema, model } from "mongoose";
import { CategoryModel, TCategory } from "./category.interface";


const CategorySchema = new Schema<TCategory, CategoryModel>({
    name: {
        type: String,
        unique: true
    }
})


CategorySchema.statics.isCategoryExist = async function (id: string) {
    const existingCategory = await Category.findOne({ _id: id });
    return existingCategory;

}
export const Category = model<TCategory, CategoryModel>('Category', CategorySchema)