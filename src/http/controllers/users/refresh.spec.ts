import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh Token (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    //criando conta de usuário pra depois autenticar
    await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456'
      })
    //autenticando usando login criado acima
    const authResponse = await request(app.server)
      .post('/sessions')
      .send({
        email: 'johndoe@example.com',
        password: '123456'
      })
    
    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(authResponse.statusCode).toEqual(200)
    expect(authResponse.body).toEqual({
      //esperamos que haja um token string
      token: expect.any(String)
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken=')
    ])
  })
})