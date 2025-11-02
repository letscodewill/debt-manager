import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useContext } from 'react'
import { Context } from '../contexts/Context'
import { currentMonths } from '../utils/datesFilter.js'

export default function SelectLabels() {
  const { month, setMonth } = useContext(Context)

  const handleChange = event => {
    const newValue = event.target.value
    setMonth(newValue)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <Select
        value={month}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value={currentMonths(new Date().getMonth())}>
          <em>NENHUM</em>
        </MenuItem>
        <MenuItem value={0}>JANEIRO</MenuItem>
        <MenuItem value={1}>FEVEREIRO</MenuItem>
        <MenuItem value={2}>MARÇO</MenuItem>
        <MenuItem value={3}>ABRIL</MenuItem>
        <MenuItem value={4}>MAIO</MenuItem>
        <MenuItem value={5}>JUNHO</MenuItem>
        <MenuItem value={6}>JULHO</MenuItem>
        <MenuItem value={7}>AGOSTO</MenuItem>
        <MenuItem value={8}>SETEMBRO</MenuItem>
        <MenuItem value={9}>OUTUBRO</MenuItem>
        <MenuItem value={10}>NOVEMBRO</MenuItem>
        <MenuItem value={11}>DEZEMBRO</MenuItem>
      </Select>
    </FormControl>
  )
}
