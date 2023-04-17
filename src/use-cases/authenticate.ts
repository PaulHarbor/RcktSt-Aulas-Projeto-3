import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";


//criando interfaces para request e response da autenticação
interface AuthenticateUseCaseRequest {
    email:string,
    password: string,
}

interface AuthenticateUseCaseResponse {
    user: User
}

//classe para autenticação de usuário
export class AuthenticateUseCase {

    constructor(
        private usersRepository: UsersRepository,
    ) {}

    async execute({
        email,
        password
    }:AuthenticateUseCaseRequest):Promise<AuthenticateUseCaseResponse> {

        //buscando usuário com email especificado na tentativa de login (autenticação)
        const user = await this.usersRepository.findByEmail(email)

        //caso não encontre o usuário
        if(!user) {
            throw new InvalidCredentialsError()
        }

        //verificando se a senha está correta
        const doesPasswordMatch = await compare(password, user.password_hash)

        if(!doesPasswordMatch){
            throw new InvalidCredentialsError()            
        }

        //se deu tudo certo, retorne o usuário
        return {
            user,
        }
    }
}