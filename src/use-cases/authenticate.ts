import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";


//interfaces for request and response of the authentication use case
interface AuthenticateUseCaseRequest {
    email:string,
    password: string,
}

interface AuthenticateUseCaseResponse {
    user: User
}

//class for user authentication
export class AuthenticateUseCase {

    constructor(
        private usersRepository: UsersRepository, //receiving whatever repository we're using (ex: Prisma)
    ) {}

    async execute({ //method that authenticates user
        email,
        password
    }:AuthenticateUseCaseRequest):Promise<AuthenticateUseCaseResponse> {

        //searching for user with email used in authentication attempt
        const user = await this.usersRepository.findByEmail(email)

        //if it doesn't find a user
        if(!user) {
            throw new InvalidCredentialsError()
        }

        //verifying password with the bcrypt 'compare' method
        //it hashes the first argument and compares with the second (which should be a hash too)
        const doesPasswordMatch = await compare(password, user.password_hash)

        //if password doesn't match
        if(!doesPasswordMatch){
            throw new InvalidCredentialsError()            
        }

        //everything's fine? return user
        return {
            user,
        }
    }
}