import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['dev','test','production']).default('dev'),
    JWT_SECRET:z.string(),
    PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)
//validating if the environment variables conform to the schema

if(_env.success === false){
    console.error('💩 Invalid environment variables...', _env.error.format())
    //error.format makes the error formatting a bit more legible

    throw new Error('💩 Invalid environment variables...')
    //this throw stops the application from continuing if the environment variables are invalid
}

export const env = _env.data