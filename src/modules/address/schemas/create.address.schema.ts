import { z } from "zod";

export const createAddressSchema = z.object({
    label: z.string().min(1, "Label must have at least 1 character"),
    zipCode: z.string().regex(/^\d{5}-\d{3}$/, "Invalid zip code format. Expected: 12345-123"),
    number: z.string().min(1, "Number must have at least 1 character"),
    complement: z.string().optional(),
    referencePoint: z.string().optional(),
    street: z.string().optional(),
    neighborhood: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
});

export type CreateAddressDto = z.infer<typeof createAddressSchema>;

