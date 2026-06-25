import { Request, Response, NextFunction } from "express";
import { CreateProductVariantDto } from "./schemas/productVariant.schema";
import { ProductVariantService } from "./productVariant.service";

const productVariantService = new ProductVariantService();

export class ProductVariantController {
    public async createProductVariant(req: Request<any, any, CreateProductVariantDto>, res: Response) {
        const createProductVariant = await productVariantService.createProductVariant(req.body)

        return res.status(201).json(createProductVariant);
    }
}