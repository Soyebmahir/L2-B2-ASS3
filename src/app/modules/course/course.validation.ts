import { z } from 'zod';


const tagsValidationSchema = z.object({
    name: z.string(),

});

const detailsValidationSchema = z.object({
    level: z.string(),
    description: z.string(),
});


export const courseSchema = z.object({
    title: z.string(),
    instructor: z.string(),
    categoryId: z.string(),
    price: z.number(),
    tags: z.array(tagsValidationSchema),
    startDate: z.string(),
    endDate: z.string(),
    language: z.string(),
    provider: z.string(),
    durationInWeeks: z.number(),
    details: detailsValidationSchema,
});