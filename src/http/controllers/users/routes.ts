import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { refresh } from "./refresh";

export async function userRoutes(app:FastifyInstance){

    //if a POST is made in the '/users' route, we run the 'register' function from ./register.ts
    app.post('/users', register)

    //POST on the '/sessions' route is authentication attempt
    app.post('/sessions', authenticate)

    //this route is called if the user needs to refresh his/her authentication
    app.patch('/token/refresh', refresh)

    //==========AUTHENTICATED USER ROUTES==========

    //route for user profile
    app.get('/me',{onRequest:[verifyJWT]}, profile)
    //the 'onRequest' method will run before the profile method
    //it will pass the request and reply to the verifyJWT method
    //it will verify if the token is valid
}