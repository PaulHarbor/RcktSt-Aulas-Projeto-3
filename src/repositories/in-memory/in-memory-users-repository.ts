import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "node:crypto";

//this class saves user data in memory
//we use it to streamline the unit tests
export class InMemoryUsersRepository implements UsersRepository {

  //users array that will mimic the User table in the database
  public items: User[] = []

  async findByID(id: string) {
    //this looks for an 'item' in the items array where its id is equal to the one passed to the function
    const user = this.items.find(item => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    //this looks for a user with the email passed to the function
    const user = this.items.find(item => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {

    //here we create a fictional user for testing
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date()
    }

    //then push it into the array
    this.items.push(user)

    //and return it to whoever called the function
    return user
  }

}