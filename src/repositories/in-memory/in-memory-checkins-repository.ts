import { Prisma, CheckIn } from "@prisma/client";
import { CheckInRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

//essa classe serve para salvar itens do banco em memória
//usamos ela pra agilizar os testes
export class InMemoryCheckinsRepository implements CheckInRepository {
                    
    //array de users pra funcionar como se fosse a tabela users
    public items: CheckIn[] = []
    
    async findById(id: string){
        const checkIn = this.items.find((item)=> item.id === id)
        
        if(!checkIn){
            return null
        }

        return checkIn
    }

    async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
        
        //vai salvar a data passada pra função com a hora zerada 00:00:00
        const startOfTheDay = dayjs(date).startOf('date')
        //vai salvar a data passada pra função com a hora 23:59:59
        const endOfTheDay = dayjs(date).endOf('date')

        //encontrar no array o checkIn cuja user_id é igual a userId
        const checkInOnSameDate = this.items.find((checkIn) => {
            
            //pegando a data do checkin
            const checkInDate = dayjs(checkIn.created_at)
            //comparando se ela está entre o começo e o fim do dia da data passada pra função
            const isOnSameDate =
                checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

            //o retorno será true se o mesmo usuário fez checkin duas vezes no mesmo dia
            //false se for o mesmo usuário, mas as datas de checkin forem diferentes
            return checkIn.user_id === userId && isOnSameDate
        })

        if(!checkInOnSameDate) {
            return null
        }

        return checkInOnSameDate
    }

    async findManyByUserId(userId: string, page:number) {
        return this.items
            .filter((item)=> item.user_id === userId)
            .slice((page -1) * 20, page * 20)
    }

    async countByUserId(userId: string){
        return this.items.filter((item)=> item.user_id === userId).length
    }

    async create(data: Prisma.CheckInUncheckedCreateInput):Promise<CheckIn> {

        //criando Check-in fictício para testes
        const checkIn = {
            id:randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            //se validated_at for passado na request, converter pra Date, senão, é nulo
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date(),

        }

        //adicionando user criado ao array
        this.items.push(checkIn)

        return checkIn
    }
    
    async update(checkIn: CheckIn){
        const checkInIndex = this.items.findIndex(item => item.id === checkIn.id)

        //comparamos com zero pq caso não encontre, ele retorna -1 como index
        if(checkInIndex >= 0){
            this.items[checkInIndex] = checkIn
        }

        return checkIn        
    }

}