import { AppError } from "../../../middlewares/error.handler";
import { CartRepository } from "./cart.repository";

const cartRepository = new CartRepository();

export class CartService {
    public async getCart(userId: string) {
        const cart = await cartRepository.findByUserId(userId)
        if (!cart) {
            throw new AppError("Cart not found", 404);
        }

        return cart;
    }
}