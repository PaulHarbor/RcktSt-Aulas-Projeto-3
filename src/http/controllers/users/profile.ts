import { makeGetUserProfileUseCase } from "@/use-cases/factories/make-get-user-profile-use-case"
import { FastifyRequest, FastifyReply } from "fastify"

export async function profile (req: FastifyRequest, rep: FastifyReply) {
    
    const getUserProfile = makeGetUserProfileUseCase()

    const {user} = await getUserProfile.execute({        
        userId: req.user.sub //sending userId from the token
    })

    return rep.status(200).send({
        user:{
            ...user, //return user data BUT...
            password_hash: undefined //don't show the password hash
        }
    })
}