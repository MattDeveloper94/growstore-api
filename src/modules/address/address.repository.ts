import { prisma } from "../../database/prisma";
import { Prisma } from "../../../generated/prisma/client";

export class AddressRepository {
    public async createAddress(data: Prisma.AddressCreateInput) {
        return await prisma.address.create({
            data
        });
    }
}