import Cryptr from 'cryptr'

// Cria um novo encriptador que usarará a senha
// contida na variável de ambiente TOKEN_SECRET
const cryptr = new Cryptr(process.env.TOKEN_SECRET)

export default cryptr