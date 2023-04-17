import { PrismaCheckinsRepository } from "@/repositories/prisma/prisma-checkins-repository"
import { ValidateCheckInUseCase } from "../validate-checkin"

export function makeValidateCheckinUseCase(){

    //uma variável recebe o repositório que queiramos usar (Prisma, nesse caso)
    const checkInRepository = new PrismaCheckinsRepository()
    //instancia-se uma classe importada da pasta use-cases que recebe o repositório
    const useCase = new ValidateCheckInUseCase(checkInRepository)
    //dessa forma, para trocar de repositório, basta mudar o que usersRepository recebe

    return useCase
}