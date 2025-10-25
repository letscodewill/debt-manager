import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  { label: 'Group A', value: 400, color: '#0088FE' },
  { label: 'Group B', value: 300, color: '#00C49F' },
  { label: 'Group C', value: 300, color: '#FFBB28' },
  { label: 'Group D', value: 200, color: '#FF8042' },
  { label: 'Group E', value: 180, color: '#A28BFE' },
  { label: 'Group F', value: 260, color: '#FF6FD8' },
  { label: 'Group G', value: 350, color: '#7FDB00' },
  { label: 'Group H', value: 120, color: '#AF19FF' },
  { label: 'Group I', value: 90,  color: '#004D40' },
  { label: 'Group J', value: 240, color: '#9E9D24' }
];

const settings = {
  margin: { right: 0 },
  width: 200,
  height: 200,
  hideLegend: false,
};

export default function DonutChart() {
  return (
    <PieChart
      series={[{ innerRadius: 0, outerRadius: 100, data, arcLabel: 'value' }]}
      {...settings}
    />
  );
}
