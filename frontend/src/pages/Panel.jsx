// Panel.jsx
import { useState, useEffect, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import { Button, Box, CircularProgress, Alert } from '@mui/material'
import ActionAreaCard from '../Components/ActionAreaCard.jsx'
import BasicCard from '../Components/BasicCard'
import DropDown from '../Components/DropDown'
import Titles from '../Components/Titles'
import sumValues from '../utils/sumItems'
import { Context } from '../contexts/Context'
import { AuthContext } from '../contexts/AuthContext.jsx'
import { filterByYear, filterByMonth } from '../utils/datesFilter.js'

export default function Panel() {
  // 1. TODOS OS HOOKS PRIMEIRO (incluindo useState)
  const [redirect, setRedirect] = useState(false)
  
  const {  despesas, month, year, loading, error, fetchDespesas } = useContext(Context)
  const { user,token, logout } = useContext(AuthContext)

  // console.log('Usuário atual:', user); // Verifique aqui
  
  // 2. DEPOIS os efeitos
  useEffect(() => {
    if (token && fetchDespesas) {
      fetchDespesas(token)
    }
  }, [token, fetchDespesas])

  // 3. Agora sim, condicionais de return
  if (redirect) {
    return <Navigate to="/padmin" />
  }

  if (user.activated != true){
    return (
      <Box p={3}>
        <Alert severity="error">
          Usuário inativo, contato o administrador {error}
        </Alert>
        <Button 
          variant="outlined" 
          onClick={() => <Navigate to="/login" />}
          sx={{ mt: 2 }}
        >
          Logar
        </Button>
      </Box>
    )
  }

  // 4. Outras condicionais
  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">
          Erro ao carregar despesas: {error}
        </Alert>
        <Button 
          variant="outlined" 
          onClick={() => fetchDespesas(token)}
          sx={{ mt: 2 }}
        >
          Tentar novamente
        </Button>
      </Box>
    )
  }

  // 5. Lógica de negócio
  const filteredY = filterByYear(despesas, year)
  const filteredM = filterByMonth(filteredY, month)
  const sum = sumValues(filteredM)

  // 6. Função handler
  const handleClick = () => {
    setRedirect(true)
  }

  // 7. Retorno JSX
  return (
    <Box sx={{ p: 2 }}>
      {/* Botão Sair */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        mb: 3,
        mt: -5
      }}>
        {
          user.username != "adm" ? '' :<Button
          type="button"
          variant="text"
          onClick={handleClick}
          sx={{
            marginRight: 1,
            width: '130px'
          }}
        >
          Painel admin
        </Button>
        }
        
        <Button 
          variant="outlined" 
          onClick={logout}
          color="error"
          size="small"
        >
          Sair
        </Button>
      </Box>

      {/* Conteúdo principal */}
      <Grid container spacing={2}>
        <Grid size={12} >
          <BasicCard />
          <DropDown />
        </Grid>
        <Grid size={12} md={4}>
          <ActionAreaCard />
        </Grid>
        <Grid size={12}>
          <Titles />
        </Grid>
      </Grid>
    </Box>
  )
}