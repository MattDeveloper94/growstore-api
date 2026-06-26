import { Router, Request, Response, NextFunction } from "express";
import { CategoryController } from "./category.controller";
import { validateBody } from "../../middlewares/validateBody.middleware";
import { createCategorySchema } from "./schemas/create.category.schema";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";
import { Role } from "../../../generated/prisma/enums";

const categoryController = new CategoryController();
const router = Router();

router.post("/categories",
    validateBody(createCategorySchema),
    authMiddleware,
    roleMiddleware(Role.ADMIN),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await categoryController.createCategory(req, res)
        } catch (error: any) {
            next(error)
        }
    }
)

export default router;