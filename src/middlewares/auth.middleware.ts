import { Request, Response, NextFunction } from "express";
import { Role } from "../../generated/prisma/enums";
import { AppError } from "./error.handler";
import { envs } from "../config/env";
import jwt from "jsonwebtoken";

type JwtPayload = { id: string, role: Role }
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError("invalid token!", 401);
    }

    // Removes the "Bearer" prefix and keeps only the JWT token.
    // Example: "Bearer abc123" → ["Bearer", "abc123"] → "abc123"
    const token = authHeader.split(" ")[1]?.trim()

    if (!token) {
        throw new AppError("invalid token!", 401);
    }

    try {
        const payload = jwt.verify(token, envs.JWT_SECRET!) as JwtPayload;
        req.user = payload;
        next();

    } catch (error: any) {
        throw new AppError("invalid or expired token!", 401);
    }

}