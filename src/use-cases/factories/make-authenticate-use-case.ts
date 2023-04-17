import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { AuthenticateUseCase } from "../authenticate"

export function makeAuthenticateUseCase(){

    //uma variável recebe o repositório que queiramos usar (Prisma, nesse caso)
    const usersRepository = new PrismaUsersRepository()
    //instancia-se uma classe importada da pasta use-cases que recebe o repositório
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)
    //dessa forma, para trocar de repositório, basta mudar o que usersRepository recebe

    return authenticateUseCase
}