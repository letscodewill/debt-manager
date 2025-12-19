import {
  TextField,
  Button,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material'
import { useContext, useState } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router'
import LogoImage from '../Components/LogoImage'
import CriarUsuarioModal from '../Components/CriarUsuarioModal'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

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
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
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
          type={showPassword ? 'text' : 'password'}
          placeholder="Digite a sua senha"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
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
