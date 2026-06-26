import { Request, Response } from "express";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./schemas/create.product.schema";

const productService = new ProductService();

export class ProductController {
    public async createProduct(req: Request<any, any, CreateProductDto>, res: Response) {
        const product = await productService.createProduct(req.body)

        return res.status(201).json({
            ok: true,
            data: product
        });
    }
}