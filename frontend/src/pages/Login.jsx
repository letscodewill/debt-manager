import { TextField, Button } from '@mui/material'
import { useContext, useState } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router'
import LogoImage from '../Components/LogoImage'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* optional: full screen height */
  text-color: white;
`

export default function Login(params) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    const isLogged = login(email, password)

    if (isLogged) {
      navigate('/dividas')
    } else {
      alert('Login e/ou password incorretos')
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <Container>

        <LogoImage />
        <TextField
          id="standard-basic"
          label="Usuário"
          variant="standard"
          type="email"
          placeholder="Digite o seu email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Senha"
          variant="standard"
          type="password"
          placeholder="Digite a sua senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            marginTop: 3,
          }}
        >
          Entrar
        </Button>
        <Button
          variant="text"
          sx={{
            marginTop: 1,
          }}
        >
          Cadastrar
        </Button>
      </Container>
    </form>
  )
}
