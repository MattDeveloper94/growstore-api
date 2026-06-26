import { Request, Response } from "express";
import { AddressService } from "./address.service";
import { CreateAddressDto } from "./schemas/create.address.schema";

const addressService = new AddressService();

export class AddressController {
    public async createAddress(req: Request<any, any, CreateAddressDto>, res: Response) {
        const createdAddress = await addressService.createAddress(req.body, req.user!.id);

        return res.status(201).json({
            ok: true,
            data: createdAddress
        });
    }
}