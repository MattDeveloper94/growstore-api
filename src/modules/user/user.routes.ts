import { Router, Response, Request, NextFunction } from "express";
import { UserController } from "./user.controller";
import { validateBody } from "../../middlewares/validateBody.middleware";
import { createUserSchema } from "./schemas/createUser.schema";
import { authMiddleware } from "../../middlewares/auth.middleware";

const userController = new UserController();
const router = Router();

router.post("/register", validateBody(createUserSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await userController.create(req, res)
        } catch (error: any) {
            next(error);
        }
    });

router.get("/me", authMiddleware, (req, res) => {
    return res.json({
        ok: true,
        user: req.user,
    });
});

export default router