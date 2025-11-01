import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Context } from '../contexts/Context';
import { useContext } from 'react';
import { filterByMonth, filterByYear } from '../utils/datesFilter';

const settings = {
  margin: { right: 10 },
  width: 200,
  height: 200,
  hideLegend: false,
};

export default function DonutChart() {
  const { totalArray } = useContext(Context);
  const { year, month } = useContext(Context);

  const filteredY = filterByYear(totalArray, year)
  const filteredM = filterByMonth(filteredY, month)

  return (
< PieChart
  series={[
    {
      innerRadius: 0,
      outerRadius: 100,
      data: totalArray,
      arcLabel: (item) => `${item.value}`,
    },
  ]}
  slotProps={{
    legend: { hidden: true },
  }}
  {...settings}
/>
  );
}
