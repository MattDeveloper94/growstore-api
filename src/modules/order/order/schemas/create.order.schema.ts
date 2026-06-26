import { z } from "zod";

export const createOrderSchema = z.object({
    addressId: z.uuid("Invalid address id"),
});

export type CreateOrderDto = z.infer<typeof createOrderSchema>;