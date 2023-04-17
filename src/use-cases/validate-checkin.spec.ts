import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { ValidateCheckInUseCase } from './validate-checkin'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

//criando variáveis para guardar o repositório e o system under test
let checkinsRepository: InMemoryCheckinsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-in Use Case', ()=>{

    //o beforeEach executa antes de todo teste
    //este em particular está inicializando os valores das lets acima
    beforeEach( async ()=>{
        //instanciando repositório do tipo in-memory
        checkinsRepository = new InMemoryCheckinsRepository()

        //instanciando classe de checkin que usa repositório in-memory instanciado acima
        sut = new ValidateCheckInUseCase(checkinsRepository)

        vi.useFakeTimers()
        //pra usar datas fictícias
    })

    afterEach(()=>{
        vi.useRealTimers()
        //voltar a usar datas reais após cada teste
    })

    it('should be able to validate the check-in', async () =>{

        const createdCheckIn = await checkinsRepository.create({
            gym_id:'gym-01',
            user_id:'user-01'
        })

        const { checkIn } = await sut.execute({
           checkInId: createdCheckIn.id
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(checkinsRepository.items[0].validated_at).toEqual(expect.any(Date))
    })

    it('should not be able to validate non-existing check-in', async () =>{
       
        await expect(()=>
            sut.execute({
                checkInId:'bogus id'
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

    it('should not be able to validate checkin after 20mins of its creation', async () =>{
        
        vi.setSystemTime(new Date(2023,0,1,13,40))

        const createdCheckIn = await checkinsRepository.create({
            gym_id:'gym-01',
            user_id:'user-01'
        })

        const twentyOneMinutesInMs = 1000 * 60 * 21
        vi.advanceTimersByTime(twentyOneMinutesInMs)

        await expect(()=> sut.execute({
            checkInId: createdCheckIn.id,
        })).rejects.toBeInstanceOf(Error)
    })
})