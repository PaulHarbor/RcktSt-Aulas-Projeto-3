import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileUseCaseRequest {
  userId: string,
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {

  constructor(
    private usersRepository: UsersRepository,
  ) { }

  async execute({
    userId
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {

    //finding the user by ID to return profile info
    const user = await this.usersRepository.findByID(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}