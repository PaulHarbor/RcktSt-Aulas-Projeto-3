import { FastifyRequest, FastifyReply } from "fastify"
import { makeGetUserMetricsUseCase } from "@/use-cases/factories/make-get-user-metrics-use-case"

export async function metrics (req: FastifyRequest, rep: FastifyReply) {
    
    const getUseMetricsUseCase = makeGetUserMetricsUseCase()
    
    const { checkInsCount } = await getUseMetricsUseCase.execute({
        userId:req.user.sub,        
    })    

    return rep.status(200).send({
        checkInsCount,
    })
}