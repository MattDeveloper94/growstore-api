import { OrderRepository } from "./order.repository";
import { AddressRepository } from "../../address/address.repository";
import { CartRepository } from "../../cart/cart/cart.repository";
import { AppError } from "../../../middlewares/error.handler";
import { OrderItemRepository } from "../orderItem/orderItem.repository";
import { ProductVariantRepository } from "../../product/productVariant/productVariant.repository";

const orderRepository = new OrderRepository();
const addressRepository = new AddressRepository();
const cartRepository = new CartRepository();
const orderItemRepository = new OrderItemRepository();
const productVariantRepository = new ProductVariantRepository();

export class OrderService {
    public async createOrder(userId: string, addressId: string) {
        // check cart
        const cart = await cartRepository.findByUserId(userId);
        if (!cart)
            throw new AppError("Cart not found", 404);

        if (cart.cartItems.length === 0)
            throw new AppError("Cart is empty", 400);

        // check address
        const address = await addressRepository.findById(addressId)
        if (!address || address.userId !== userId)
            throw new AppError("Address not found", 404);

        // Validar produtos
        for (const item of cart.cartItems) {
            if (item.productVariant.product.status !== "ACTIVE") {
                throw new AppError("Product is unavailable", 400);
            }
        }

        // check stock
        for (const item of cart.cartItems) {
            if (item.productVariant.stock < item.quantity) {
                throw new AppError("Insufficient stock", 400);
            }
        }

        // calculate total value
        const totalAmount = cart.cartItems.reduce((total, item) => {
            return total + Number(item.productVariant.price) * item.quantity
        }, 0);

        // create order
        const order = await orderRepository.createOrder({
            totalAmount,
            userId,
            addressId
        });

        // create orderItems
        const orderItems = cart.cartItems.map((item) => ({
            orderId: order.id,
            productVariantId: item.productVariant.id,
            productName: item.productVariant.product.productName,
            sku: item.productVariant.sku,
            quantity: item.quantity,
            unitPrice: Number(item.productVariant.price)
        }));

        await orderItemRepository.createOrderItem(orderItems);

        // lower stock
        for (const item of cart.cartItems) {
            const newStock = item.productVariant.stock - item.quantity
            await productVariantRepository.updateStock(item.productVariant.id, newStock);
        }

        // clean cart
        await cartRepository.deleteAll(cart.id);

        // return complete order
        const fullOrder = await orderRepository.findById(order.id);
        return fullOrder;
    }
}