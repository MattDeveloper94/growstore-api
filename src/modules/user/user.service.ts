import { AppError } from "../../middlewares/error.handler";
import { CreateUserDto } from "./schemas/createUser.schema";
import { UserRepository } from "./user.repository";

const userRepository = new UserRepository();

export class UserService {
    public async createUser(data: CreateUserDto) {
        const userExists = await userRepository.findByEmail(data.email);

        if (userExists) {
            throw new AppError("Email already exists", 409);
        }

        const user = await userRepository.createUser(data);
        const { password, ...userNoPassword } = user;

        return {
            ok: true,
            data: userNoPassword
        }
    }
}