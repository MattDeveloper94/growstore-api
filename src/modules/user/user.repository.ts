import { hashSync } from "bcrypt";
import { CreateUserDto } from "./schemas/createUser.schema";
import { prisma } from "../../database/prisma";

export class UserRepository {
    public async createUser(data: CreateUserDto) {
        const hashPassword = hashSync(data.password, 8)
        return await prisma.user.create({
            data: {
                ...data,
                password: hashPassword,
                birthDate: new Date(data.birthDate),
                cart: {
                    create: {}
                }
            }
        });
    }

    public async findByEmail(email: string) {
        return await prisma.user.findUnique({
            where: {
                email
            }
        });
    }

    public async findById(id: string) {
        return await prisma.user.findUnique({
            where: {
                id
            }
        });
    }
}