import { Router, Request, Response, NextFunction } from "express";
import { AuthController } from "./auth.controller";
import { validateBody } from "../../middlewares/validateBody.middleware";
import { loginSchema } from "./schemas/login.schema";

const authController = new AuthController();
const router = Router();

router.post("/login", validateBody(loginSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await authController.login(req, res)
        } catch (error: any) {
            next(error);
        }
    });

export default router