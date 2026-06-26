import { prisma } from "../../../database/prisma"

export class CartRepository {
    public async findByUserId(userId: string) {
        return await prisma.cart.findUnique({
            where: {
                userId
            },
            select: {
                id: true,
                userId: true,
                cartItems: {
                    select: {
                        id: true,
                        quantity: true,
                        productVariant: {
                            select: {
                                id: true,
                                sku: true,
                                color: true,
                                size: true,
                                price: true,
                                stock: true,
                                product: {
                                    select: {
                                        id: true,
                                        productName: true,
                                        brand: true,
                                        gender: true,
                                        status: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    }
}