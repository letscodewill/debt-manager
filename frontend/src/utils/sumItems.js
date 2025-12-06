// utils/sumItems.js
export default function sumValues(despesas) {
  if (!despesas || !Array.isArray(despesas)) return 0;
  
  return despesas.reduce((total, despesa) => {
    // Verifica se a despesa tem valor e se é um número válido
    const valor = parseFloat(despesa.valor);
    if (isNaN(valor)) {
      console.warn('Valor inválido encontrado:', despesa);
      return total;
    }
    
    return total + valor;
  }, 0);
}