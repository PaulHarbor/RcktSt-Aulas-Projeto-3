import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthUser(app: FastifyInstance){
    //criando conta de usuário pra depois autenticar
    await request(app.server)
    .post('/users')
    .send({
        name:'John Doe',
        email:'johndoe@example.com',
        password:'123456'
    })
    //autenticando usando login criado acima
    const authResponse = await request(app.server)
    .post('/sessions')
    .send({
        email:'johndoe@example.com',
        password:'123456'
    })

    const { token } = authResponse.body

    return {
        token,
    }
}

