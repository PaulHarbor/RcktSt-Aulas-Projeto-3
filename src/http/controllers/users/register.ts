import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error"
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case"

//this function will execute whenever there is a POST on the '/users' route
export async function register (req: FastifyRequest, rep: FastifyReply) {

    //this schema determines how the request body should have
    //we use zod to validate the data
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    //after parsing the request body through zod validation, we extract name, email and password
    const { name, email, password } = registerBodySchema.parse(req.body)

    try {

        //calling the register use case factory
        const registerUseCase = makeRegisterUseCase()

        //calling the execute function from the fabricated use case
        //passing to it the extracted data from above
        await registerUseCase.execute({
            name,
            email,
            password
        })
    } catch (err) {

        //if an error occurs and is an instance of UserAlreadyExists...
        if(err instanceof UserAlreadyExistsError) {
            return rep.status(409).send({message:err.message})
        }

        //if the error is not from the type above, just send it as is
        throw err
    }

    //return status 201 (resource created successfully)
    return rep.status(201).send()
}