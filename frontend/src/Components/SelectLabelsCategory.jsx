import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import { useContext } from 'react'
import { Context } from '../contexts/Context'

// Lista de categorias organizada
const CATEGORIAS = [
  { value: '', label: 'Selecione uma categoria' },
  { value: 'utilidades', label: 'Utilidades' },
  { value: 'mercado', label: 'Mercado' },
  { value: 'saude', label: 'Saúde' },
  { value: 'recorrente', label: 'Recorrente' },
  { value: 'transporte', label: 'Transporte' },
  { value: 'entretenimento', label: 'Entretenimento' },
  { value: 'educacao', label: 'Educação' },
  { value: 'poupanca', label: 'Poupança' },
  { value: 'comer-fora', label: 'Comer fora' },
  { value: 'compras', label: 'Compras' },
  { value: 'assinaturas', label: 'Assinaturas' },
  { value: 'pet', label: 'Pet' },
  { value: 'inesperada', label: 'Inesperada' }
]

export default function SelectLabelsCategory({ 
  value: propValue, 
  onChange: propOnChange,
  label = "",
  required = false,
  fullWidth = true 
}) {
  const context = useContext(Context)
  
  // Usa o valor da prop ou do contexto
  const value = propValue !== undefined ? propValue : (context?.category || '')
  
  // Usa a função onChange da prop ou do contexto
  const handleChange = (event) => {
    const newValue = event.target.value
    
    if (propOnChange) {
      propOnChange(newValue) // Se passou por prop
    } else if (context?.setCategory) {
      context.setCategory(newValue) // Se está usando contexto
    }
  }

  return (
    <FormControl 
      variant="standard" 
      sx={{ 
        minWidth: 120, 
        width: fullWidth ? '100%' : 'auto',
        marginTop: 2.5
      }}
      required={required}
    >
      <InputLabel id="categoria-select-label">
        {label}
      </InputLabel>
      
      <Select
        labelId="categoria-select-label"
        value={value}
        onChange={handleChange}
        label={label}
        displayEmpty={!required}
        fullWidth={fullWidth}
      >
        {CATEGORIAS.map((categoria) => (
          <MenuItem 
            key={categoria.value} 
            value={categoria.value}
            disabled={categoria.value === '' && required}
          >
            {categoria.label}
          </MenuItem>
        ))}
      </Select>
      
      {required && !value && (
        <FormHelperText error>
          Por favor, selecione uma categoria
        </FormHelperText>
      )}
    </FormControl>
  )
}