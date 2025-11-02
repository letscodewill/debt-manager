import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SelectLabel from './SelectLabels';
import styled from 'styled-components'
import SelectLabelsYear from './SelectLabelsYear';


const DivCardContent = styled(CardContent)`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`
const DivCardConteiner = styled(Card)`
    margin-top: 20px;
`

export default function DropDown() {
  return (
    <DivCardConteiner sx={{ minWidth: 275 }}>
      <DivCardContent>
        <Typography gutterBottom variant="h5" component="div">Selecione o mês desejado </Typography>
        <SelectLabel />
        <SelectLabelsYear />
        
      </DivCardContent>
    </DivCardConteiner>
  );
}
