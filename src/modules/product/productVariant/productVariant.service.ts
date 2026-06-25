import { AppError } from "../../../middlewares/error.handler";
import { CreateProductVariantDto } from "./schemas/productVariant.schema";
import { ProductVariantRepository } from "./productVariant.repository";
import { ProductRepository } from "../product/product.repository";

const productVariantRepository = new ProductVariantRepository();
const productRepository = new ProductRepository();

export class ProductVariantService {
    public async createProductVariant(data: CreateProductVariantDto) {
        const randomNumber = Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, "0");
        const skuData = `SKU-${data.color.slice(0, 2).toUpperCase()}-${randomNumber}`;

        // Check if there's already a product variant with the generated SKU.
        const sku = await productVariantRepository.findBySku(skuData);

        if (sku) {
            throw new AppError("SKU already exists", 409);
        }

        // Check if the product ID exists.
        const productId = await productRepository.findById(data.productId);

        if (!productId) {
            throw new AppError("Product not found", 404);
        }

        const productVariant = await productVariantRepository.createProductVariant(data, skuData);

        return {
            ok: true,
            data: productVariant
        }
    }
}