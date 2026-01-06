import * as React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import styled from 'styled-components'
import ControlledCheckbox from './Checkbox'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import TransitionsModalEdit from './TransitionsModalEdit'
import TransitionsModalDelete from './TransitionsModalDelete'
import { useState, useEffect } from 'react'

const TextStyled = styled(Typography)`
  text-align: center;
  justify-content: center;
`

export default function DespesaGrid({ id, descricao, categoria, valor }) {
  const [checked, setChecked] = React.useState(false)

  const handleChange = event => {
    setChecked(event.target.checked)
    console.log(event.target.checked, id)
  }

  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
  
    // 1. Setup: Add the listener when component mounts
    window.addEventListener('resize', handleResize);
  
    // 2. Cleanup: Remove the listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

  return (
    <Grid container spacing={5}>
      <Grid size={1}>
        <TextStyled gutterBottom variant="h5" component="div">
          <ControlledCheckbox checked={checked} onChange={handleChange} />
        </TextStyled>
      </Grid>
      <Grid size={4}>
        <TextStyled gutterBottom variant="p" component="div">
          {descricao}
        </TextStyled>
      </Grid>
      <Grid size={3}>
        <TextStyled gutterBottom variant="p" component="div">
          {categoria.replace('-', ' ')}
        </TextStyled>
      </Grid>
      <Grid size={2}>
        <TextStyled gutterBottom variant="p" component="div">
          R${valor}
        </TextStyled>
      </Grid>
      <Grid size={2}>
        <TextStyled gutterBottom variant="p" component="div">
          {checked ? (
            <ButtonGroup
              sx={{ marginTop: -2, marginLeft: -7, height: 30 }}
              variant="outlined"
              aria-label="Basic button group"
            >
              <TransitionsModalEdit
                icon={<EditIcon fontSize="small" />}
                divida={{ id, descricao, valor, categoria }}
              />

              <TransitionsModalDelete
                icon={<DeleteForeverIcon fontSize="small" />}
                divida={{ id, descricao, valor, categoria }}
              />
            </ButtonGroup>
          ) : (
            ''
          )}
        </TextStyled>
      </Grid>
    </Grid>
  )
}
