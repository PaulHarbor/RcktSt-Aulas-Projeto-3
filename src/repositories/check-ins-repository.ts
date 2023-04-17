import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInRepository {

    findById(id:string):Promise<CheckIn | null>
    
    //é usado a versão 'unchecked' do create input pq só podemos criar checkins com userID e gymID preexistentes
    create(data: Prisma.CheckInUncheckedCreateInput):Promise<CheckIn>

    //método pra mostrar histórico de checkins do user, retorna array de checkins
    findManyByUserId(userId:string, page:number):Promise<CheckIn[]>

    //método pra checar se o mesmo usuário fez mais de um checkin na mesma data
    findByUserIdOnDate(userId:string,date:Date):Promise<CheckIn | null>

    countByUserId(userId:string):Promise<number>

    update(checkIn: CheckIn):Promise<CheckIn>
}