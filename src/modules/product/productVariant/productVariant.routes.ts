import { NextFunction, Request, Response, Router } from "express";
import { ProductVariantController } from "./productVariant.controller";
import { createProductVariantSchema } from "./schemas/productVariant.schema";
import { validateBody } from "../../../middlewares/validateBody.middleware";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { roleMiddleware } from "../../../middlewares/role.middleware";
import { Role } from "../../../../generated/prisma/enums";


const productVariantController = new ProductVariantController();
const router = Router();

router.post("/products/variants",
    validateBody(createProductVariantSchema),
    authMiddleware,
    roleMiddleware(Role.SELLER, Role.ADMIN),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await productVariantController.createProductVariant(req, res)
        } catch (error: any) {
            next(error)
        }
    }
)
export default router;