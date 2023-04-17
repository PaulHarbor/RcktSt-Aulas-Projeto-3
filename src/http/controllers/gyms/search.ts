import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case"

export async function search (req: FastifyRequest, rep: FastifyReply) {
    
    const searchGymsQuerySchema = z.object({
        query: z.coerce.string(),
        page: z.coerce.number().min(1).default(1)
    })

    //extraindo dados da request após validar usando o schema do Zod
    const { query, page } = searchGymsQuerySchema.parse(req.body)

    //chamando a factory
    const searchGymUseCase = makeSearchGymsUseCase()
    
    const { gyms } = await searchGymUseCase.execute({
        query,
        page
    })    

    return rep.status(200).send({
        gyms,
    })
}