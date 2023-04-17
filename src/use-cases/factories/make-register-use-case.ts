import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { RegisterUseCase } from "../register"

//aqui estamos implementando o Factory Pattern
//criamos uma função para 'fabricar' um registerUseCase com suas dependências

export function makeRegisterUseCase(){

    //uma variável recebe o repositório que queiramos usar (Prisma, nesse caso)
    const usersRepository = new PrismaUsersRepository()
    //instancia-se uma classe importada da pasta use-cases que recebe o repositório
    const registerUseCase = new RegisterUseCase(usersRepository)
    //dessa forma, para trocar de repositório, basta mudar o que usersRepository recebe

    return registerUseCase
}