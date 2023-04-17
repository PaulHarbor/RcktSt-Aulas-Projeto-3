import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

//criando variáveis para guardar o repositório e o system under test
let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', ()=>{

    //o beforeEach executa antes de todo teste
    //este em particular está inicializando os valores das lets acima
    beforeEach( async ()=>{
        //instanciando repositório do tipo in-memory
        gymsRepository = new InMemoryGymsRepository()
        //instanciando classe de histórico que usa repositório in-memory instanciado acima
        sut = new FetchNearbyGymsUseCase(gymsRepository)
              
    })
    
    it('should be able to fetch nearby gyms', async () =>{

        //criando duas academias pra exibir na lista
        await gymsRepository.create({
            title:'Close Gym',
            description: null,
            phone: null,
            latitude:-27.2092052,
            longitude:-49.6401891,

        })

        await gymsRepository.create({
            title:'Far Gym',
            description: null,
            phone: null,
            latitude:-26.2544728,
            longitude:-49.5222467,
        })

        //executando o search com as coordenadas do usuário
        const { gyms } = await sut.execute({
            userLatitude:-27.2092052,
            userLongitude:-49.6401891
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([expect.objectContaining({title:'Close Gym'})])
        
    })
    
})