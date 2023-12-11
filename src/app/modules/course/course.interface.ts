import { Types } from "mongoose";

export type TTagsObject = {
    name: string;
    isDeleted?: boolean;
}
export type TDetailsObject = {
    level: string;
    description: string;
}

export type TCourse = {
    title: string;
    instructor: string;
    categoryId: Types.ObjectId;
    price: number;
    tags: [TTagsObject];
    startDate: string;
    endDate: string;
    language: string;
    provider: string;
    durationInWeeks: number;
    details: TDetailsObject
}