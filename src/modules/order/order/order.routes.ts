import { NextFunction, Request, Response, Router } from "express";
import { OrderController } from "./order.controller";
import { validateBody } from "../../../middlewares/validateBody.middleware";
import { createOrderSchema } from "./schemas/create.order.schema";
import { authMiddleware } from "../../../middlewares/auth.middleware";

const router = Router();
const orderController = new OrderController();

router.post("/orders",
    validateBody(createOrderSchema),
    authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await orderController.createOrder(req, res)
        } catch (error: any) {
            next(error)
        }
    }
)

export default router;