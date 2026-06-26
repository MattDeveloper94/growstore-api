import { CartItemRepository } from "./cartItem.repository";
import { CartRepository } from "../cart/cart.repository";
import { CreateCartItemDto } from "./schemas/create.cartitem.schema";
import { ProductVariantRepository } from "../../product/productVariant/productVariant.repository";
import { AppError } from "../../../middlewares/error.handler";

const cartItemRepository = new CartItemRepository();
const cartRepository = new CartRepository();
const productVariantRepository = new ProductVariantRepository();

export class CartItemService {
    public async createCartItem(userId: string, data: CreateCartItemDto) {
        const cart = await cartRepository.findByUserId(userId);
        if (!cart)
            throw new AppError("Cart not found", 404);

        const productVariant = await productVariantRepository.findById(data.productVariantId);
        if (!productVariant)
            throw new AppError("Product variant not found", 404);

        if (productVariant.product.status !== "ACTIVE")
            throw new AppError("Product is not active", 400);

        const existingCartItem = await cartItemRepository.findByCartAndProductVariant(cart.id, productVariant.id)
        if (existingCartItem) {
            const newQuantity = existingCartItem.quantity + data.quantity

            if (productVariant.stock < newQuantity)
                throw new AppError("Insufficient stock", 400)

            const cartItem = await cartItemRepository.updateQuantity(existingCartItem.id, newQuantity)

            return cartItem;

        }

        if (productVariant.stock < data.quantity)
            throw new AppError("Insufficient stock", 400)

        const cartItem = await cartItemRepository.createCartItem(cart.id, data);

        return cartItem;

    };
}