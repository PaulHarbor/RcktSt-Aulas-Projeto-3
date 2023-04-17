import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error"
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case"

//função genérica de autenticação
export async function authenticate (req: FastifyRequest, rep: FastifyReply) {

    //o schema determina como deverá ser o body da request
    //ou seja, pra registrar um novo user, tem que enviar nome, email e senha
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    //extraindo dados da request após validar usando o schema do Zod
    const { email, password } = authenticateBodySchema.parse(req.body)

    try {

        const authenticateUseCase = makeAuthenticateUseCase()

        //chamando função da classe importada de use-case/register.ts
        //passando pra ela os dados da request extraídos acima
        const { user } = await authenticateUseCase.execute({
            email,
            password
        })

        //criando novo Json Web Token
        const token = await rep.jwtSign({}, {
            sign: {
                sub:user.id
            }
        })

        return rep.status(200).send({
            token
        })

    } catch (err) {

        //se o erro for do tipo que criamos lá em use-cases/errors
        if(err instanceof InvalidCredentialsError) {
            return rep.status(400).send({message:err.message})
        }

        //se o erro não for de nenhum tipo acima, mandar ele 'seco'
        throw err
    }
}