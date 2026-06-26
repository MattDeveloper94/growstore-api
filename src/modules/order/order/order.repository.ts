import { Prisma } from "../../../../generated/prisma/client";
import { prisma } from "../../../database/prisma";

export class OrderRepository {
    public async createOrder(data: Prisma.OrderUncheckedCreateInput) {
        return await prisma.order.create({
            data
        });
    }

    public async findById(id: string) {
        return await prisma.order.findUnique({
            where: {
                id
            }
        });
    }
}