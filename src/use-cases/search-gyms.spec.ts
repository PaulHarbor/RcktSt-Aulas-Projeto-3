import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { SearchGymsUseCase } from './search-gyms'

//criando variáveis para guardar o repositório e o system under test
let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', ()=>{

    //o beforeEach executa antes de todo teste
    //este em particular está inicializando os valores das lets acima
    beforeEach( async ()=>{
        //instanciando repositório do tipo in-memory
        gymsRepository = new InMemoryGymsRepository()
        //instanciando classe de histórico que usa repositório in-memory instanciado acima
        sut = new SearchGymsUseCase(gymsRepository)
              
    })
    
    it('should be able to search for gyms', async () =>{

        //criando duas academias pra exibir na lista
        await gymsRepository.create({
            title:'Javascript Gym',
            description: null,
            phone: null,
            latitude:-27.2092052,
            longitude:-49.6401891,

        })

        await gymsRepository.create({
            title:'Typescript Gym',
            description: null,
            phone: null,
            latitude:-27.2092052,
            longitude:-49.6401891,
        })

        //executando o search com a query e número de páginas
        const { gyms } = await sut.execute({
            query:'Javascript',
            page:1
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([expect.objectContaining({title:'Javascript Gym'})])
        
    })

    it('should be able to fetch paginated gym search', async () =>{
        
        //criando 22 academias diferentes pra listar
        for(let i = 1; i <= 22; i++){
            await gymsRepository.create({
                title:`Javascript Gym ${i}`,
                description: null,
                phone: null,
                latitude:-27.2092052,
                longitude:-49.6401891,
            })
        }        

        const { gyms } = await sut.execute({
            query:'Javascript',
            page: 2           
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            //esperamos aqui apenas as academias 21 e 22 pois queremos 20 itens por página
            expect.objectContaining({title:'Javascript Gym 21'}),
            expect.objectContaining({title:'Javascript Gym 22'})
        ])
    })
    
})