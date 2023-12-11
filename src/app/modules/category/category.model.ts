import { Schema, model } from "mongoose";
import { TCategory } from "./category.interface";

const CategorySchema = new Schema<TCategory>({
    name: {
        type: String,
        unique: true
    }
})

export const Category = model<TCategory>('Category', CategorySchema)