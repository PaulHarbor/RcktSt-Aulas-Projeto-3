import { prisma } from "@/lib/prisma"
import { Prisma } from '@prisma/client'
import { UsersRepository } from "../users-repository"

//exporting a class that implements the UsersRepository interface
//this class uses the Prisma toolkit and ORM (Object-relational Mapper)
export class PrismaUsersRepository implements UsersRepository {

  //all the methods are in conformity to the UsersRepository interface

  async findByID(id: string) {
    //here we receive an id and use the Prisma findUnique method on the user table to look for a matching user
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })
    //then returns the finding to whoever called the function
    //the interface method signature returns 'null' if nothing is found
    return user
  }
  
  async findByEmail(email: string) {
    //same as above, but filtering by email
    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    })

    return user
  }

  //the create method, which receives data of type Prisma.UserCreateInput
  async create(data: Prisma.UserCreateInput) {
    //and creates the user with prisma's own 'create' method
    const user = prisma.user.create({
      data
    })
        
    return user
  }
}