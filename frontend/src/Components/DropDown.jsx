import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import SelectLabel from './SelectLabels'
import styled from 'styled-components'
import SelectLabelsYear from './SelectLabelsYear'
import ResetMonthButton from './ResetMonthButton'
import { useState, useEffect } from 'react'

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
}, []); // <--- Empty array means "Run this only once"
  return (
    <DivCardConteiner
      sx={{
        minWidth: 275,
        height: 156,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
      }}
    >
      <DivCardContent>
        <Typography gutterBottom variant="h5" component="div">
          Selecione o mês desejado{' '}
        </Typography>
        <SelectLabel />
        <SelectLabelsYear />

        {width > 900 ? <ResetMonthButton /> : ''}
      </DivCardContent>
    </DivCardConteiner>
  )
}
