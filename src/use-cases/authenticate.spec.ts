import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository:InMemoryUsersRepository
let sut:AuthenticateUseCase

describe('Authenticate User Case', ()=>{

    beforeEach(()=>{
        //instanciando repositório do tipo in-memory
        usersRepository = new InMemoryUsersRepository()
        //instanciando classe de cadastro que usa repositório in-memory instanciado acima
        sut = new AuthenticateUseCase(usersRepository)
    })

    it('should be able to authenticate', async () =>{

        //criando usuário para tentativa de autenticação
        await usersRepository.create({
            name:'John Doe',
            email:'johndoe@example.com',
            password_hash: await hash('123456',6)
        })

        //tentativa de login (o método 'execute' da classe AuthenticateUseCase)
        const { user } = await sut.execute({
            email:'johndoe@example.com',
            password:'123456'
        })

        //espero que o id do usuário gerado seja igual a qualquer string
        expect(user.id).toEqual(expect.any(String))
    })

    it('should not authenticate w/ wrong email', async () =>{

        await expect(()=> sut.execute({
            email:'johnnydoe@example.com', //email errado
            password:'123456'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not authenticate w/ wrong password', async () =>{

        //criando usuário pra tentar autenticar com senha errada
        await usersRepository.create({
            name:'John Doe',
            email:'johndoe@example.com',
            password_hash: await hash('123456',6)
        })

        await expect(()=> sut.execute({
            email:'johndoe@example.com',
            password:'123457' //senha errada
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    
})