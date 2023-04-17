import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CheckInUseCase } from "../check-in"
import { PrismaCheckinsRepository } from "@/repositories/prisma/prisma-checkins-repository"

export function makeCheckInUseCase(){

    //uma variável recebe o repositório que queiramos usar (Prisma, nesse caso)
    const checkInRepository = new PrismaCheckinsRepository()
    const gymRepository = new PrismaGymsRepository()
    //instancia-se uma classe importada da pasta use-cases que recebe o repositório
    const useCase = new CheckInUseCase(checkInRepository,gymRepository)
    //dessa forma, para trocar de repositório, basta mudar o que usersRepository recebe

    return useCase
}