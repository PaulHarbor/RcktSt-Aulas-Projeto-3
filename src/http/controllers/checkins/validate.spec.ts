import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthUser } from '@/utils/test/create-and-auth-user'
import { prisma } from '@/lib/prisma'

describe('Validate Checkin (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to validate a checkin', async () => {

    //criando e autenticando usuário no banco de teste
    const { token } = await createAndAuthUser(app, true)
    //buscando primeiro user (vai resultado no criado acima)
    const user = await prisma.user.findFirstOrThrow() 
    //criando academia pra user fazer checkin
    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -27.2092052,
        longitude: -49.640191
      }
    })
    //criando checkin na academia criada acima
    let checkIn = await prisma.checkIn.create({
      data:{
        gym_id:gym.id,
        user_id:user.id
      }
    })
    //validando checkin
    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      //mandando token de autenticação
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204) //PATCH success

    //buscando checkin validado acima
    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where:{
        id:checkIn.id
      }
    })

    //esperamos que validated_at contenha qualquer data (antes estava vazio)
    expect(checkIn.validated_at).toEqual(expect.any(Date))

  })
})