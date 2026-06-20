import { hashSync } from "bcrypt";
import { CreateUserDto } from "./dto/createUser.dto";
import { prisma } from "../../database/prisma";

export class UserRepository {
    public async createUser(data: CreateUserDto){
        const hashPassword = hashSync(data.password, 8)
        return await prisma.user.create({
            data: {
                ...data,
                password: hashPassword,
                birthDate: new Date(data.birthDate)
            }
        });
    }
}