import { CreateCategoryDto } from "./schemas/create.category.schema";
import { prisma } from "../../database/prisma";

export class CategoryRepository {
    public async createCategory(data: CreateCategoryDto) {
        return await prisma.category.create({
            data
        });
    }
}