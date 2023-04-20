import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeFetchUserCheckinHistoryUseCase } from "@/use-cases/factories/make-fetch-user-checkin-history-use-case"

export async function history (req: FastifyRequest, rep: FastifyReply) {
    
    const checkinHistoryQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1)
    })
    
    //we use .query because GET requests have no body
    const { page } = checkinHistoryQuerySchema.parse(req.query)
    
    const fetchUserCheckinsHistoryUseCase = makeFetchUserCheckinHistoryUseCase()
    
    const { checkIns } = await fetchUserCheckinsHistoryUseCase.execute({
        userId:req.user.sub, //getting user ID from the token
        page
    })    

    return rep.status(200).send({
        checkIns,
    })
}