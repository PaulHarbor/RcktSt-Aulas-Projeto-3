import { CreateGymUseCase } from "../create_gym"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"

export function makeCreateGymUseCase(){

    //uma variável recebe o repositório que queiramos usar (Prisma, nesse caso)
    const gymRepository = new PrismaGymsRepository()
    //instancia-se uma classe importada da pasta use-cases que recebe o repositório
    const useCase = new CreateGymUseCase(gymRepository)
    //dessa forma, para trocar de repositório, basta mudar o que usersRepository recebe

    return useCase
}