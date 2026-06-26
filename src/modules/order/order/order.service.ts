import { OrderRepository } from "./order.repository";
import { AddressRepository } from "../../address/address.repository";
import { CartRepository } from "../../cart/cart/cart.repository";
import { AppError } from "../../../middlewares/error.handler";

const orderRepository = new OrderRepository();
const addressRepository = new AddressRepository();
const cartRepository = new CartRepository();

export class OrderService {
    public async createOrder(userId: string, addressId: string) {
        const cart = await cartRepository.findByUserId(userId);
        if (!cart)
            throw new AppError("Cart not found", 404);

        if (cart.cartItems.length === 0)
            throw new AppError("Cart is empty", 400);

        const address = await addressRepository.findById(addressId)

        if (!address || address.userId !== userId)
            throw new AppError("Address not found", 404);

        const totalAmount = cart.cartItems.reduce((total, item) => {
            return total + Number(item.productVariant.price) * item.quantity
        }, 0);

        const order = await orderRepository.createOrder({
            totalAmount,
            userId,
            addressId
        });

        return order;
    }
}