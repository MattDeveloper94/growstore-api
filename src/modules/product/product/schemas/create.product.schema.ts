import { z } from "zod";
import { Gender } from "../../../../../generated/prisma/enums";

export const createProductSchema = z.object({
    productName: z.string().trim().min(2, "Field must have at least 2 characters").max(100, "Maximum character limit exceeded! Limit: 100."),
    description: z.string().trim().min(20, "Field must have at least 20 characters").max(1000, "Maximum character limit exceeded! Limit: 1000."),
    brand: z.string().trim().min(1, "Field must have at least 1 character").max(60, "Maximum character limit exceeded! Limit: 60."),
    collection: z.string().trim().min(1, "Field must have at least 1 character").max(60, "Maximum character limit exceeded! Limit: 60."),
    material: z.string().trim().min(1, "Field must have at least 1 character").max(60, "Maximum character limit exceeded! Limit: 60."),
    gender: z.enum(Gender),
    categoryId: z.uuid()
});

export type CreateProductDto = z.infer<typeof createProductSchema>;