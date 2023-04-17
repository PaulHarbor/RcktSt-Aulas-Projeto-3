import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeFetchUserCheckinHistoryUseCase } from "@/use-cases/factories/make-fetch-user-checkin-history-use-case"

export async function history (req: FastifyRequest, rep: FastifyReply) {
    
    const checkinHistoryQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1)
    })

    //extraindo dados da request após validar usando o schema do Zod
    const { page } = checkinHistoryQuerySchema.parse(req.body)

    //chamando a factory
    const fetchUserCheckinsHistoryUseCase = makeFetchUserCheckinHistoryUseCase()
    
    const { checkIns } = await fetchUserCheckinsHistoryUseCase.execute({
        userId:req.user.sub,
        page
    })    

    return rep.status(200).send({
        checkIns,
    })
}