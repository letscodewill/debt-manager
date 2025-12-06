// hooks/useDespesas.js
import { useContext, useEffect } from 'react'
import { Context } from '../contexts/Context'
import { AuthContext } from '../contexts/AuthContext'
import { filterByYear, filterByMonth } from '../utils/datesFilter.js'
import sumValues from '../utils/sumItems'

export function useDespesas() {
  const { despesas, month, year, loading, error, fetchDespesas } = useContext(Context)
  const { token } = useContext(AuthContext)

  useEffect(() => {
    if (token && fetchDespesas) {
      fetchDespesas(token)
    }
  }, [token, fetchDespesas])

  const filteredY = filterByYear(despesas, year)
  const filteredM = filterByMonth(filteredY, month)
  const sum = sumValues(filteredM)

  return {
    despesas,
    filteredDespesas: filteredM,
    total: sum,
    loading,
    error,
    refresh: () => fetchDespesas(token)
  }
}