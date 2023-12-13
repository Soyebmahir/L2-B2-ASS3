import { z } from 'zod';


const tagsValidationSchema = z.object({
    name: z.string(),

});

const detailsValidationSchema = z.object({
    level: z.string(),
    description: z.string(),
});


const courseValidationSchema = z.object({
    body: z.object({
        title: z.string(),
        instructor: z.string(),
        categoryId: z.string(),
        price: z.number(),
        tags: z.array(tagsValidationSchema),
        startDate: z.string(),
        endDate: z.string(),
        language: z.string(),
        provider: z.string(),

        details: detailsValidationSchema,
    })
});




const UpdatedetailsValidationSchema = z.object({
    level: z.string().optional(),
    description: z.string().optional(),
});
const updateCourseValidationSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        instructor: z.string().optional(),
        categoryId: z.string().optional(),
        price: z.number().optional(),
        tags: z.array(tagsValidationSchema).optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        language: z.string().optional(),
        provider: z.string().optional(),

        details: UpdatedetailsValidationSchema.optional(),
    })
});


export const CourseValidations = {
    courseValidationSchema,
    updateCourseValidationSchema
}