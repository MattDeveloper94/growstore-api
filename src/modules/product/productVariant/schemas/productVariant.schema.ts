import { z } from "zod";

export const createProductVariantSchema = z.object({
    color: z.string().trim().min(3, "Color is required").max(20, "Color must have at most 20 characters").regex(/^[A-Za-zÀ-ÿ\s-]+$/, "Color must contain only letters"),
    size: z.string().trim().min(1, "Must have at least 1 character").max(10, "Must have at most 10 characters"),
    stock: z.int(),
    price: z.number().positive("Price must be greater than 0"),
    productId: z.uuid().trim()
});

export type CreateProductVariantDto = z.infer<typeof createProductVariantSchema>;