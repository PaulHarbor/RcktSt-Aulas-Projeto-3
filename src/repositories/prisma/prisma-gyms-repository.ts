import { Gym, Prisma } from "@prisma/client";
import { FindNearbyParams, GymsRepository } from "../gym-repository";
import { prisma } from "@/lib/prisma";

export class PrismaGymsRepository implements GymsRepository{
    
    async findByID(id: string) {
        const gym = await prisma.gym.findUnique({
            where:{
                id
            }
        })

        return gym
    }

    async findManyNearby({latitude,longitude}: FindNearbyParams){
        const gyms = await prisma.$queryRaw<Gym[]>`
            SELECT * FROM gyms
            WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `
        //this is a raw SQL query executed by Prisma
        //the long WHERE statement is a nautical calculation of the distance between two coordinates
        //then it fetches only those who are less than 10km away

        return gyms
    }

    async searchMany(query: string, page: number){ //this method was created by me
        const gyms = await prisma.gym.findMany({ //this one comes with Prisma
            where:{
                title:{contains:query}, //the query makes search on title only             
            },
            take:20, //show 20 per page
            skip:(page-1)*20 //calculate when each page begins      
        })

        return gyms
    }

    async create(data: Prisma.GymCreateInput){
        const gym = await prisma.gym.create({
            data
        })

        return gym
    }

}