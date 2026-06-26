import { AppError } from "../../middlewares/error.handler";
import { CreateUserDto } from "./schemas/createUser.schema";
import { UserRepository } from "./user.repository";

const userRepository = new UserRepository();

export class UserService {
    public async createUser(data: CreateUserDto) {
        const emailExists = await userRepository.findByEmail(data.email);

        if (emailExists) {
            throw new AppError("Email already exists", 409);
        }

        const user = await userRepository.createUser(data);
        const { password, ...userNoPassword } = user;

        return userNoPassword;
    }
}