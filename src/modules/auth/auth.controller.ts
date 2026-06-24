import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { LoginDto } from "./schemas/login.schema";

const authService = new AuthService();

export class AuthController {
    public async login(req: Request<any, any, LoginDto>, res: Response) {
        const { email, password } = req.body;

        const validateLogin = await authService.login({
            email,
            password
        })

        return res.status(200).json(validateLogin);
    }
}