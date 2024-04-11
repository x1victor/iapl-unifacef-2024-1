import React from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default function LoginPage() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  return (
    <>
      <Typography variant="h2" gutterBottom>
        Autentique-se
      </Typography>
      <form>
        
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