import { prisma } from "../../../database/prisma";
import { CreateProductVariantDto } from "./schemas/productVariant.schema";

export class ProductVariantRepository {
    public async createProductVariant(data: CreateProductVariantDto, sku: string) {
        return await prisma.productVariant.create({
            data: {
                sku,
                color: data.color,
                size: data.size,
                stock: data.stock,
                price: data.price,
                product: {
                    connect: {
                        id: data.productId
                    }
                }
            }
        })
    }

    public async findBySku(sku: string) {
        return await prisma.productVariant.findUnique({
            where: {
                sku
            }
        })
    }

    public async findById(id: string) {
        return await prisma.productVariant.findUnique({
            where: {
                id
            },
            include: {
                product: {
                    select: {
                        status: true
                    }
                }
            }
        })
    }

    public async findByProductColorAndSize(productId: string, color: string, size: string) {
        return await prisma.productVariant.findUnique({
            where: {
                productId_color_size: {
                    productId,
                    color,
                    size
                }
            }
        });
    }
}