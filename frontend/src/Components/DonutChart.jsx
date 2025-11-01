import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Context } from '../contexts/Context';
import { useContext } from 'react';

const settings = {
  margin: { right: 10 },
  width: 200,
  height: 200,
  hideLegend: true,
};

export default function DonutChart() {
  const { totalArray } = useContext(Context);

  return (
< PieChart
  series={[
    {
      innerRadius: 0,
      outerRadius: 100,
      data: totalArray,
      arcLabel: (item) => `${item.label}`,
    },
  ]}
  slotProps={{
    legend: { hidden: true },
  }}
  {...settings}
/>
  );
}
