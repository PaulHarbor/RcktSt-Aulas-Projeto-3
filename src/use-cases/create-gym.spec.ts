import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { CreateGymUseCase } from './create_gym'


//criando variáveis para guardar o repositório e o system under test
let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register User Case', ()=>{

    //o beforeEach executa antes de todo teste
    //este em particular está inicializando os valores das lets acima
    beforeEach(()=>{
        //instanciando repositório do tipo in-memory
        gymsRepository = new InMemoryGymsRepository()
        //instanciando classe de cadastro que usa repositório in-memory instanciado acima
        sut = new CreateGymUseCase(gymsRepository)
    })

    it('should be able to register', async () =>{       

        const { gym } = await sut.execute({
            title:'Javascript Gym',
            description: null,
            phone: null,
            latitude:-27.2092052,
            longitude:-49.6401891,


        })

        //espero que o id do usuário gerado seja igual a qualquer string
        expect(gym.id).toEqual(expect.any(String))
    })
    
})