import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

//interface for user creation requests
interface RegisterUserCaseRequest {
    name: string,
    email: string,
    password: string
}

//interface user creation responses
interface RegisterUseCaseResponse {
    user: User //this User is defined in prisma/schema.prisma
}

//exporting user registering class
//this class is meant to be able to use any kind of repository
export class RegisterUseCase{

    //its constructor receives the repository as an argument
    //this dependency is an interface created to use any repository (ex.:Prisma)
    constructor(private usersRepository:UsersRepository) {}

    //this function registers a new user, it receives data of type RegisterUseCaseRequest (the interface above)
    //it will be called in controllers/register.ts
    async execute({
        name,
        email,
        password             //it returns a promise with data of type RegisterUseCaseResponse (the other interface above)
    }: RegisterUserCaseRequest): Promise<RegisterUseCaseResponse>{    
        
        //first we hash the new user's password
        //6 is the amount of passes of the hashing algorithm
        const password_hash = await hash(password, 6) 
    
        //check if there is already someone registered with the same email
        //since usersRepository implements the interface, it must have the same methods
        //in this case, create and findByEmail
        const userWithSameEmail = await this.usersRepository.findByEmail(email)
    
        if(userWithSameEmail){
            throw new UserAlreadyExistsError() //error defined in use-cases/errors
        }
        
        //here we actually register the user
        const user = await this.usersRepository.create({
            name,
            email,
            password_hash
        })

        return {
            user,
        }
         
    }

}