import { prisma } from "@/lib/prisma"
import { Prisma } from '@prisma/client'
import { UsersRepository } from "../users-repository"

//exportando classe que implementa a interface UsersRepository
//essa classe será usada lá em use-cases/register.ts como repositório passado para o constructor da classe RegisterUseCase
//ela usa Prisma como repositório
export class PrismaUsersRepository implements UsersRepository {
    
    async findByID(id: string){
        const user = await prisma.user.findUnique({
            where:{
                id
            }
        })

        return user
    }
    
    //aqui implementamos o findByEmail para atender aos requisitos da interface UsersRepository
    async findByEmail(email: string){
        
        //método do prisma para encontrar usuário que atende ao filtro
        //nesse caso, o filtro é o email, ele acha o usuário que possui o email passado pra função
        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        })

        //aqui retornaremos user (se houver) ou NULL (vide a interface users-repository.ts)
        return user
    }

    //implementando método create da interface que receberá dados do tipo Prisma.UserCreateInput
    async create(data: Prisma.UserCreateInput)    {
        //e criará o user usando o método do Prisma
        const user = prisma.user.create({
            data
        })

        //retornando uma Promise com o user
        return user
    }
}