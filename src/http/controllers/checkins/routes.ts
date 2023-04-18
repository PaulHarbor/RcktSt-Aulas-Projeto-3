import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { create } from "./create";
import { validate } from "./validate";
import { history } from "./history";
import { metrics } from "./metrics";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";

export async function checkinRoutes(app: FastifyInstance) {
  //chamando middleware (hook) que verifica se o usuário está autenticado
  //ele faz isso em toda request (onRequest)
  app.addHook('onRequest', verifyJWT)

  //gymId vem como parametro da request
  app.post('/gyms/:gymId/check-ins', create)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.patch('/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validate)
}