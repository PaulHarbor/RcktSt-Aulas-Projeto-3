import { PrismaClient } from "@prisma/client";
import { env } from "@/env";

export const prisma = new PrismaClient({

    //if the environment is 'dev', generate query logs
    log: env.NODE_ENV === 'dev' ? ['query'] : []
})