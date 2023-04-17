import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['dev','test','production']).default('dev'),
    JWT_SECRET:z.string(),
    PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)
//validando se as variáveis de environment de process.env estão de acordo com o envSchema

if(_env.success === false){
    console.error('💩 Invalid environment variables...', _env.error.format())
    //error.format faz com que a formatação da mensagem de erro seja um pouco mais legível

    throw new Error('💩 Invalid environment variables...')
    //o throw impede o app de continuar se as variáveis de environment não forem válidas
}

export const env = _env.data