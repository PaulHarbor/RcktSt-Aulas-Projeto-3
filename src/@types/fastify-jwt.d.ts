import '@fastify/jwt'

declare module '@fastify/jwt'
interface FastifyJWT {
  user: {
    sub: string //id do usuário
    role: 'ADMIN' | 'MEMBER'
  }
}