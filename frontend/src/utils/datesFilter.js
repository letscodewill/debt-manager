// utils/datesFilter.js

/**
 * Converte qualquer formato de data para objeto Date
 */
function parseDate(dateValue) {
  if (!dateValue) return null;
  
  try {
    // Se já for um objeto Date
    if (dateValue instanceof Date) {
      return dateValue;
    }
    
    // Se for uma string
    if (typeof dateValue === 'string') {
      return new Date(dateValue);
    }
    
    // Se for um timestamp
    if (typeof dateValue === 'number') {
      return new Date(dateValue);
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao parsear data:', dateValue, error);
    return null;
  }
}

// utils/datesFilter.js
export function filterByMonth(despesas, month) {
  if (!despesas || !Array.isArray(despesas)) return []
  
  console.log('filterByMonth - procurando mês:', month, 'tipo:', typeof month)
  
  return despesas.filter(despesa => {
    try {
      if (!despesa.data) return false
      
      const data = despesa.data instanceof Date 
        ? despesa.data 
        : new Date(despesa.data)
      
      if (isNaN(data.getTime())) return false
      
      // Mês no JavaScript é 0-11, então adicionamos 1
      const mesDespesa = data.getMonth() + 1
      
      // Debug
      if (mesDespesa === month) {
        console.log('Encontrou despesa no mês', month, ':', despesa.descricao)
      }
      
      return mesDespesa === month
    } catch (error) {
      console.warn('Erro ao filtrar despesa por mês:', despesa, error)
      return false
    }
  })
}

export function filterByYear(despesas, year) {
  if (!despesas || !Array.isArray(despesas)) return []
  
  console.log('filterByYear - procurando ano:', year, 'tipo:', typeof year)
  
  return despesas.filter(despesa => {
    try {
      if (!despesa.data) return false
      
      const data = despesa.data instanceof Date 
        ? despesa.data 
        : new Date(despesa.data)
      
      if (isNaN(data.getTime())) return false
      
      const anoDespesa = data.getFullYear()
      return anoDespesa === year
    } catch (error) {
      console.warn('Erro ao filtrar despesa por ano:', despesa, error)
      return false
    }
  })
}

// Adicione também esta função para debug
export function getValidDates(despesas) {
  if (!despesas || !Array.isArray(despesas)) return [];
  
  return despesas.map((despesa, index) => {
    const data = parseDate(despesa.data);
    return {
      index,
      descricao: despesa.descricao,
      dataOriginal: despesa.data,
      dataParsed: data,
      isValid: data && !isNaN(data.getTime())
    };
  });
}

export function Sorted(arr) {
  const sorted = arr.sort((a, b) => a.data - b.data)
  return sorted
}

export function byCategory(array) {
  const totalByCategory = array.reduce((acc, item) => {
    if (!acc[item.categoria]) {
      acc[item.categoria] = {
        label: item.categoria,
        value: 0,
        color: item.color,
        data: item.data
      }
    }
    acc[item.categoria].value += item.valor
    return acc
  }, {})
  return totalByCategory
}

export function currentMonths(month){
    let wordMonth = ""
    switch(month){
        case "1":
            wordMonth = "JANEIRO"
            break
        case "2":
            wordMonth = "FEVEREIRO"
            break
        case "3":
            wordMonth = "MARÇO"
            break
        case "4":
            wordMonth = "ABRIL"
            break
        case "5":
            wordMonth = "MAIO"
            break
        case "6":
            wordMonth = "JUNHO"
            break
        case "7":
            wordMonth = "JULHO"
            break
        case "8":
            wordMonth = "AGOSTO"
            break
        case "9":
            wordMonth = "SETEMBRO"
            break
        case "10":
            wordMonth = "OUTUBRO"
            break
        case "11":
            wordMonth = "NOVEMBRO"
            break
        case "12":
            wordMonth = "DEZEMBRO"
            break
    }
    return wordMonth
}