import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error"
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case"

//essa é a função genérica que executa sempre que há um POST na rota '/users'
export async function register (req: FastifyRequest, rep: FastifyReply) {

    //o schema determina como deverá ser o body da request
    //ou seja, pra registrar um novo user, tem que enviar nome, email e senha
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    //extraindo dados da request após validar usando o schema do Zod
    const { name, email, password } = registerBodySchema.parse(req.body)

    try {

        //chamando a factory de RegisterUseCase
        const registerUseCase = makeRegisterUseCase()

        //chamando função da classe importada de use-case/register.ts
        //passando pra ela os dados da request extraídos acima
        await registerUseCase.execute({
            name,
            email,
            password
        })
    } catch (err) {

        //se o erro for do tipo que criamos lá em use-cases/errors
        if(err instanceof UserAlreadyExistsError) {
            return rep.status(409).send({message:err.message})
        }

        //se o erro não for de nenhum tipo acima, mandar ele 'seco'
        throw err
    }

    return rep.status(201).send()
}