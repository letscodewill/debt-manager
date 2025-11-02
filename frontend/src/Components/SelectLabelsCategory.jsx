import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useContext } from 'react'
import { Context } from '../contexts/Context'
import { currentMonths } from '../utils/datesFilter.js'

export default function SelectLabelsCategory() {
  const { category, setCategory } = useContext(Context)

  const handleChange = event => {
    const newValue = event.target.value
    setCategory(newValue)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120, width: '80%', marginTop: 2.5 }}>
      <Select
        value={category}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value={currentMonths(new Date().getMonth())}>
          <em>NENHUM</em>
        </MenuItem>
        <MenuItem value={'utilidades'}>Utilidades</MenuItem>
        <MenuItem value={'mercado'}>Mercado</MenuItem>
        <MenuItem value={'saude'}>Saúde</MenuItem>
        <MenuItem value={'recorrente'}>Recorrente</MenuItem>
        <MenuItem value={'transporte'}>Transporte</MenuItem>
        <MenuItem value={'entretenimento'}>Entretenimento</MenuItem>
        <MenuItem value={'educacao'}>Educação</MenuItem>
        <MenuItem value={'poupanca'}>Poupança</MenuItem>
        <MenuItem value={'comer-fora'}>Comer fora</MenuItem>
        <MenuItem value={'compras'}>Compras</MenuItem>
        <MenuItem value={'assinaturas'}>Assinaturas</MenuItem>
        <MenuItem value={'pet'}>Pet</MenuItem>
        <MenuItem value={'inesperada'}>Inesperada</MenuItem>
      </Select>
    </FormControl>
  )
}
