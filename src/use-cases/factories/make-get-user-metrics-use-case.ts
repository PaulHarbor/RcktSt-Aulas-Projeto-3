import { GetUserMetricsUseCase } from "../get-user-metrics"
import { PrismaCheckinsRepository } from "@/repositories/prisma/prisma-checkins-repository"

export function makeGetUserMetricsUseCase(){

    //uma variável recebe o repositório que queiramos usar (Prisma, nesse caso)
    const checkInRepository = new PrismaCheckinsRepository()
    //instancia-se uma classe importada da pasta use-cases que recebe o repositório
    const useCase = new GetUserMetricsUseCase(checkInRepository)
    //dessa forma, para trocar de repositório, basta mudar o que usersRepository recebe

    return useCase
}