import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gym-repository'


interface CreateGymCaseRequest {
  title: string,
  //description is optional, hence the '?'
  //it can be a string (updating the description)
  //it can be null (removing the description)
  description?: string | null,
  phone: string | null,
  latitude: number,
  longitude: number


}

interface CreateGymCaseResponse {
  gym: Gym
}

//exporting class that creates a new gym
export class CreateGymUseCase {

  constructor(private gymsRepository: GymsRepository) { }
  
  async execute({
    title,
    description,
    phone,
    latitude,
    longitude           
  }: CreateGymCaseRequest): Promise<CreateGymCaseResponse> {

    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude
    })

    return {
      gym,
    }

  }

}