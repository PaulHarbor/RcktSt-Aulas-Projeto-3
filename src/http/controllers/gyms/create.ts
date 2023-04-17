import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case"

export async function create (req: FastifyRequest, rep: FastifyReply) {
    
    const createGymBodySchema = z.object({
        title: z.string(),
        description: z.string().nullable(),
        phone: z.string().nullable(),
        latitude: z.coerce.number().refine(value =>{
            return Math.abs(value) <= 90
        }),
        longitude: z.coerce.number().refine(value =>{
            return Math.abs(value) <= 180
        })
    })

    //extraindo dados da request após validar usando o schema do Zod
    const { title, description, phone, latitude, longitude }
    = createGymBodySchema.parse(req.body)

    //chamando a factory
    const createGymUseCase = makeCreateGymUseCase()
    
    await createGymUseCase.execute({
        title,
        description,
        phone,
        latitude,
        longitude
    })    
    
    return rep.code(201).send()
}