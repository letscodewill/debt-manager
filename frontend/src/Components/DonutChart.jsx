import * as React from 'react'
import { PieChart } from '@mui/x-charts/PieChart'
import { Context } from '../contexts/Context'
import { useContext, useMemo } from 'react'
import { filterByMonth, filterByYear } from '../utils/datesFilter.js'
import sumValues from '../utils/sumItems'

const settings = {
  margin: { top: 30 },
  width: 175,
  height: 214,
  hideLegend: true
}

// Cores para as categorias
const CATEGORY_COLORS = {
  'utilidades': '#4A90E2',
  'mercado': '#7ED321',
  'saude': '#D0021B',
  'recorrente': '#9B9B9B',
  'transporte': '#F5A623',
  'entretenimento': '#9013FE',
  'educacao': '#B8E986',
  'poupanca': '#417505',
  'comer-fora': '#BD10E0',
  'compras': '#FF7F50',
  'assinaturas': '#9013FE',
  'pet': '#8B572A',
  'inesperada': '#F5625D'
}

export default function DonutChart() {
  const { despesas, month, year } = useContext(Context)

  // Calcula os dados para o gráfico
  const chartData = useMemo(() => {
    if (!despesas || !Array.isArray(despesas) || despesas.length === 0) {
      return []
    }

    // 1. Filtra por ano e mês
    const filteredY = filterByYear(despesas, year)
    const filteredM = filterByMonth(filteredY, month)
    
    console.log('DonutChart - Dados filtrados:', {
      totalDespesas: despesas.length,
      filtradasPorAno: filteredY.length,
      filtradasPorMes: filteredM.length
    })

    if (filteredM.length === 0) {
      return []
    }

    // 2. Agrupa por categoria e soma os valores
    const categoriasMap = filteredM.reduce((acc, despesa) => {
      if (!despesa.categoria) return acc
      
      const categoria = despesa.categoria
      if (!acc[categoria]) {
        acc[categoria] = {
          categoria,
          total: 0,
          count: 0
        }
      }
      
      acc[categoria].total += Number(despesa.valor) || 0
      acc[categoria].count += 1
      
      return acc
    }, {})

    // 3. Converte para o formato que o PieChart precisa
    const pieData = Object.values(categoriasMap).map(item => ({
      id: item.categoria,
      value: Number(item.total.toFixed(2)),
      label: `${item.categoria} (${item.count})`,
      color: CATEGORY_COLORS[item.categoria] || '#4A90E2'
    }))

    // console.log('DonutChart - Dados do gráfico:', pieData)
    
    return pieData
  }, [despesas, month, year])

  // Se não houver dados, mostra uma mensagem
  if (chartData.length === 0) {
    return (
      <div style={{
        width: 175,
        height: 214,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px dashed #ccc',
        borderRadius: '4px'
      }}>
        <p style={{ color: '#666', fontSize: '14px', textAlign: 'center' }}>
          Sem dados<br />para {month}/{year}
        </p>
      </div>
    )
  }

  return (
    <PieChart
      series={[
        {
          innerRadius: 25,
          outerRadius: 85,
          data: chartData,
          arcLabel: (item) => {
            // Mostra a porcentagem ou valor
            const total = chartData.reduce((sum, d) => sum + d.value, 0)
            const percent = ((item.value / total) * 100).toFixed(0)
            return `${percent}%`
          }
        }
      ]}
      slotProps={{
        legend: { 
          hidden: false,
          position: { vertical: 'bottom', horizontal: 'middle' }
        }
      }}
      {...settings}
    />
  )
}