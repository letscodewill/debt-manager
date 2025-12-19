import * as React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import UsersList from '../Components/Users'
import { Box, CircularProgress, Alert, Button } from '@mui/material'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import RefreshIcon from '@material-ui/icons/Refresh';

export default function Adm() {
  const [users, setUsers] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  
  const { token, logout } = useContext(AuthContext)

  // Função para buscar usuários
  const fetchUsers = async () => {
    if (!token) {
      setError('Você precisa estar logado!')
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('http://localhost:3000/usuarios', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.status === 401) {
        logout()
        setError('Sessão expirada. Faça login novamente.')
        return
      }

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Busca usuários ao carregar o componente
  React.useEffect(() => {
    fetchUsers()
  }, [token])

  // Se estiver carregando
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    )
  }

  // Se houver erro
  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Erro ao carregar usuários: {error}
        </Alert>
        <Button variant="contained" onClick={fetchUsers}>
          Tentar novamente
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Cabeçalho */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <Typography variant="h4" component="h1" fontWeight="bold">
              Lista de Usuários
            </Typography>
            <Button 
              variant="outlined" 
              onClick={logout}
              color="error"
            >
              Sair
            </Button>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Total de usuários: {users.length}
          </Typography>
        </Grid>
      </Grid>

      {/* Lista de usuários */}
      <Grid container spacing={2}>
        {users.length > 0 ? (
          users.map((user, index) => (
            <Grid item xs={12} key={user.id || user._id || index}>
              <UsersList 
                usuario={user}
                onUserUpdated={fetchUsers} // Para atualizar após ações
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Alert severity="info">
              Nenhum usuário encontrado.
            </Alert>
          </Grid>
        )}
      </Grid>

      {/* Botão para recarregar */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button 
          variant="outlined" 
          onClick={fetchUsers}
          startIcon={<RefreshIcon />}
        >
          Atualizar lista
        </Button>
      </Box>
    </Box>
  )
}