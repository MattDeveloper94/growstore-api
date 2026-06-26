import { Request, Response } from "express";
import { CartService } from "./cart.service";
import { AppError } from "../../../middlewares/error.handler";

const cartService = new CartService();

export class CartController {
    public async getCart(req: Request, res: Response) {
        if (!req.user) {
            throw new AppError("Unauthorized", 401);
        }

        const { id } = req.user;
        const cart = await cartService.getCart(id)

        return res.status(200).json({
            ok: true,
            data: cart
        });
    }
}