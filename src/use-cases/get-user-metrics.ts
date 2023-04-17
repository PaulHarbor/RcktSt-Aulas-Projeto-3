import { CheckInRepository } from "@/repositories/check-ins-repository";

//criando interfaces para request e response da autenticação
interface GetUserMetricsUseCaseRequest {
    userId:string     
}

interface GetUserMetricsUseCaseResponse {
    checkInsCount: number
}

//classe para autenticação de usuário
export class GetUserMetricsUseCase {

    constructor(
        private checkinsRepository: CheckInRepository,        
    ) {}

    async execute({
        userId,         
    }:GetUserMetricsUseCaseRequest):Promise<GetUserMetricsUseCaseResponse> {
 
        const checkInsCount = await this.checkinsRepository.countByUserId(userId)

        return {
            checkInsCount,
        }
    }
}