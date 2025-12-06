// Components/ResetMonthButton.jsx
import * as React from 'react'
import Button from '@mui/material/Button'
import RestoreIcon from '@mui/icons-material/Restore'
import { useContext } from 'react'
import { Context } from '../contexts/Context'

export default function ResetMonthButton() {
  const { setMonth, setYear } = useContext(Context)

  const handleReset = () => {
    const mesAtual = new Date().getMonth() + 1
    const anoAtual = new Date().getFullYear()
    
    setMonth(mesAtual)
    setYear(anoAtual)
    
    console.log('Resetado para:', mesAtual, '/', anoAtual)
  }

  return (
    <Button
      variant="outlined"
      startIcon={<RestoreIcon />}
      onClick={handleReset}
      size="small"
      sx={{ ml: 1 }}
    >
      Mês Atual
    </Button>
  )
}