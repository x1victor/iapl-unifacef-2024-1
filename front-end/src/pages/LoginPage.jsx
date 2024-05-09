import React from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import myfetch from '../lib/myfetch'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const navigate = useNavigate()

  async function handleFormSubmit(event) {
    event.preventDefault()    // Evita o recarregamento da página
    
    try {
      // Dispara uma requisição para o back-end
      await myfetch.post('/users/login', { username, password })

      // Se o login tiver sido bem-sucedido, o token estará no result
      // Vamos armazená-lo (POR ENQUANTO) no localStorage (INSEGURO!)
      // window.localStorage.setItem(import.meta.env.VITE_AUTH_TOKEN_NAME, result.token)

      // Vai para a página inicial
      navigate('/')
    }
    catch(error) {
      alert(error.message)
    }
  }

  return (
    <>
      <Typography variant="h2" gutterBottom>
        Autentique-se
      </Typography>
      <form onSubmit={handleFormSubmit}>
        
        <TextField 
          label="Usuário" 
          variant="filled" 
          value={username}
          fullWidth
          sx={{ mb: 2 }}
          onChange={event => setUsername(event.target.value)}
        />

        <TextField 
          label="Senha" 
          variant="filled"
          type="password" 
          value={password}
          fullWidth
          sx={{ mb: 2 }}
          onChange={event => setPassword(event.target.value)}
        />

        <Button 
          variant="contained"
          type="submit"
          fullWidth
        >
          Enviar
        </Button>

      </form>
    </>
  )
}