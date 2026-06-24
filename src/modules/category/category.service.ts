import { CategoryRepository } from "./category.repository";
import { CreateCategoryDto } from "./schemas/create.category.schema";

const categoryRepository = new CategoryRepository();

export class CategoryService {
    public async createCategory(data: CreateCategoryDto) {
        const category = await categoryRepository.createCategory(data)

        return {
            ok: true,
            category: category
        }
    }
}