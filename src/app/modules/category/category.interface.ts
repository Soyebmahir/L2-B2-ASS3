import { Model } from "mongoose"

export type TCategory = {
    name: string
}

export interface CategoryModel extends Model<TCategory> {
    isCategoryExist(id: string): Promise<TCategory | null>
}