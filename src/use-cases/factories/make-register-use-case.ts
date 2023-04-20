import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { RegisterUseCase } from "../register"

//here we implement the Factory Pattern
//we create a function to 'fabricate' a register use case

export function makeRegisterUseCase(){

    //this variable receives the repository (Prisma in this case)
    const usersRepository = new PrismaUsersRepository()
    //then we instance a RegisterUseCase object that gets constructed using the repository as dependency
    const registerUseCase = new RegisterUseCase(usersRepository)
    //this way, changing repositories is easy

    return registerUseCase
}