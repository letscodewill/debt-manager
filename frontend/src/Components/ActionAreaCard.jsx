import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import DonutChart from './DonutChart';


export default function ActionAreaCard() {
  return (
    <Card >
      <CardActionArea>
        <DonutChart />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            Gastos por categoria
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
