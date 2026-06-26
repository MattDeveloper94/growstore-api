import { CategoryService } from "./category.service";
import { Request, Response } from "express";
import { CreateCategoryDto } from "./schemas/create.category.schema";

const categoryService = new CategoryService();

export class CategoryController {
    public async createCategory(req: Request<any, any, CreateCategoryDto>, res: Response) {
        const createdCategory = await categoryService.createCategory(req.body)

        return res.status(201).json({
            ok: true,
            data: createdCategory
        });
    }
}