import { LoginDto } from "./schemas/login.schema";
import { compareSync } from "bcrypt";
import { UserRepository } from "../user/user.repository";
import jwt from "jsonwebtoken";
import { envs } from "../../config/env";

const userRepository = new UserRepository();

export class AuthService {
    public async login(data: LoginDto) {
        const user = await userRepository.findByEmail(data.email)
        if (!user)
            throw new Error("Invalid credentials");

        const comparePassword = compareSync(data.password, user.password)

        if (!comparePassword)
            throw new Error("Invalid credentials");

        const token = jwt.sign({
            id: user.id,
            role: user.role
        },
            envs.JWT_SECRET!,
            { expiresIn: "1h" }
        );

        return {
            token
        }
    }
}