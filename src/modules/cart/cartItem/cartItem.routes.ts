import { Router, Request, Response, NextFunction } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { CartItemController } from "./cartItem.controller";
import { validateBody } from "../../../middlewares/validateBody.middleware";
import { createCartItemSchema } from "./schemas/create.cartitem.schema";

const cartItemController = new CartItemController();
const router = Router();

router.post("/cartitems",
    validateBody(createCartItemSchema),
    authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await cartItemController.createCartItem(req, res)
        } catch (error: any) {
            next(error);
        }
    });

export default router;