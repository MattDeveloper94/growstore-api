import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";

export function roleMiddleware(...roles: Role[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                ok: false,
                message: "Access denied",
            });
        }

        next();
    }
}