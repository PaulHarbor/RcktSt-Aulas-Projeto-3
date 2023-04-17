import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeFetchNearbyGymsUseCase } from "@/use-cases/factories/make-fetch-nearby-gyms-use-case"

export async function nearby(req: FastifyRequest, rep: FastifyReply) {
    
    const nearbyGymsQuerySchema = z.object({
        latitude: z.coerce.number().refine(value =>{
            return Math.abs(value) <= 90
        }),
        longitude: z.coerce.number().refine(value =>{
            return Math.abs(value) <= 180
        })
    })

    //extraindo dados da request após validar usando o schema do Zod
    const { latitude, longitude }
    = nearbyGymsQuerySchema.parse(req.query)

    //chamando a factory
    const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()
    
    const { gyms } = await fetchNearbyGymsUseCase.execute({
        userLatitude:latitude,
        userLongitude:longitude
    })    

    return rep.status(201).send({
        gyms,
    })
}