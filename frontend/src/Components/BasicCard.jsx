import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';




export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">TOTAL </Typography>
        <Typography gutterBottom variant="h3" component="div">R$ {1999.27} </Typography>
      </CardContent>
    </Card>
  );
}
