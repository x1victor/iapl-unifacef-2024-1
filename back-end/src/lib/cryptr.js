import Cryptr from 'cryptr'

// Cria um novo encriptador que usarará a senha
// contida na variável de ambiente TOKEN_SECRET
const secretKey = process.env.TOKEN_SECRET
const cryptr = new Cryptr(secretKey)

export default cryptr