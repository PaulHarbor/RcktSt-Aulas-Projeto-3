import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";


//criando interfaces para request e response da autenticação
interface GetUserProfileUseCaseRequest {
    userId: string,
}

interface GetUserProfileUseCaseResponse {
    user: User
}

//classe para autenticação de usuário
export class GetUserProfileUseCase {

    constructor(
        private usersRepository: UsersRepository,
    ) {}

    async execute({
        userId
    }:GetUserProfileUseCaseRequest):Promise<GetUserProfileUseCaseResponse> {

        //buscando usuário com email especificado na tentativa de login (autenticação)
        const user = await this.usersRepository.findByID(userId)

        //caso não encontre o usuário
        if(!user) {
            throw new ResourceNotFoundError()
        }        

        //se deu tudo certo, retorne o usuário
        return {
            user,
        }
    }
}