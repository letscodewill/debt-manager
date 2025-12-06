// Panel.jsx
import ActionAreaCard from '../Components/ActionAreaCard.jsx'
import Grid from '@mui/material/Grid'
import BasicCard from '../Components/BasicCard'
import DropDown from '../Components/DropDown'
import Titles from '../Components/Titles'
import sumValues from '../utils/sumItems'
import * as React from 'react'
import { Context } from '../contexts/Context'
import { filterByYear, filterByMonth } from '../utils/datesFilter.js'
import { Button, Box, CircularProgress, Alert } from '@mui/material'
import { AuthContext } from '../contexts/AuthContext.jsx'

export default function Panel() {
  const { despesas, month, year, loading, error, fetchDespesas } = React.useContext(Context)
  const { token, logout } = React.useContext(AuthContext)
  
  // Busca dados ao carregar o componente
  React.useEffect(() => {
    if (token && fetchDespesas) {
      fetchDespesas(token)
    }
  }, [token, fetchDespesas])

  // Filtra os dados
  const filteredY = filterByYear(despesas, year)
  const filteredM = filterByMonth(filteredY, month)
  const sum = sumValues(filteredM)

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

  return (
    <Box sx={{ p: 2 }}>
      {/* Botão Sair */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        mb: 3
      }}>
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