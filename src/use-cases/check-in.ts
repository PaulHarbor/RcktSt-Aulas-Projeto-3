import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gym-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { DoubleCheckinError } from "./errors/double-checkin-error";
import { MaxDistanceError } from "./errors/max-distance-error";


//criando interfaces para request e response da autenticação
interface CheckInUseCaseRequest {
    userId:string
    gymId:string
    userLatitude: number
    userLongitude: number
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

//classe para autenticação de usuário
export class CheckInUseCase {

    constructor(
        private checkinsRepository: CheckInRepository,
        private gymsRepository: GymsRepository
    ) {}

    async execute({
        userId,
        gymId,
        userLatitude,
        userLongitude
    }:CheckInUseCaseRequest):Promise<CheckInUseCaseResponse> {

        //procurando academia no banco
        const gym = await this.gymsRepository.findByID(gymId)

        if(!gym){
            throw new ResourceNotFoundError()
        }

        //chamando função pra calcular distancia e passando coordenadas do usuário e da academia
        const distance = getDistanceBetweenCoordinates(
            {latitude:userLatitude, longitude:userLongitude},
            {latitude:gym.latitude.toNumber(),longitude:gym.longitude.toNumber()}
        )

        //0.1km equivale a 100m
        const MAX_distance_in_km = 0.1

        if(distance > MAX_distance_in_km) {
            throw new MaxDistanceError()
        }

        //verificando se o checkin está ocorrendo na mesma data que outro do mesmo usuário
        const checkInOnSameDay = await this.checkinsRepository.findByUserIdOnDate(
            userId,
            new Date()
        )

        if (checkInOnSameDay){
            throw new DoubleCheckinError()
        }

        const checkIn = await this.checkinsRepository.create({
            gym_id: gymId,
            user_id: userId
        })

        //se deu tudo certo, retorne o usuário
        return {
            checkIn,
        }
    }
}