import { FetchUserHistoryUseCase } from "../fetch-user-checkins-history"
import { PrismaCheckinsRepository } from "@/repositories/prisma/prisma-checkins-repository"

export function makeFetchUserCheckinHistoryUseCase() {

  const checkInRepository = new PrismaCheckinsRepository()

  const useCase = new FetchUserHistoryUseCase(checkInRepository)

  return useCase
}