import { Gym} from '@prisma/client'
import { GymsRepository } from '@/repositories/gym-repository'


interface FetchNearbyGymsCaseRequest {
    userLatitude:number
    userLongitude:number
}

interface FetchNearbyGymsCaseResponse {
    gyms: Gym[]
}

//exportando classe que cadastra academia
//essa classe consegue cadastrar usando qualquer repositório
export class FetchNearbyGymsUseCase{

    //o construtor recebe a dependência como argumento
    //essa dependência é uma interface criada para qualquer tipo de repositório (ex.:Prisma)
    constructor(private gymsRepository:GymsRepository) {}

    //função que cadastra academia, a função recebe um argumento do tipo CreateGymCaseRequest da interface acima
    async execute({
        userLatitude,
        userLongitude
                                //e retorna uma promise com dados do tipo SearchGymCaseResponse (a outra interface acima)
    }: FetchNearbyGymsCaseRequest): Promise<FetchNearbyGymsCaseResponse>{    
                
        const gyms = await this.gymsRepository.findManyNearby({
            latitude:userLatitude,
            longitude:userLongitude
        })

        return {
            gyms,
        }
         
    }

}