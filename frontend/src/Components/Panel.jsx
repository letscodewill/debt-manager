import ActionAreaCard from './ActionAreaCard'
import Grid from '@mui/material/Grid'
import BasicCard from './BasicCard'
import DropDown from './DropDown'
import Titles from './Titles'
import sumValues from '../utils/sumItems'
import * as React from 'react'
import { Context } from '../contexts/Context'

export default function Panel() {
  const { despesas } = React.useContext(Context)
  const sum = sumValues(despesas)
  return (
    <div>
      <Grid container spacing={2}>
        <Grid size={8}>
          <BasicCard total={sum} />
          <DropDown />
        </Grid>
        <Grid size={4}>
          <ActionAreaCard />
        </Grid>
        <Grid size={12}>
          <Titles />
        </Grid>
      </Grid>
    </div>
  )
}
