import * as React from 'react'
import { PieChart } from '@mui/x-charts/PieChart'
import { Context } from '../contexts/Context'
import { useContext, useMemo } from 'react'
import { filterByMonth, filterByYear } from '../utils/datesFilter.js'

const settings = {
  margin: { right: 20 },
  width: 200,
  height: 200,
  hideLegend: false
}

export default function DonutChart() {
  const { totalArray, month, year } = useContext(Context)

  // Memoize filters to avoid recalculating unnecessarily
  const filteredData = useMemo(() => {
    const filteredY = filterByYear(totalArray, year)
    const filteredM = filterByMonth(filteredY, month)
    return filteredM
  }, [totalArray, month, year])

  return (
    <PieChart
      series={[
        {
          innerRadius: 50,
          outerRadius: 85,
          data: filteredData, // 👈 use filtered data here
          arcLabel: item => `${item.value}`
        }
      ]}
      slotProps={{
        legend: { hidden: true }
      }}
      {...settings}
    />
  )
}
