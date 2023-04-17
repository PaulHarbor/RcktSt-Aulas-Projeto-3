import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { FetchUserHistoryUseCase } from './fetch-user-checkins-history'

//criando variáveis para guardar o repositório e o system under test
let checkinsRepository: InMemoryCheckinsRepository
let sut: FetchUserHistoryUseCase

describe('Fetch User Checkin History Use Case', ()=>{

    //o beforeEach executa antes de todo teste
    //este em particular está inicializando os valores das lets acima
    beforeEach( async ()=>{
        //instanciando repositório do tipo in-memory
        checkinsRepository = new InMemoryCheckinsRepository()
        //instanciando classe de histórico que usa repositório in-memory instanciado acima
        sut = new FetchUserHistoryUseCase(checkinsRepository)
              
    })
    
    it('should be able to fetch user check-in history', async () =>{

        //criando dois checkins pra exibir na lista
        await checkinsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        await checkinsRepository.create({
            gym_id:'gym-02',
            user_id:'user-01'
        })

        const { checkIns } = await sut.execute({
            userId:'user-01',
            page: 1           
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({gym_id:'gym-01'}),
            expect.objectContaining({gym_id:'gym-02'})
        ])
    })

    it('should be able to fetch paginated user check-in history', async () =>{
        
        //criando 22 checkins em 22 academias diferentes        
        for(let i = 1; i <= 22; i++){
            await checkinsRepository.create({
                gym_id: `gym-${i}`, 
                user_id: 'user-01'
            })
        }        

        const { checkIns } = await sut.execute({
            userId:'user-01',
            page: 2           
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            //esperamos aqui apenas as academias 21 e 22 pois queremos 20 itens por página
            expect.objectContaining({gym_id:'gym-21'}),
            expect.objectContaining({gym_id:'gym-22'})
        ])
    })
    
})