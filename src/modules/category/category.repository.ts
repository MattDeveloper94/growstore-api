import { CreateCategoryDto } from "./schemas/create.category.schema";
import { prisma } from "../../database/prisma";

export class CategoryRepository {
    public async createCategory(data: CreateCategoryDto) {
        return await prisma.category.create({
            data
        });
    }

    public async findById(id: string) {
        return await prisma.category.findUnique({
            where: {
                id
            }
        })
    }

    public async findByName(name: string) {
        return await prisma.category.findFirst({
            where: {
                name
            }
        });
    }
}