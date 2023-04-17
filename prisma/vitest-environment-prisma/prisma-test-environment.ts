import 'dotenv/config'
import { randomUUID } from "crypto";
import { execSync } from 'node:child_process';
import { Environment } from "vitest";
import { PrismaClient } from '@prisma/client';

//instanciando conexão com banco
const prisma = new PrismaClient()

//postgresql://docker:docker@localhost:5432/apisolid?schema=public


function generateDataBaseURL(schema: string){

    if(!process.env.DATABASE_URL){
        throw new Error('🚧DATABASE_URL not found...')
    }

    const url = new URL(process.env.DATABASE_URL)

    //setando a parte que vem depois da '?' na url
    url.searchParams.set('schema',schema)
    //fazemos isso para cada teste ser em uma url diferente
    //isso faz com que não precisemos usar o banco real pra testes

    return url.toString()
}

export default <Environment> {
    name:'prisma',
    async setup() {
        console.log('✔ Setup')
        const schema = randomUUID()
        const databaseURL = generateDataBaseURL(schema)

        process.env.DATABASE_URL = databaseURL

        //executando migrations
        //o 'deploy' não verifica por modificações do banco
        //então não cria novas migrations, só executa o que já tem
        execSync('npx prisma migrate deploy')

        return {
            async teardown() {
                console.log('✔ Teardown')

                //deleta o schema de teste, se existir
                //o 'CASCADE' faz com que qualquer coisa que precise do schema também seja apagada
                await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
                await prisma.$disconnect()
            }
        }
    },
}