import jwt from 'jsonwebtoken'

export default function(req, res, next) {

  // As rotas que eventualmente não necessitarem
  // de autenticação devem ser colocadas no
  // objeto abaixo
  const bypassRoutes = [
    { url: '/users/login', method: 'POST' }
  ]

  // Verifica se a rota atual está nas exceções
  // de bypassRoutes. Caso esteja, passa para o
  // próximo middleware sem verificar a autenticação
  for(let route of bypassRoutes) {
    if(route.url === req.url && route.method === req.method) {
      next()
      return
    }
  }

}