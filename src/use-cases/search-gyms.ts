import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gym-repository'


interface SearchGymsCaseRequest {
  query: string //we need a query to look for
  page: number //and a page number to list the findings
}

interface SearchGymsCaseResponse {
  gyms: Gym[] //the response should be an array of gyms
}

export class SearchGymsUseCase {
  
  constructor(private gymsRepository: GymsRepository) { }

  async execute({
    query,
    page    
  }: SearchGymsCaseRequest): Promise<SearchGymsCaseResponse> {

    const gyms = await this.gymsRepository.searchMany(
      query,
      page
    )

    return {
      gyms,
    }

  }

}