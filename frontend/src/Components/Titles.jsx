import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import styled from 'styled-components'
import Grid from '@mui/material/Grid'
import Checkboxes from './Checkbox'
import DespesaGrid from './DespesaGrid'
import * as React from 'react'
import { useContext } from 'react'
import { Context } from '../contexts/Context'

const CardStyled = styled(CardContent)`
  display: flex;
  justify-content: space-between;
`

const TextStyled = styled(Typography)`
  text-align: center;
  justify-content: center;
`

export default function Titles(params) {

  const { despesas } = useContext(Context)

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardStyled>
        <TextStyled gutterBottom variant="h5" component="div">
          DESPESAS
        </TextStyled>
        <Button variant="outlined">
          <span>+</span>Adicionar dívida
        </Button>
      </CardStyled>

      <Grid container spacing={5}>
        <Grid size={1}>
          <TextStyled gutterBottom variant="h5" component="div">
            <Checkboxes />
          </TextStyled>
        </Grid>
        <Grid size={4}>
          <TextStyled gutterBottom variant="h5" component="div">
            Descrição
          </TextStyled>
        </Grid>
        <Grid size={3}>
          <TextStyled gutterBottom variant="h5" component="div">
            Categoria
          </TextStyled>
        </Grid>
        <Grid size={2}>
          <TextStyled gutterBottom variant="h5" component="div">
            Valor
          </TextStyled>
        </Grid>
        <Grid size={2}>
          <TextStyled gutterBottom variant="h5" component="div">
            Ações
          </TextStyled>
        </Grid>
      </Grid>
      {despesas.map((item, index) => (
        <DespesaGrid
          key={index}
          descricao={item.descricao}
          categoria={item.categoria}
          valor={item.valor}
        />
      ))}
    </Card>
  )
}
