import { Router, Request, Response, NextFunction } from "express";
import { AddressController } from "./address.controller";
import { validateBody } from "../../middlewares/validateBody.middleware";
import { createAddressSchema } from "./schemas/create.address.schema";
import { authMiddleware } from "../../middlewares/auth.middleware";

const addressController = new AddressController();
const router = Router();

router.post("/addresses", validateBody(createAddressSchema), authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await addressController.createAddress(req, res)
        } catch (error: any) {
            next(error)
        }
    });

export default router;