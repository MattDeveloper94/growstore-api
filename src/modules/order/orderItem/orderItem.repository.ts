import { createOrderItemDto } from "./schemas/create.orderItem.schema";
import { prisma } from "../../../database/prisma";

export class OrderItemRepository {
    public async createOrderItem(data: createOrderItemDto[]) {
        return prisma.orderItem.createMany({
            data,
        });
    }
}