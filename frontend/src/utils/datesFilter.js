export function filterByMonth(array, month) {
  const monthExpenses = array.filter(item => item.data.getMonth() === month)
  return monthExpenses
}

export function filterByYear(array, year) {
  const yearFiltered = array.filter(item => item.data.getFullYear() === year)
  return yearFiltered
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