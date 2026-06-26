import { AppError } from "../../middlewares/error.handler";
import { CategoryRepository } from "./category.repository";
import { CreateCategoryDto } from "./schemas/create.category.schema";

const categoryRepository = new CategoryRepository();

export class CategoryService {
    public async createCategory(data: CreateCategoryDto) {

        const categoryExists = await categoryRepository.findByName(data.name);
        if (categoryExists) {
            throw new AppError("Category already exists", 409);
        }

        const category = await categoryRepository.createCategory(data)

        return category;
    }
}