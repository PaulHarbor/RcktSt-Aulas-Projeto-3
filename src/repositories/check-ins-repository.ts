import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInRepository {

    findById(id:string):Promise<CheckIn | null>
    
    //we use the 'unchecked' version of CreateInput because we can only create check-ins with preexistent user and gym IDs
    create(data: Prisma.CheckInUncheckedCreateInput):Promise<CheckIn>

    //method for finding a user's check-in list, returns an array of check-ins
    findManyByUserId(userId:string, page:number):Promise<CheckIn[]>

    //method for checking if the user has made more than one check-in on the same date
    findByUserIdOnDate(userId:string,date:Date):Promise<CheckIn | null>

    countByUserId(userId:string):Promise<number>

    update(checkIn: CheckIn):Promise<CheckIn>
}