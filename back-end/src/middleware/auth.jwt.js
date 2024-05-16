import jwt from 'jsonwebtoken'

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
  
  // Para todas as demais rotas, é necessário que o token tenha
  // sido enviado em um cookie ou no cabeçalho Authorization

  let token = null

  console.log({ COOKIE: req.cookies[process.env.AUTH_COOKIE_NAME] })

  // 1. PROCURA O TOKEN EM UM COOKIE
  token = req.cookies[process.env.AUTH_COOKIE_NAME]

  // 2. SE O TOKEN NÃO FOI ENCONTRADO NO COOKIE, PROCURA NO HEADER
  // DE AUTORIZAÇÃO
  if(! token) {
    const authHeader = req.headers['authorization']

    // O header não existe, o token não foi passado:
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
    
    token = _token
  }

  // Valida o token
  jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {

    // Token inválido ou expirado
    // HTTP 403: Forbidden
    if(error) {
      console.error('ERRO: token inválido ou expirado')
      return res.status(403).end()
    }

    /*
      Se chegamos até aqui, o token está OK e temos as informações
      do usuário logado no parâmetro 'user'. Vamos guardá-lo no 'req'
      para futura utilização
    */
    req.authUser = user
    
    // Continua para a rota normal
    next()
  })

}