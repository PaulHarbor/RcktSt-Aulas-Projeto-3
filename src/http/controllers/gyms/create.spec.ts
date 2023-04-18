import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthUser } from '@/utils/test/create-and-auth-user'

describe('Create Gym (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a Gym', async () => {

    const { token } = await createAndAuthUser(app, true)

    const response = await request(app.server)
      .post('/gyms')
      //mandando token de autenticação
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Javascript Gym',
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.640191
      })

    console.log("Create Gym Response: ", response.statusCode)

    expect(response.statusCode).toEqual(201)

  })
})