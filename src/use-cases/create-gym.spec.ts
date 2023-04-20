import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { CreateGymUseCase } from './create_gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register User Case', () => {

  beforeEach(() => {

    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to register', async () => {

    const { gym } = await sut.execute({
      title: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401891,


    })

    expect(gym.id).toEqual(expect.any(String))
  })

})