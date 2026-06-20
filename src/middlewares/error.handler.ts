import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { Response, Request, NextFunction } from "express";

export class AppError extends Error {
    constructor(message: string, public statusCode = 400) {
        super(message);
    }
}

export function handleError(err: any, req: Request, res: Response, next: NextFunction) {

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            ok: false,
            message: err.message,
        });
    }

    if (err instanceof PrismaClientKnownRequestError) {

        switch (err.code) {
            case "P2002":
                return res.status(409).json({
                    ok: false,
                    message: "Record already exists"
                });

            case "P2003":
                return res.status(400).json({
                    ok: false,
                    message: "Referenced record does not exist"
                });

            case "P2025":
                return res.status(404).json({
                    ok: false,
                    message: "Record not found"
                });

            default:
                return res.status(400).json({
                    ok: false,
                    message: "Database error"
                });
        }
    }

    console.error(err);

    return res.status(500).json({
        ok: false,
        message: "Internal server error",
    });
}