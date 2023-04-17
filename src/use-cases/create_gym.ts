import { Gym} from '@prisma/client'
import { GymsRepository } from '@/repositories/gym-repository'


interface CreateGymCaseRequest {
    title: string,
    //a descrição pode ser undefined (não mandada na request)
    //pode ser string (atualizando a descrição)
    //pode ser null (removendo a descrição)
    description?: string | null,
    phone: string | null,
    latitude: number,
    longitude: number
    
    
}

interface CreateGymCaseResponse {
    gym: Gym
}

//exportando classe que cadastra academia
//essa classe consegue cadastrar usando qualquer repositório
export class CreateGymUseCase{

    //o construtor recebe a dependência como argumento
    //essa dependência é uma interface criada para qualquer tipo de repositório (ex.:Prisma)
    constructor(private gymsRepository:GymsRepository) {}

    //função que cadastra academia, a função recebe um argumento do tipo CreateGymCaseRequest da interface acima
    async execute({
        title,
        description,
        phone,
        latitude,
        longitude            //e retorna uma promise com dados do tipo CreateGymCaseResponse (a outra interface acima)
    }: CreateGymCaseRequest): Promise<CreateGymCaseResponse>{    
                
        const gym = await this.gymsRepository.create({
            title,
            description,
            phone,
            latitude,
            longitude
        })

        return {
            gym,
        }
         
    }

}