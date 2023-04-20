import { PrismaCheckinsRepository } from "@/repositories/prisma/prisma-checkins-repository"
import { ValidateCheckInUseCase } from "../validate-checkin"

export function makeValidateCheckinUseCase() {

  const checkInRepository = new PrismaCheckinsRepository()

  const useCase = new ValidateCheckInUseCase(checkInRepository)

  return useCase
}