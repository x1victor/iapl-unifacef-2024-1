import cryptr from '../lib/cryptr.js'
import prisma from '../database/client.js'

export default function(req, res, next) {

  // As rotas que eventualmente não necessitarem
  // de autenticação devem ser colocadas no
  // objeto abaixo
  const bypassRoutes = [
    { url: '/users/login', method: 'POST' },
    { url: '/users', method: 'POST' }
  ]

  // Verifica se a rota atual está nas exceções
  // de bypassRoutes. Caso esteja, passa para o
  // próximo middleware sem verificar a autenticação
  for(let route of bypassRoutes) {
    if(route.url === req.url && route.method === req.method) {
      console.log(`Rota ${route.url}, método ${route.method} não autenticados por exceção`)
      next()
      return
    }
  }
  
  // Para todas as demais rotas, é necessário que a sessid tenha
  // sido enviada em um cookie ou no cabeçalho Authorization

  let cryptoSessid = null

  // console.log({ COOKIE: req.cookies[process.env.AUTH_COOKIE_NAME] })

  // 1. PROCURA A SESSID EM UM COOKIE
  cryptoSessid = req.cookies[process.env.AUTH_COOKIE_NAME]

  // 2. SE A SESSID NÃO FOI ENCONTRADA NO COOKIE, PROCURA NO HEADER
  // DE AUTORIZAÇÃO
  if(! cryptoSessid) {
    const authHeader = req.headers['authorization']

    // O header não existe, a sessid não foi passada:
    // HTTP 403: Forbidden
    if(! authHeader) {
      console.error('ERRO: não autenticado por falta de cookie ou cabeçalho de autorização')
      return res.status(403).end()
    }
  
    // O header Authorization é enviado como uma string
    // Bearer: XXXX
    // onde XXXX é o token. Portanto, para extrair o token,
    // precisamos recortar a string no ponto onde há um espaço
    // e pegar somente a a segunda parte
    const [ , _token] = authHeader.split(' ')
    
    cryptoSessid = _token
  }

  // VALIDA A SESSSID
  let sessid
  
  // Tenta descriptografar a sessid
  try {
    sessid = cryptr.decrypt(cryptoSessid)
  }
  catch {
    // Caso ocorra algum erro com a decriptografia da sessid,
    // enviamos HTTP 403: Forbidden
    console.error('ERRO: não autenticado por falha na decodificação da sessid')
    return res.status(403).end()
  }

  // Buscamos as informações da sessão no banco de dados
  let session
  try {
    session = prisma.session.findUniqueOrThrow({
      where: { sessid }
    })
  }
  catch {
    // Caso ocorra algum erro com a recuperação das informações da sessão,
    // enviamos HTTP 403: Forbidden
    console.error('ERRO: não autenticado por erro na recuperação das informações da sessão')
    return res.status(403).end()
  }

  // Valida o token
  // jwt.verify(cryptoSessid, process.env.TOKEN_SECRET, (error, user) => {

  //   // Token inválido ou expirado
  //   // HTTP 403: Forbidden
  //   if(error) {
  //     console.error('ERRO: token inválido ou expirado')
  //     return res.status(403).end()
  //   }

  //   /*
  //     Se chegamos até aqui, o token está OK e temos as informações
  //     do usuário logado no parâmetro 'user'. Vamos guardá-lo no 'req'
  //     para futura utilização
  //   */
  //   req.authUser = user
    
  //   // Continua para a rota normal
  //   next()
  // })

}