import ActionAreaCard from './ActionAreaCard'
import Grid from '@mui/material/Grid'
import BasicCard from './BasicCard'
import DropDown from './DropDown'
import Titles from './Titles'
import sumValues from '../utils/sumItems'
import * as React from 'react'
import { Context } from '../contexts/Context'
import { filterByYear, filterByMonth } from '../utils/datesFilter'


export default function Panel() {
  const { despesas, month, year } = React.useContext(Context)
  const filteredY = filterByYear(despesas, year);
  const filteredM = filterByMonth(filteredY, month);

  const sum = sumValues(filteredM)
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
