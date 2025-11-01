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
import { filterByYear, filterByMonth } from '../utils/datesFilter'



const CardStyled = styled(CardContent)`
  display: flex;
  justify-content: space-between;
`

const TextStyled = styled(Typography)`
  text-align: center;
  justify-content: center;
`

export default function Titles() {
  const { despesas, month, year } = useContext(Context);

  let despesasDoAno = filterByYear(despesas, year);
  let despesasDoMes = filterByMonth(despesasDoAno, month);

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

      {/* ✅ If year doesn't match any data */}
      {despesasDoAno.length === 0 && (
        <TextStyled variant="body1" sx={{ color: 'gray' }}>
          Nenhuma despesa encontrada para este ano.
        </TextStyled>
      )}

      {/* ✅ If month has no data inside this year */}
      {despesasDoAno.length > 0 && despesasDoMes.length === 0 && (
        <TextStyled variant="body1" sx={{ color: 'gray' }}>
          Nenhuma despesa neste mês para {year}.
        </TextStyled>
      )}

      {/* ✅ Show data if exists */}
      {despesasDoMes.map((item, index) => (
        <DespesaGrid
          key={index}
          descricao={item.descricao}
          categoria={item.categoria}
          valor={item.valor}
        />
      ))}
    </Card>
  );
}

