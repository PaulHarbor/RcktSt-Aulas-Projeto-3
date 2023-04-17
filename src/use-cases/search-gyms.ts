import { Gym} from '@prisma/client'
import { GymsRepository } from '@/repositories/gym-repository'


interface SearchGymsCaseRequest {
    query: string
    page: number
}

interface SearchGymsCaseResponse {
    gyms: Gym[]
}

//exportando classe que cadastra academia
//essa classe consegue cadastrar usando qualquer repositório
export class SearchGymsUseCase{

    //o construtor recebe a dependência como argumento
    //essa dependência é uma interface criada para qualquer tipo de repositório (ex.:Prisma)
    constructor(private gymsRepository:GymsRepository) {}

    //função que cadastra academia, a função recebe um argumento do tipo CreateGymCaseRequest da interface acima
    async execute({
        query,
        page
                                //e retorna uma promise com dados do tipo SearchGymCaseResponse (a outra interface acima)
    }: SearchGymsCaseRequest): Promise<SearchGymsCaseResponse>{    
                
        const gyms = await this.gymsRepository.searchMany(
            query,
            page
        )

        return {
            gyms,
        }
         
    }

}