import { CheckIn, Prisma } from "@prisma/client";
import { CheckInRepository } from "../check-ins-repository";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export class PrismaCheckinsRepository implements CheckInRepository {

  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: { id }
    })

    return checkIn
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data
    })

    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20
    })

    return checkIns
  }

  async findByUserIdOnDate(userId: string, date: Date) {

    const startOfTheDay = dayjs(date).startOf('date') //getting the start of the specified date
    const endOfTheDay = dayjs(date).endOf('date') //getting the end of the specified date

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          //gte = greater than or equal
          gte: startOfTheDay.toDate(),
          //lte = lower than or equal
          lte: endOfTheDay.toDate()
          //find the check-in where "created_at" is higher than current date's start and lower than its end
          //meaning it was on the same day
        }
      }
    })

    return checkIn
  }

  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId
      },
    })

    return count
  }

  async update(data: CheckIn) { //this 'update' was created by me
    const checkIn = await prisma.checkIn.update({ //this 'update' is a Prisma method
      where: { //fetch the check-in which has the same ID as the one passed to the function
        id: data.id
      },
      data //then update it with the data from the check-in passed to the function
    })

    return checkIn
  }
}
