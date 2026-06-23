import { CreateUserDto } from "./schemas/createUser.schema";
import { UserRepository } from "./user.repository";

const userRepository = new UserRepository();

export class UserService {
    public async createUser(data: CreateUserDto) {
        const user = await userRepository.createUser(data);
        const { password, ...userNoPassword } = user;

        return {
            ok: true,
            user: userNoPassword
        }
    }
}