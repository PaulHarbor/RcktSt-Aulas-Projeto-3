import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', ()=>{

    beforeAll(async ()=>{
        await app.ready()
    })

    afterAll(async ()=>{
        await app.close()
    })

    it('should be able to authenticate', async () =>{
        //criando conta de usuário pra depois autenticar
        await request(app.server)
            .post('/users')
            .send({
                name:'John Doe',
                email:'johndoe@example.com',
                password:'123456'
            })
        //autenticando usando login criado acima
        const response = await request(app.server)
            .post('/sessions')
            .send({
                email:'johndoe@example.com',
                password:'123456'
            })
        
        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            //esperamos que haja um token string
            token: expect.any(String)
        })
    })
})