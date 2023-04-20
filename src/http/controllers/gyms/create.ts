import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case"

export async function create(req: FastifyRequest, rep: FastifyReply) {
  //a request comes in through a route

  //its body should conform to this schema
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 180
    })
  })

  //we extract the data from the request's body
  const { title, description, phone, latitude, longitude }
    = createGymBodySchema.parse(req.body)

  //fabricate the gym creation class
  const createGymUseCase = makeCreateGymUseCase()

  //call its 'execute' method, which will call the use case's 'create' method
  //which will in turn call Prisma's own 'create' method
  await createGymUseCase.execute({
    title,
    description,
    phone,
    latitude,
    longitude
  })

  return rep.code(201).send()
}