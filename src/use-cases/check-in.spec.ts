import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime'
import { DoubleCheckinError } from './errors/double-checkin-error'
import { MaxDistanceError } from './errors/max-distance-error'


//criando variáveis para guardar o repositório e o system under test
let checkinsRepository: InMemoryCheckinsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in User Case', ()=>{

    //o beforeEach executa antes de todo teste
    //este em particular está inicializando os valores das lets acima
    beforeEach( async ()=>{
        //instanciando repositório do tipo in-memory
        checkinsRepository = new InMemoryCheckinsRepository()

        gymsRepository = new InMemoryGymsRepository()
        //instanciando classe de checkin que usa repositório in-memory instanciado acima
        sut = new CheckInUseCase(checkinsRepository,gymsRepository)

        //criando academia fictírica pra testes 
        await gymsRepository.create({
            id: 'gym-01',
            title: 'Javascript Gym',
            description: '',
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401891
        })

        vi.useFakeTimers()
        //pra usar datas fictícias
    })

    afterEach(()=>{
        vi.useRealTimers()
        //voltar a usar datas reais após cada teste
    })

    it('should be able to check in', async () =>{

        //criando checkIn
        const { checkIn } = await sut.execute({
            userId:'user-01',
            gymId:'gym-01',
            userLatitude:-27.2092052,
            userLongitude:-49.6401891
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in twice on the same day', async () =>{       
        
        //setando data fictícia pro sistema
        //o primeiro '0' se refere ao mês de janeiro, pois é o index do array de meses
        //o 10 é a data, o 8 é a hora e os dois zeros são minutos e segundos
        //por causa do fuso, a hora vai aparecer como 3 a mais (8 horas vai ficar 11)
        vi.setSystemTime(new Date(2023,0,10,8,0,0))

        //criando primeiro checkin
        await sut.execute({
            userId:'user-01',
            gymId:'gym-01',
            userLatitude:-27.2092052,
            userLongitude:-49.6401891
        })

        //criando segundo checkin no mesmo dia
        await expect(()=> sut.execute({
            userId:'user-01',
            gymId:'gym-01',
            userLatitude:-27.2092052,
            userLongitude:-49.6401891
        })).rejects.toBeInstanceOf(DoubleCheckinError)
        
    })

    it('should be able to check in twice but on different days', async () =>{       
        
        //criando data pro primeiro checkin
        vi.setSystemTime(new Date(2023,0,10,8,0,0))
        //criando primeiro checkin
        await sut.execute({
            userId:'user-01',
            gymId:'gym-01',
            userLatitude:-27.2092052,
            userLongitude:-49.6401891
        })

        //criando data diferente pro segundo checkin
        vi.setSystemTime(new Date(2023,0,11,8,0,0))
        //criando segundo checkin
        const {checkIn} = await sut.execute({
            userId:'user-01',
            gymId:'gym-01',
            userLatitude:-27.2092052,
            userLongitude:-49.6401891
        })

        expect(checkIn.id).toEqual(expect.any(String))
        
    })

    it('should not be able to check in on distant gym', async () =>{

        //criando segunda academia fictícia além da criada no beforeEach
        gymsRepository.items.push({
            id: 'gym-02',
            title: 'Javascript Gym',
            description: '',
            phone: null,
            latitude: new Decimal(-9.5481307),
            longitude: new Decimal(-35.6787509),
        })

        //criando checkIn na segunda academia (pelo id)
        await expect(()=> sut.execute({
            userId:'user-01',
            gymId:'gym-02', //note o id
            userLatitude:-9.4872084,
            userLongitude:-35.657623
        })).rejects.toBeInstanceOf(MaxDistanceError)
        

        
    })
    
})