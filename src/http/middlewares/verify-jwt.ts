import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJWT(req: FastifyRequest, rep: FastifyReply) { //this method was written by me

  try {
    await req.jwtVerify() //this method comes from the plugin
  }

  catch (err) {
    return rep.status(401).send({ message: '⛔ Unauthorized...' })
  }
}