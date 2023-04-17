import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

//criando variáveis para guardar o repositório e o system under test
let checkinsRepository: InMemoryCheckinsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', ()=>{

    //o beforeEach executa antes de todo teste
    //este em particular está inicializando os valores das lets acima
    beforeEach( async ()=>{
        //instanciando repositório do tipo in-memory
        checkinsRepository = new InMemoryCheckinsRepository()
        //instanciando classe de métricas que usa repositório in-memory instanciado acima
        sut = new GetUserMetricsUseCase(checkinsRepository)
              
    })
    
    it('should be able to get checkins count from user metrics', async () =>{

        //criando dois checkins pra exibir na lista
        await checkinsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        await checkinsRepository.create({
            gym_id:'gym-02',
            user_id:'user-01'
        })

        const { checkInsCount } = await sut.execute({
            userId:'user-01',               
        })        

        expect(checkInsCount).toEqual(2)
        
    })    
    
})