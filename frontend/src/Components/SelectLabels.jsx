import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

export default function SelectLabels() {
  const [age, setAge] = React.useState('')

  const handleChange = event => {
    const newValue = event.target.value
    setAge(newValue)
    console.log(newValue) // ✅ correct value
  }

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>NENHUM</em>   
          </MenuItem>
          <MenuItem value={1}>JANEIRO</MenuItem>
          <MenuItem value={2}>FEVEREIRO</MenuItem>
          <MenuItem value={3}>MARÇO</MenuItem>
          <MenuItem value={4}>ABRIL</MenuItem>
          <MenuItem value={5}>MAIO</MenuItem>
          <MenuItem value={6}>JUNHO</MenuItem>
          <MenuItem value={7}>JULHO</MenuItem>
          <MenuItem value={8}>AGOSTO</MenuItem>
          <MenuItem value={9}>SETEMBRO</MenuItem>
          <MenuItem value={10}>OUTUBRO</MenuItem>
          <MenuItem value={11}>NOVEMBRO</MenuItem>
          <MenuItem value={12}>DEZEMBRO</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
