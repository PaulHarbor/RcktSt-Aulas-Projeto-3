import { GetUserMetricsUseCase } from "../get-user-metrics"
import { PrismaCheckinsRepository } from "@/repositories/prisma/prisma-checkins-repository"

export function makeGetUserMetricsUseCase() {

  const checkInRepository = new PrismaCheckinsRepository()

  const useCase = new GetUserMetricsUseCase(checkInRepository)

  return useCase
}