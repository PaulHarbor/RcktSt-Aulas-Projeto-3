import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

//criando variáveis para guardar o repositório e o system under test
let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register User Case', ()=>{

    //o beforeEach executa antes de todo teste
    //este em particular está inicializando os valores das lets acima
    beforeEach(()=>{
        //instanciando repositório do tipo in-memory
        usersRepository = new InMemoryUsersRepository()
        //instanciando classe de cadastro que usa repositório in-memory instanciado acima
        sut = new RegisterUseCase(usersRepository)
    })

    it('should be able to register', async () =>{       

        //chamamos o método execute de use-cases/register.ts e passamos dados genéricos para ele
        //ele retornará um usuário, após ter hasheado o password
        const { user } = await sut.execute({
            name:'Fulano',
            email:'fulano@example.com',
            password:'123456'
        })

        //espero que o id do usuário gerado seja igual a qualquer string
        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async ()=>{

        //chamamos o método execute de use-cases/register.ts e passamos dados genéricos para ele
        //ele retornará um usuário, após ter hasheado o password
        const { user } = await sut.execute({
            name:'Fulano',
            email:'fulano@example.com',
            password:'123456'
        })

        //aqui hasheamos novamente o mesmo password '123456' para ver se as duas hashes batem
        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash
        )

        //e esperamos que batam
        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {
        
        //email pra ser repetido em dois cadastros
        const email = 'fulano@example.com'

        //chamamos o método execute de use-cases/register.ts e passamos dados genéricos para ele
        //ele retornará um usuário, após ter hasheado o password
        await sut.execute({
            name:'Fulano',
            email,
            password:'123456'
        })

        //usamos await nesse expect abaixo pq o 'execute' retorna promise
        await expect(()=>
            //repetindo o mesmo cadastro pra gerar conflito de email
            sut.execute({
            name:'Fulano',
            email,
            password:'123456'
        })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError) 
        //esperamos que rejeite (dê erro) e o erro seja do tipo passado

    })
})