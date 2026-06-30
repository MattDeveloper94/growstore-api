import { z } from "zod";

export const createOrderItemSchema = z.object({
    orderId: z.uuid("Invalid order ID"),
    productVariantId: z.uuid("Invalid product variant ID"),
    productName: z.string().max(80, "maximum limit: 80 characters"),
    sku: z.string(),
    quantity: z.number().int("Quantity must be an integer").positive(),
    unitPrice: z.number().positive()
});

export type createOrderItemDto = z.infer<typeof createOrderItemSchema>;