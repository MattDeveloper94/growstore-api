import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string().trim().min(3, "Name must have at least 3 characters"),
    email: z.email("Invalid email"),
    password: z.string().trim().min(6, "Password must have at least 6 characters"),
    birthDate: z.iso.date()
});

export type CreateUserDto = z.infer<typeof createUserSchema>;