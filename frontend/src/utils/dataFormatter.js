// utils/dataFormatter.js
export function formatDespesaFromAPI(despesa) {
  if (!despesa) return null;
  
  return {
    ...despesa,
    // Garante que a data seja um objeto Date válido
    data: despesa.data ? new Date(despesa.data) : new Date(),
    // Garante que o valor seja um número
    valor: typeof despesa.valor === 'string' ? parseFloat(despesa.valor) : despesa.valor,
    // Garante que tenha uma cor padrão
    color: despesa.color || getDefaultColor(despesa.categoria)
  };
}

function getDefaultColor(categoria) {
  const colorMap = {
    'Utilities': '#4A90E2',
    'Groceries': '#7ED321',
    'Transport': '#F5A623',
    'Health': '#D0021B',
    'Entertainment': '#9013FE',
    'Housing': '#50E3C2',
    'Education': '#B8E986',
    'Insurance': '#F8E71C',
    'Savings': '#417505',
    'Dining Out': '#BD10E0',
    'Clothing': '#FF7F50',
    'Pets': '#8B572A',
    'Donations': '#F5625D',
    'Personal Care': '#50E3C2',
    'Taxes': '#9B9B9B',
    'utilidades': '#4A90E2',
    'mercado': '#7ED321',
    'transporte': '#F5A623',
    'saude': '#D0021B',
    'entretenimento': '#9013FE',
    'educacao': '#B8E986',
    'poupanca': '#417505',
    'comer-fora': '#BD10E0',
    'compras': '#FF7F50',
    'pet': '#8B572A',
    'inesperada': '#F5625D',
    'recorrente': '#9B9B9B',
    'assinaturas': '#9013FE'
  };
  
  return colorMap[categoria] || '#4A90E2'; // Cor padrão
}