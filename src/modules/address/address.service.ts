import { AppError } from "../../middlewares/error.handler";
import { AddressRepository } from "./address.repository";
import { CreateAddressDto } from "./schemas/create.address.schema";

const addressRepository = new AddressRepository();

export class AddressService {
    public async createAddress(data: CreateAddressDto, userId: string) {
        const cleanZipCode = data.zipCode.replace("-", "");
        const response = await fetch(`https://viacep.com.br/ws/${cleanZipCode}/json/`);
        const cepData = await response.json();

        if (cepData.erro)
            throw new AppError("Invalid CEP!", 400);

        const addressData = {
            ...data,
            street: cepData.logradouro,
            neighborhood: cepData.bairro,
            city: cepData.localidade,
            state: cepData.uf,
            user: {
                connect: {
                    id: userId
                }
            }
        };

        const address = await addressRepository.createAddress(addressData);
        return {
            ok: true,
            data: address
        };
    }
}