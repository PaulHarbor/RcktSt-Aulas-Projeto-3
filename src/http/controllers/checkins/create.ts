import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeCheckInUseCase } from "@/use-cases/factories/make-checkin-use-case"

export async function create (req: FastifyRequest, rep: FastifyReply) {
    
    const createCheckinParamsSchema = z.object({
        gymId: z.string().uuid()
    })

    const createCheckinBodySchema = z.object({
        latitude: z.number().refine(value =>{
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine(value =>{
            return Math.abs(value) <= 180
        })
    })

    const { gymId } = createCheckinParamsSchema.parse(req.params)
    //extraindo dados da request após validar usando o schema do Zod
    const { latitude, longitude } = createCheckinBodySchema.parse(req.body)

    //chamando a factory
    const checkinUseCase = makeCheckInUseCase()
    
    await checkinUseCase.execute({
        gymId,
        userId: req.user.sub,
        userLatitude: latitude,
        userLongitude: longitude
    })    

    return rep.status(201).send()
}