import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/check-ins-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import dayjs from "dayjs";
import { LateCheckinValidationError } from "./errors/late-checkin-validation-error";

interface ValidateCheckInUseCaseRequest {
  checkInId: string

}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {

  constructor(private checkinsRepository: CheckInRepository) { }

  async execute({
    checkInId
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {

    //to validate the check-in, we need to find it first
    const checkIn = await this.checkinsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    //calculating difference in minutes between today and the check-ins creation date
    const distanceInMinutesFromCheckInCreation = dayjs(new Date())
      .diff(checkIn.created_at, 'minutes')

    //if more than 20mins have passed, check-in can't be validated anymore
    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckinValidationError()
    }

    checkIn.validated_at = new Date() //we update the found check-in's 'validated_at' property with today's date
    
    //and send it to the repository function to update
    await this.checkinsRepository.update(checkIn)

    return {
      checkIn,
    }
  }
}