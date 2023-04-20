import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CheckInUseCase } from "../check-in"
import { PrismaCheckinsRepository } from "@/repositories/prisma/prisma-checkins-repository"

export function makeCheckInUseCase(){

    const checkInRepository = new PrismaCheckinsRepository()

    const gymRepository = new PrismaGymsRepository()
    
    const useCase = new CheckInUseCase(checkInRepository,gymRepository)
    
    return useCase
}