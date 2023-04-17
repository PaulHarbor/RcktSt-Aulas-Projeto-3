import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeCheckInUseCase } from "@/use-cases/factories/make-checkin-use-case"
import { makeValidateCheckinUseCase } from "@/use-cases/factories/make-validate-checkin-use-case"

export async function validate (req: FastifyRequest, rep: FastifyReply) {
    
    const validateCheckinParamsSchema = z.object({
        checkInId: z.string().uuid()
    })

    const { checkInId } = validateCheckinParamsSchema.parse(req.params)
    
    //chamando a factory
    const validateCheckinUseCase = makeValidateCheckinUseCase()
    
    await validateCheckinUseCase.execute({
        checkInId,
    })    

    return rep.status(204).send()
}