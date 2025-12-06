import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import { useContext, useState, useEffect } from 'react'
import { Context } from '../contexts/Context'

const MESES = [
  { valor: 1, label: 'JANEIRO' },
  { valor: 2, label: 'FEVEREIRO' },
  { valor: 3, label: 'MARÇO' },
  { valor: 4, label: 'ABRIL' },
  { valor: 5, label: 'MAIO' },
  { valor: 6, label: 'JUNHO' },
  { valor: 7, label: 'JULHO' },
  { valor: 8, label: 'AGOSTO' },
  { valor: 9, label: 'SETEMBRO' },
  { valor: 10, label: 'OUTUBRO' },
  { valor: 11, label: 'NOVEMBRO' },
  { valor: 12, label: 'DEZEMBRO' }
]

export default function SelectLabels() {
  const { month, setMonth } = useContext(Context)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)

  // Sincroniza com o contexto
  useEffect(() => {
    if (month && month >= 1 && month <= 12) {
      setSelectedMonth(month)
    }
  }, [month])

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value, 10)
    setSelectedMonth(newValue)
    setMonth(newValue)
    console.log('Mês selecionado:', newValue)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 140 }}>
      <InputLabel id="month-select-label">Selecione o Mês</InputLabel>
      <Select
        labelId="month-select-label"
        value={selectedMonth}
        onChange={handleChange}
        label="Selecione o Mês"
        sx={{ minHeight: '40px' }}
      >
        {MESES.map((mes) => (
          <MenuItem 
            key={mes.valor} 
            value={mes.valor}
            selected={mes.valor === (new Date().getMonth() + 1)}
          >
            {mes.label} {mes.valor === (new Date().getMonth() + 1) ? '(Atual)' : ''}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}