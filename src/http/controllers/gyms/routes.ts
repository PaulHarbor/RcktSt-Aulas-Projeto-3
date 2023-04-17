import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { create } from "domain";
import { nearby } from "./nearby";
import { search } from "./search";

export async function gymsRoutes(app:FastifyInstance){
    //chamando middleware (hook) que verifica se o usuário está autenticado
    //ele faz isso em toda request (onRequest)
    app.addHook('onRequest', verifyJWT)

    app.get('/gyms/search', search)
    app.get('/gyms/nearby', nearby)

    app.post('/gyms', create)
}