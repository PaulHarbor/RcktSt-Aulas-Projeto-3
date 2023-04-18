import { FastifyRequest, FastifyReply } from "fastify"

//função genérica de autenticação
export async function refresh(req: FastifyRequest, rep: FastifyReply) {

  //função que procura o refreshtoken e verifica se é válido e não expirou
  await req.jwtVerify({ onlyCookie: true })

  const { role } = req.user

  const token = await rep.jwtSign(
    { role },
    {
      sign: {
        sub: req.user.sub
      }
    })
  //criando refresh token
  const refreshToken = await rep.jwtSign(
    { role },
    {
      sign: {
        sub: req.user.sub,
        expiresIn: '7d'
        //o usuário só perde o login se ficar 7 dias sem entrar na aplicação
      }
    })

  return rep
    .setCookie('refreshToken', refreshToken, {
      path: '/', //esse path permite q o cookie seja lido por qualquer rota
      secure: true, //usar encriptação https
      sameSite: true, //cookie só acessível no mesmo domain
      httpOnly: true //cookie só acessível pelo back-end via http
    })
    .status(200)
    .send({ token })

} 
