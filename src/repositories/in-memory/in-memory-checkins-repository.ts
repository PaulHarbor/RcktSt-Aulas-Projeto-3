import { Prisma, CheckIn } from "@prisma/client";
import { CheckInRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryCheckinsRepository implements CheckInRepository {

  public items: CheckIn[] = []

  async findById(id: string) {
    const checkIn = this.items.find((item) => item.id === id)

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {

    //saves the date passed into the function with zero hour 00:00:00
    const startOfTheDay = dayjs(date).startOf('date')
    //saves the date passed into the function with its last second 23:59:59
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.items.find((checkIn) => {

      //getting check-in date
      const checkInDate = dayjs(checkIn.created_at)

      //comparing if it is between the start and end of the current day
      const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      //will return true if the user made the check-in on the same day as another check-in
      //false if it is the same user but different check-in dates
      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  async findManyByUserId(userId: string, page: number) {
    return this.items
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async countByUserId(userId: string) {
    return this.items.filter((item) => item.user_id === userId).length
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {

    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      //is 'validated_at' was passed in the request, convert it to a Date
      //if not, make it null
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),

    }

    //adding the created user to the array
    this.items.push(checkIn)

    return checkIn
  }

  async update(checkIn: CheckIn) {
    const checkInIndex = this.items.findIndex(item => item.id === checkIn.id)

    //we compare the index to zero because it returns -1 if false
    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
    }

    return checkIn
  }

}