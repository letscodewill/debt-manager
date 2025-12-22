import { useContext, useEffect } from 'react'
import { Context } from '../contexts/Context'
import { AuthContext } from '../contexts/AuthContext'
import { filterByYear, filterByMonth } from '../utils/datesFilter.js'
import sumValues from '../utils/sumItems'

export function useDespesas() {
  const { despesas, month, year, loading, error, fetchDespesas } = useContext(Context)
  // 1. Get 'user' from AuthContext
  const { token, user } = useContext(AuthContext)

  useEffect(() => {
    // 2. Check for user and pass user.id
    if (token && fetchDespesas && user) {
      fetchDespesas(token, user.id)
    }
  }, [token, fetchDespesas, user]) // 3. Add user to dependencies

  const filteredY = filterByYear(despesas, year)
  const filteredM = filterByMonth(filteredY, month)
  const sum = sumValues(filteredM)

  return {
    despesas,
    filteredDespesas: filteredM,
    total: sum,
    loading,
    error,
    // 4. Update the manual refresh function too
    refresh: () => fetchDespesas(token, user?.id)
  }
}