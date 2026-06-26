import { Request, Response } from "express";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./schemas/create.order.schema";

const orderService = new OrderService();

export class OrderController {
    public async createOrder(req: Request<any, any, CreateOrderDto>, res: Response) {
        const userId = req.user!.id;
        const addressId = req.body.addressId;

        const order = await orderService.createOrder(userId, addressId);

        return res.status(201).json({
            ok: true,
            data: order
        });
    }
}