import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/check-ins-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import dayjs from "dayjs";
import { LateCheckinValidationError } from "./errors/late-checkin-validation-error";


//criando interfaces para request e response
interface ValidateCheckInUseCaseRequest {
    checkInId:string

}

interface ValidateCheckInUseCaseResponse {
    checkIn: CheckIn
}

//classe para validação de checkin de usuário
export class ValidateCheckInUseCase {

    constructor(private checkinsRepository: CheckInRepository) {}

    async execute({
        checkInId        
    }:ValidateCheckInUseCaseRequest):Promise<ValidateCheckInUseCaseResponse> {

        const checkIn = await this.checkinsRepository.findById(checkInId)

        if(!checkIn){
            throw new ResourceNotFoundError()
        }

        //calculando distancia da data atual e da criação do checkin
        const distanceInMinutesFromCheckInCreation = dayjs(new Date())
            .diff(checkIn.created_at,'minutes')

        //se mais de 20mins tiverem se passado desde a criação do checkin
        if (distanceInMinutesFromCheckInCreation > 20){
            throw new LateCheckinValidationError()
        }

        checkIn.validated_at = new Date()

        await this.checkinsRepository.update(checkIn)
        
        return {
            checkIn,
        }
    }
}