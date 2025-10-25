import * as React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import styled from 'styled-components'
import ControlledCheckbox from './Checkbox'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

const TextStyled = styled(Typography)`
  text-align: center;
  justify-content: center;
`

export default function DespesaGrid({ descricao, categoria, valor }) {
  const [checked, setChecked] = React.useState(false)

  const handleChange = (event) => {
      setChecked(event.target.checked)
      console.log(event.target.checked)
  }

  return (
    <Grid container spacing={5}>
      <Grid size={1}>
        <TextStyled gutterBottom variant="h5" component="div">
          <ControlledCheckbox checked={checked} onChange={handleChange} />
        </TextStyled>
      </Grid>
      <Grid size={4}>
        <TextStyled gutterBottom variant="h5" component="div">
          {descricao}
        </TextStyled>
      </Grid>
      <Grid size={3}>
        <TextStyled gutterBottom variant="h5" component="div">
          {categoria}
        </TextStyled>
      </Grid>
      <Grid size={2}>
        <TextStyled gutterBottom variant="h5" component="div">
          R${valor}
        </TextStyled>
      </Grid>
      <Grid size={2}>
        <TextStyled gutterBottom variant="h5" component="div">
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button>
              <EditIcon fontSize="small" />
            </Button>
            <Button>
              <DeleteForeverIcon fontSize="small" />
            </Button>
          </ButtonGroup>
        </TextStyled>
      </Grid>
    </Grid>
  )
}
