import { PrismaClient } from "@prisma/client";
import { env } from "@/env";

export const prisma = new PrismaClient({

    //se o ambiente for de desenvolvimento, gerar logs das queries
    log: env.NODE_ENV === 'dev' ? ['query'] : []
})