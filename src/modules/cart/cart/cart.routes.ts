import { Router, Request, Response, NextFunction } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { CartController } from "./cart.controller";

const cartController = new CartController();
const router = Router();

router.get("/cart/me", authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await cartController.getCart(req, res)
        } catch (error: any) {
            next(error);
        }
    });

export default router;