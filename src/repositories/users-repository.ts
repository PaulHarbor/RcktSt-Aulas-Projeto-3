import { Prisma, User } from "@prisma/client";

//exporting generic repository interface
//whichever repository we use, has to have the following methods
export interface UsersRepository {

    findByID(id:string):Promise<User | null>
    //receives an id, returns User or null (as a promise)    
    
    findByEmail(email : string): Promise<User | null>
    //receives an email, returns a User or null
    
    create(data: Prisma.UserCreateInput): Promise<User>
    //receives data conforming to Prisma.UserCreateInput, returns a User
    
}

//since it's an interface, we need only write the method signatures
//implementation will depend on each class that uses the interface