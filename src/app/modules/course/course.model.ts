import { Schema, model } from "mongoose";
import { TCourse, TDetailsObject, TTagsObject } from "./course.interface";

const tagsSchema = new Schema<TTagsObject>({
    name: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
});

const detailsSchema = new Schema<TDetailsObject>({
    level: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const courseSchema = new Schema<TCourse>({
    title: {
        type: String,
        required: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    tags: {
        type: [tagsSchema],
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    provider: {
        type: String,
        required: true,
    },
    durationInWeeks: {
        type: Number,
        required: true,
    },
    details: {
        type: detailsSchema,
        required: true,
    },
});

const Course = model<TCourse>('Course', courseSchema);

export default Course;