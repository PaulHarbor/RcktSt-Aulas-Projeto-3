import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/check-ins-repository";


//criando interfaces para request e response da autenticação
interface FetchUserHistoryUseCaseRequest {
    userId:string 
    page: number
}

interface FetchUserHistoryUseCaseResponse {
    checkIns: CheckIn[]
}

//classe para autenticação de usuário
export class FetchUserHistoryUseCase {

    constructor(
        private checkinsRepository: CheckInRepository,        
    ) {}

    async execute({
        userId, 
        page       
    }:FetchUserHistoryUseCaseRequest):Promise<FetchUserHistoryUseCaseResponse> {
 
        const checkIns = await this.checkinsRepository.findManyByUserId(userId, page)

        return {
            checkIns,
        }
    }
}