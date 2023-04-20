import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeValidateCheckinUseCase } from "@/use-cases/factories/make-validate-checkin-use-case"

export async function validate(req: FastifyRequest, rep: FastifyReply) {

  //to validate a check-in, we need its ID
  const validateCheckinParamsSchema = z.object({
    checkInId: z.string().uuid()
  })

  //we get its ID via request parameters (on the URL)
  const { checkInId } = validateCheckinParamsSchema.parse(req.params)

  const validateCheckinUseCase = makeValidateCheckinUseCase()

  await validateCheckinUseCase.execute({
    checkInId,
  })

  return rep.status(204).send()
}