import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export function validateBody(schema: z.ZodType) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body)

        if (!result.success) {
            return res.status(400).json({
                ok: false,
                errors: result.error.issues.map((issue) => {
                    if (issue.path.length === 1) {
                        return {
                            field: issue.path[0],
                            message: issue.message
                        }
                    }
                    return {
                        path: issue.path.join(" > "),
                        field: issue.path[issue.path.length - 1],
                        message: issue.message
                    }
                })
            });
        }

        next();
    };
}