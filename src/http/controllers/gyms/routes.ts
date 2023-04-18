import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { create } from "./create";
import { nearby } from "./nearby";
import { search } from "./search";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";

export async function gymsRoutes(app:FastifyInstance){
    //chamando middleware (hook) que verifica se o usuário está autenticado
    //ele faz isso em toda request (onRequest)
    app.addHook('onRequest', verifyJWT)

    app.get('/gyms/search', search)
    app.get('/gyms/nearby', nearby)

    app.post('/gyms',{onRequest:[verifyUserRole('ADMIN')]}, create)
}