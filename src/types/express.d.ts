import { Role } from "../../generated/prisma/enums";

// Empty export used to make this file a TypeScript module.
// Required for the Request type extension below.
export { };

declare module "express-serve-static-core" {
    interface Request {
        user?: {
            id: string;
            role: Role;
        }
    }
}