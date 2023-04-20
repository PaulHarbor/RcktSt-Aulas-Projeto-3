import 'dotenv/config'
import { randomUUID } from "crypto";
import { execSync } from 'node:child_process';
import { Environment } from "vitest";
import { PrismaClient } from '@prisma/client';

//instantiating database conection
const prisma = new PrismaClient()

//postgresql://docker:docker@localhost:5432/apisolid?schema=public


function generateDataBaseURL(schema: string){

    if(!process.env.DATABASE_URL){
        throw new Error('🚧 DATABASE_URL not found...')
    }

    const url = new URL(process.env.DATABASE_URL)

    //setting the URL part that comes after the '?'
    url.searchParams.set('schema',schema)
    //we do this in order for each test to be in a different URL
    //this relieves us of using the real database for the tests
    return url.toString()
}

export default <Environment> {
    name:'prisma',
    async setup() { //this sets up the prisma test environment
        console.log('✔ Setup')
        const schema = randomUUID() //schema will be a random UUID
        const databaseURL = generateDataBaseURL(schema) //it will be part of the URL to differentiate it

        process.env.DATABASE_URL = databaseURL //updating the .env file's URL

        //executing migrations
        //'deploy' doesn't check for modifications in the database
        //so it doesn't create new migrations, only runs what's already there
        execSync('npx prisma migrate deploy')

        return {
            async teardown() { //this tears down the prisma test environment
                console.log('✔ Teardown')

                //deletes the test scheme, if any
                //'CASCADE' makes everything that also needs the schema to also get deleted
                await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
                await prisma.$disconnect()
            }
        }
    },
}