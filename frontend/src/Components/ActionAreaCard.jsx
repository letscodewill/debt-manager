import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import DonutChart from './DonutChart';
import { useState, useEffect } from 'react';


export default function ActionAreaCard() {
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
  }, []); 
  return (
    <Card >
      <CardActionArea>
        <DonutChart />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {
              width > 900 ? "Gastos por categoria" : "Gastos"
            }
            
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
