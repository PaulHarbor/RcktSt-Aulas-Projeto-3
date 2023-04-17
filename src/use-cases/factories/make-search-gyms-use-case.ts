import { SearchGymsUseCase } from "../search-gyms"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"

export function makeSearchGymsUseCase(){

    //uma variável recebe o repositório que queiramos usar (Prisma, nesse caso)
    const gymRepository = new PrismaGymsRepository()
    //instancia-se uma classe importada da pasta use-cases que recebe o repositório
    const useCase = new SearchGymsUseCase(gymRepository)
    //dessa forma, para trocar de repositório, basta mudar o que usersRepository recebe

    return useCase
}