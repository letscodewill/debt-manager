// Components/BasicCard.jsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useDespesas } from '../hooks/useDespesas'; // Opcional: se você criou o hook
import { Context } from '../contexts/Context';
import { filterByMonth, filterByYear } from '../utils/datesFilter';
import sumValues from '../utils/sumItems';


export default function BasicCard() {
  // Se preferir usar o contexto diretamente, descomente:
  const { despesas, month, year } = React.useContext(Context);
  const filteredY = filterByYear(despesas, year);
  const filteredM = filterByMonth(filteredY, month);
  const total = sumValues(filteredM);
  
  console.log('BasicCard - total recebido:', total); // Debug

  // Formata o valor como moeda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value || 0);
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Total de Despesas
        </Typography>
        <Typography variant="h5" component="div">
          {formatCurrency(total)}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        </Typography>
        <Typography variant="body2">
          {/* Informações adicionais se necessário */}
          {total === 0 ? 'Nenhuma despesa encontrada' : `${total > 0 ? '' : 'Sem dados'}`}
        </Typography>
      </CardContent>
    </Card>
  );
}