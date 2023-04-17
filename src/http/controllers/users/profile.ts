import { makeGetUserProfileUseCase } from "@/use-cases/factories/make-get-user-profile-use-case"
import { FastifyRequest, FastifyReply } from "fastify"

export async function profile (req: FastifyRequest, rep: FastifyReply) {
    
    const getUserProfile = makeGetUserProfileUseCase()

    const {user} = await getUserProfile.execute({
        //userId: (req.user as FastifyJWT).user.sub
        userId: req.user.sub
    })

    return rep.status(200).send({
        user:{
            ...user, //retorne todos os dados de user, MAS...
            password_hash: undefined //não mostre a hash do password
        }
    })
}