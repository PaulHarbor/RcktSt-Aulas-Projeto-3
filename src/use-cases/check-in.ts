import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gym-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { DoubleCheckinError } from "./errors/double-checkin-error";
import { MaxDistanceError } from "./errors/max-distance-error";

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {

  //this constructor takes two repositories as dependencies
  constructor(
    private checkinsRepository: CheckInRepository,
    private gymsRepository: GymsRepository
  ) { }

  //user coordinates are sent through the request
  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {

    //we get the gym by its ID (we will need its coordinates)
    const gym = await this.gymsRepository.findByID(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    //calling the function to calculate distance between user coordinates and gym coordinates
    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    )

    //0.1km is equivalent to 100m
    const MAX_distance_in_km = 0.1

    //user can't check-in to a gym while being more than 100m away from it
    if (distance > MAX_distance_in_km) {
      throw new MaxDistanceError()
    }

    //verifying if the check-in is occuring on the same date as another one from the same user
    const checkInOnSameDay = await this.checkinsRepository.findByUserIdOnDate(
      userId,
      new Date()
    )

    //if we find a check-in on the same userId and on the same Date...
    if (checkInOnSameDay) {
      throw new DoubleCheckinError()
    }

    //if everything's fine, create the check-in
    const checkIn = await this.checkinsRepository.create({
      gym_id: gymId,
      user_id: userId
    })

    return {
      checkIn,
    }
  }
}