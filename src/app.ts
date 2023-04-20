import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import { userRoutes } from './http/controllers/users/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { checkinRoutes } from './http/controllers/checkins/routes'

export const app = fastify() //creating fastify instance to deal with HTTP functionality

//registering the JWT module and using the .env secret word
app.register(fastifyJwt,{
    secret:env.JWT_SECRET,
    cookie:{ //configuring the cookie
      cookieName:'refreshToken',
      signed:false
    },
    sign:{
      expiresIn:'10m' //expiration of the JWT signature
    }
})

app.register(fastifyCookie)

app.register(userRoutes)
app.register(gymsRoutes)
app.register(checkinRoutes)

//this '_' before the request means we won't be using 'req' for anything
app.setErrorHandler((error, _req, rep)=>{

    if(error instanceof ZodError){
        return rep.status(400)
                  .send({
                    message:'⛔ Validation error...',
                    issues: error.format()
                  })  
    }

    if(env.NODE_ENV !== 'production'){
        console.error(error)
    } else {
        //Log error to external tool
        //Ex: Datadog, NewRelic, Sentry
    }

    //if it comes down to this return, the error is unknown
    return rep.status(500).send({
        message:'🔥 Internal server error...'
    })
})