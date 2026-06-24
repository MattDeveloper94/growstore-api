import { NextFunction, Request, Response, Router } from "express";
import { ProductController } from "./product.controller";
import { validateBody } from "../../../middlewares/validateBody.middleware";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { roleMiddleware } from "../../../middlewares/role.middleware";
import { createProductSchema } from "./schemas/create.product.schema";
import { Role } from "../../../../generated/prisma/enums";


const router = Router();
const productController = new ProductController();

router.post("/register/product",
    validateBody(createProductSchema),
    authMiddleware,
    roleMiddleware(Role.SELLER, Role.ADMIN),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await productController.createProduct(req, res)
        } catch (error: any) {
            next(error)
        }
    }
)

export default router;