import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "node:crypto";

//essa classe serve para salvar itens do banco em memória
//usamos ela pra agilizar os testes
export class InMemoryUsersRepository implements UsersRepository {

    //array de users pra funcionar como se fosse a tabela users
    public items: User[] = []

    async findByID(id: string){
        const user = this.items.find(item => item.id === id)

        if(!user){
            return null
        }

        return user
    }

    async findByEmail(email: string) {

        //procurar user dentro do array de items que tem o email passado pra função
        const user = this.items.find(item => item.email === email)

        if(!user){
            return null
        }

        return user
    }
    async create(data: Prisma.UserCreateInput) {

        //criando usuário fictício para testes
        const user = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date()
        }

        //adicionando user criado ao array
        this.items.push(user)

        return user
    }

}