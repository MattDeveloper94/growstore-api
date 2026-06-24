import { prisma } from "../../../database/prisma";
import { CreateProductDto } from "./schemas/create.product.schema";

export class ProductRepository{
    public async createProduct(data: CreateProductDto) {
        return await prisma.product.create({
            data
        });
    }
}