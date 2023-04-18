import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthUser(app: FastifyInstance,
  isAdmin = false)
  {
    //criando conta de usuário pra depois autenticar
    const user = await prisma.user.create({
      data:{
        name:'John Doe',
        email:'johndoe@example.com',
        password_hash: await hash('123456',6),
        role: isAdmin ? 'ADMIN' : 'MEMBER'
      }
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

