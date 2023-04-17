import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"

export function makeFetchNearbyGymsUseCase(){

    //uma variável recebe o repositório que queiramos usar (Prisma, nesse caso)
    const gymRepository = new PrismaGymsRepository()
    //instancia-se uma classe importada da pasta use-cases que recebe o repositório
    const useCase = new FetchNearbyGymsUseCase(gymRepository)
    //dessa forma, para trocar de repositório, basta mudar o que usersRepository recebe

    return useCase
}