import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error"
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case"

//authentication function
export async function authenticate(req: FastifyRequest, rep: FastifyReply) {

  //to authenticate a user, the request must conform to this schema
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  //extracting request data after validating with Zod
  const { email, password } = authenticateBodySchema.parse(req.body)

  try {

    const authenticateUseCase = makeAuthenticateUseCase() //factory

    const { user } = await authenticateUseCase.execute({
      email,
      password
    })

    //creating new Json Web Token (access token)
    const token = await rep.jwtSign(
      {
        role: user.role //payload
      },
      {
        sign: { //signature
          sub: user.id //subject
        }
      })

    //creating refresh token (used to obtain a new access token)
    const refreshToken = await rep.jwtSign(
      {
        role: user.role
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d' //the refresh token expires in seven days
        }
      })

    return rep
      .setCookie('refreshToken', refreshToken, {
        path: '/', //this path allows the cookie to be read by any application route
        secure: true, //set to use https encryption
        sameSite: true, //cookie only accessible on the same domain
        httpOnly: true //cookie only accessible by the back-end via http
      })
      .status(200)
      .send({ token })

  } catch (err) {

    if (err instanceof InvalidCredentialsError) {
      return rep.status(400).send({ message: err.message })
    }

    throw err
  }
}