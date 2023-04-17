import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { GetUserProfileUseCase } from "../get-user-profile"

export function makeGetUserProfileUseCase(){

    //uma variável recebe o repositório que queiramos usar (Prisma, nesse caso)
    const usersRepository = new PrismaUsersRepository()
    //instancia-se uma classe importada da pasta use-cases que recebe o repositório
    const useCase = new GetUserProfileUseCase(usersRepository)
    //dessa forma, para trocar de repositório, basta mudar o que usersRepository recebe

    return useCase
}