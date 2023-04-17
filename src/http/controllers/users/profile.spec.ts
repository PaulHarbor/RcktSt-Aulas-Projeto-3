import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthUser } from '@/utils/test/create-and-auth-user'

describe('Profile (e2e)', ()=>{

    beforeAll(async ()=>{
        await app.ready()
    })

    afterAll(async ()=>{
        await app.close()
    })

    it('should be able to get user profile', async () =>{
        
        const { token } = await createAndAuthUser(app)

        const profileResponse = await request(app.server)
            .get('/me')
            //mandando token de autenticação
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(profileResponse.statusCode).toEqual(200)
        

    })
})