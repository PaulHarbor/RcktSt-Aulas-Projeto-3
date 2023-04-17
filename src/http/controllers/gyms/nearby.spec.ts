import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthUser } from '@/utils/test/create-and-auth-user'

describe('Nearby Gyms (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {

    const { token } = await createAndAuthUser(app)

    //criando primeira academia (perto)
    const gym1 = await request(app.server)
      .post('/gyms')
      //mandando token de autenticação
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'Some description',
        phone: '1199999999',
        latitude: -27.2092052,
        longitude: -49.6401891
      })
    console.log('Gym1: ', gym1.statusCode)
    console.log('Gym1: ', gym1.headers)

    //criando segunda academia (longe)
    const gym2 = await request(app.server)
      .post('/gyms')
      //mandando token de autenticação
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypeScript Gym',
        description: 'Some description',
        phone: '1199999999',
        latitude: -26.2544728,
        longitude: -49.5222467
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -27.2092052,
        longitude: -49.6401891
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    console.log("Response: ", response.body)

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym'
      })
    ])

  })
})