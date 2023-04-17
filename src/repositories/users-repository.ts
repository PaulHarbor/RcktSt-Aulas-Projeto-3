import { Prisma, User } from "@prisma/client";

//exportando interface genérica para repositórios
//qualquer repositório que usemos, tem que ter os métodos abaixo
export interface UsersRepository {

    findByID(id:string):Promise<User | null>
    
    //assinatura que recebe uma string de email
    //retorna uma Promise com dados tipo User OU null
    findByEmail(email : string): Promise<User | null>

    //assinatura que recebe dados do tipo Prisma.UserCreateInput
    //retorna uma Promise com dados tipo User
    create(data: Prisma.UserCreateInput): Promise<User>



}

//por ser uma interface, só escrevemos as assinaturas dos métodos
//a implementação depende de cada classe que for implementar a interface