import ActionAreaCard from '../Components/ActionAreaCard.jsx'
import Grid from '@mui/material/Grid'
import BasicCard from '../Components/BasicCard'
import DropDown from '../Components/DropDown'
import Titles from '../Components/Titles'
import sumValues from '../utils/sumItems'
import * as React from 'react'
import { Context } from '../contexts/Context'
import { filterByYear, filterByMonth } from '../utils/datesFilter.js'
import { Button, Box } from '@mui/material'
import { AuthContext } from '../contexts/AuthContext.jsx'

export default function Panel() {
  const { despesas, month, year } = React.useContext(Context)
  const filteredY = filterByYear(despesas, year)
  const filteredM = filterByMonth(filteredY, month)
  const sum = sumValues(filteredM)
  const { logout } = React.useContext(AuthContext)
  
  return (
    <div>
      <Box sx={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backgroundColor: 'white',
        py: 1,
        px: 2,
        borderBottom: '1px solid #f0f0f0',
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        <Button 
              variant="outlined" 
              onClick={logout}
              color="error" // Optional: makes it red like an exit button
            >
              Sair
            </Button>
      </Box>
      <Grid container spacing={2}>
        
        {/* Main content */}
        <Grid size={8}>
          <BasicCard total={sum} />
          <DropDown />
        </Grid>
        <Grid size={4}>
          <ActionAreaCard />
        </Grid>
        <Grid size={12}>
          <Titles />
        </Grid>
        
        
      </Grid>
    </div>
  )
}