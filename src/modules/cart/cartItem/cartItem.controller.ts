import { Request, Response } from "express";
import { AppError } from "../../../middlewares/error.handler";
import { CartItemService } from "./cartItem.service";

const cartItemService = new CartItemService();

export class CartItemController {
    public async createCartItem(req: Request, res: Response) {
        if (!req.user) {
            throw new AppError("Unauthorized", 401);
        }

        const cartItem = await cartItemService.createCartItem(req.user.id, req.body);

        return res.status(201).json({
            ok: true,
            data: cartItem
        });
    }
}