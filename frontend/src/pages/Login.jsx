import { TextField, Button, CircularProgress } from '@mui/material'
import { useContext, useState } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router'
import LogoImage from '../Components/LogoImage'
import CriarUsuarioModal from '../Components/CriarUsuarioModal'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-color: white;
`

const ErrorMessage = styled.div`
  color: #f44336;
  margin-top: 10px;
  font-size: 14px;
`

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // login agora retorna um objeto { success, user } ou { success, error }
      const result = await login(email, password)
      
      if (result.success) {
        navigate('/dividas')
      } else {
        setError(result.error || 'Usuário ou senha inválidos')
      }
    } catch (err) {
      setError('Erro de conexão com o servidor')
    } finally {
      setLoading(false)
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
          type="text"
          placeholder="Digite o seu usuário"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loading}
          fullWidth
          sx={{ mb: 2, width: '300px' }}
        /> 
        <TextField
          id="standard-basic"
          label="Senha"
          variant="standard"
          type="password"
          placeholder="Digite a sua senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
          fullWidth
          sx={{ mb: 3, width: '300px' }}
        />
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            marginTop: 3,
            width: '300px'
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
        </Button>
        
        <CriarUsuarioModal />
      </Container>
    </form>
  )
}