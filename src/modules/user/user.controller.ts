import { Request, Response } from "express";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserService } from "./user.service";

const userService = new UserService();

export class UserController {
    public async create(req: Request<any, any, CreateUserDto>, res: Response) {
        const { name, email, password, birthDate } = req.body

        const result = await userService.createUser({
            name, email, password, birthDate
        });

        return res.status(201).json(result)
    }
}