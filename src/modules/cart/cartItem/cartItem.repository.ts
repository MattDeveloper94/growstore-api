import { CreateCartItemDto } from "./schemas/create.cartitem.schema";
import { prisma } from "../../../database/prisma";

export class CartItemRepository {
    public async createCartItem(cartId: string, data: CreateCartItemDto) {
        return await prisma.cartItem.create({
            data: {
                cartId,
                ...data
            }
        });
    }

    public async findByCartAndProductVariant(cartId: string, productVariantId: string) {
        return await prisma.cartItem.findUnique({
            where: {
                cartId_productVariantId: {
                    cartId,
                    productVariantId
                }
            }
        });
    }

    public async updateQuantity(id: string, quantity: number) {
        return await prisma.cartItem.update({
            where: {
                id
            },
            data: {
                quantity
            }
        });
    }
}