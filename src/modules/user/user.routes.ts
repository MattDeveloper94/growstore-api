import { Router, Response, Request, NextFunction } from "express";
import { UserController } from "./user.controller";

const userController = new UserController();
const router = Router();

router.post("/users", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userController.create(req, res)
    } catch (error: any) {
        next(error);
    }   
});

export default router