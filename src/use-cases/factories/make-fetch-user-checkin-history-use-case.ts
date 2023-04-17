import { FetchUserHistoryUseCase } from "../fetch-user-checkins-history"
import { PrismaCheckinsRepository } from "@/repositories/prisma/prisma-checkins-repository"

export function makeFetchUserCheckinHistoryUseCase(){

    //uma variável recebe o repositório que queiramos usar (Prisma, nesse caso)
    const checkInRepository = new PrismaCheckinsRepository()
    //instancia-se uma classe importada da pasta use-cases que recebe o repositório
    const useCase = new FetchUserHistoryUseCase(checkInRepository)
    //dessa forma, para trocar de repositório, basta mudar o que usersRepository recebe

    return useCase
}