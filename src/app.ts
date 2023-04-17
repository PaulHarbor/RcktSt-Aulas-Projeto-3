import fastify from 'fastify'
import { userRoutes } from './http/controllers/users/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { checkinRoutes } from './http/controllers/checkins/routes'

export const app = fastify()

//registrando o módulo de JWT do Fastify com palavra-chave importada do .env
app.register(fastifyJwt,{
    secret:env.JWT_SECRET
})
app.register(userRoutes)
app.register(gymsRoutes)
app.register(checkinRoutes)

//esse '_' antes da request simboliza que não usaremos request para nada neste bloco
app.setErrorHandler((error, _req, rep)=>{

    if(error instanceof ZodError){
        return rep.status(400)
                  .send({
                    message:'⛔Validation error...',
                    issues: error.format()
                  })  
    }

    if(env.NODE_ENV !== 'production'){
        console.error(error)
    } else {
        //Logar erro para ferramenta externa
        //Ex: Datadog, NewRelic, Sentry
    }

    //se cair nesse retorno, é pq o erro é desconhecido
    return rep.status(500).send({
        message:'🔥 Internal server error...'
    })
})