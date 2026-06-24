import { z } from "zod";

export const createAddressSchema = z.object({
    label: z.string().trim().min(1, "Label must have at least 1 character"),
    zipCode: z.string().regex(/^\d{5}-\d{3}$/, "Invalid zip code format. Expected: 12345-123"),
    number: z.string().trim().min(1, "Number must have at least 1 character"),
    complement: z.string().trim().optional(),
    referencePoint: z.string().trim().optional(),
    street: z.string().trim().optional(),
    neighborhood: z.string().trim().optional(),
    city: z.string().trim().optional(),
    state: z.string().trim().optional(),
});

export type CreateAddressDto = z.infer<typeof createAddressSchema>;

