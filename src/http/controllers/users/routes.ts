import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export async function userRoutes(app:FastifyInstance){

    //se fizerem um POST na rota '/users', executamos a função 'register' de ./controllers/register.ts
    app.post('/users', register)

    //POST na rota '/sessions' é autenticação (tentativa de login)
    app.post('/sessions', authenticate)


    //==========ROTAS DE USUÁRIO AUTENTICADO==========

    //rota pra profile do usuário
    app.get('/me',{onRequest:[verifyJWT]}, profile)
    //o 'onRequest' executará antes do 'profile'
    //ele vai passar a request e a reply pra o método verifyJWT
    //o método verifica se o token é genuíno
}