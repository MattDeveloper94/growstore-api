import { z } from "zod";

export const createCartItemSchema = z.object({
    productVariantId: z.uuid("Invalid product variant ID"),
    quantity: z.number().int("Quantity must be an integer").positive()
});

export type CreateCartItemDto = z.infer<typeof createCartItemSchema>;