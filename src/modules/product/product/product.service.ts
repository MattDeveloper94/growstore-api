import { AppError } from "../../../middlewares/error.handler";
import { CategoryRepository } from "../../category/category.repository";
import { ProductRepository } from "./product.repository";
import { CreateProductDto } from "./schemas/create.product.schema";

const productRepository = new ProductRepository();
const categoryRepository = new CategoryRepository();

export class ProductService {
    public async createProduct(data: CreateProductDto) {
        const category = await categoryRepository.findById(data.categoryId);

        if (!category) {
            throw new AppError("Category not found", 404);
        }

        const product = await productRepository.createProduct(data);

        return {
            ok: true,
            data: product
        }
    }
}