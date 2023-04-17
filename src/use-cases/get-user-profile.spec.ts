import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository:InMemoryUsersRepository
let sut:GetUserProfileUseCase

describe('Get User Profile Use Case', ()=>{

    beforeEach(()=>{
        //instanciando repositório do tipo in-memory
        usersRepository = new InMemoryUsersRepository()
        //instanciando classe de cadastro que usa repositório in-memory instanciado acima
        sut = new GetUserProfileUseCase(usersRepository)
    })

    it('should be able to get user profile', async () =>{

        //criando usuário para tentativa de autenticação
        const createdUser = await usersRepository.create({
            name:'John Doe',
            email:'johndoe@example.com',
            password_hash: await hash('123456',6)
        })

        //tentativa de achar usuário via ID
        const { user } = await sut.execute({
            userId: createdUser.id
        })

        //espero que o id do usuário gerado seja igual a qualquer string
        expect(user.id).toEqual(expect.any(String))
    })

    it('should not get user profile w/ wrong id', async () =>{

        await expect(()=> sut.execute({
            userId: 'non-existing-id',
        })).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
    
})