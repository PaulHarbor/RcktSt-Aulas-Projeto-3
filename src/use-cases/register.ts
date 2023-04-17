import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

//interface pra request de dados de user a ser criado
interface RegisterUserCaseRequest {
    name: string,
    email: string,
    password: string
}

//interface pra resposta de retorno de user recém criado
interface RegisterUseCaseResponse {
    user: User
}

//exportando classe que cadastra usuário
//essa classe consegue cadastrar usando qualquer repositório
export class RegisterUseCase{

    //o construtor recebe a dependência como argumento
    //essa dependência é uma interface criada para qualquer tipo de repositório (ex.:Prisma)
    constructor(private usersRepository:UsersRepository) {}

    //função que cadastra usuário, a função recebe um argumento do tipo RegisterUseCaseRequest da interface acima
    //note que ela está sendo chamada lá em controllers/register.ts
    async execute({
        name,
        email,
        password             //e retorna uma promise com dados do tipo RegisterUseCaseResponse (a outra interface acima)
    }: RegisterUserCaseRequest): Promise<RegisterUseCaseResponse>{    
        
        //primeiro hasheamos o password do novo usuário
        //o 6 é o número de passes do algoritmo de hashing
        const password_hash = await hash(password, 6) 
    
        //checar se já existe usuário com mesmo email cadastrado
        //como usersRepository implementa a interface, é obrigatório possuir os métodos dela
        //nesse caso: os métodos findByEmail e create
        const userWithSameEmail = await this.usersRepository.findByEmail(email)
    
        if(userWithSameEmail){
            throw new UserAlreadyExistsError() //erro criado lá em use-cases/errors
        }
        
        //aqui cadastramos propriamente o user
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