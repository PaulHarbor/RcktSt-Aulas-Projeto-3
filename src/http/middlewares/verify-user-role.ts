import { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRole(roleToVerify: 'ADMIN' | 'MEMBER') {
  return async (req: FastifyRequest, rep: FastifyReply) => {

    const { role } = req.user

    if (role != 'ADMIN') {
      return rep.status(401)
        .send({ message: '⛔ Unauthorized...' })
    }
  }
}
