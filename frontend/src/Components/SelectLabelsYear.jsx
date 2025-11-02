import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useContext } from 'react'
import { Context } from '../contexts/Context'
import { currentMonths } from '../utils/datesFilter.js'

export default function SelectLabelsYear() {
  const { year, setYear } = useContext(Context)

  const handleChange = event => {
    const newValue = event.target.value
    setYear(newValue)
    console.log(newValue)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <Select
        value={year}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value={currentMonths(new Date().getFullYear())}>
          <em>NENHUM</em>
        </MenuItem>
        <MenuItem value={2023}>2023</MenuItem>
        <MenuItem value={2024}>2024</MenuItem>
        <MenuItem value={2025}>2025</MenuItem>
        <MenuItem value={2026}>2026</MenuItem>
        <MenuItem value={2027}>2027</MenuItem>
        <MenuItem value={2028}>2028</MenuItem>
      </Select>
    </FormControl>
  )
}
