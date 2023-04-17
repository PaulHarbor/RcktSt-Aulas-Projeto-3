import { Gym, Prisma } from "@prisma/client";

export interface FindNearbyParams {
    latitude:number,
    longitude:number
}

export interface GymsRepository {

    findByID(id:string):Promise<Gym | null>  
    findManyNearby(params:FindNearbyParams) :Promise<Gym[]>
    searchMany(query:string,page:number):Promise<Gym[]>
    create(data: Prisma.GymCreateInput):Promise<Gym>
    
}