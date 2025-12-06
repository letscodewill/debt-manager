// Provider.jsx
import { Context } from '../contexts/Context'
import { useState, useEffect, useCallback } from 'react'
import App from '../App'
import { AuthProvider } from '../contexts/AuthContext'
import { AuthContext } from '../contexts/AuthContext'
import { formatDespesaFromAPI } from '../utils/dataFormatter';

export default function Provider() {
  const [signedIn, setSignedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [despesas, setDespesas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [month, setMonth] = useState(new Date().getMonth() + 1) // 1-12
const [year, setYear] = useState(new Date().getFullYear())
  const [category, setCategory] = useState('')
  const [totalArray, setTotalArray] = useState([])

  // Função para buscar despesas da API
const fetchDespesas = useCallback(async (token) => {
  if (!token) return;
  
  try {
    setLoading(true);
    const response = await fetch('http://localhost:3000/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Token inválido ou expirado');
      }
      throw new Error('Erro ao buscar despesas');
    }

    const data = await response.json();
    
    // Formata os dados da API
    const despesasFormatadas = data.map(formatDespesaFromAPI).filter(Boolean);
    
    setDespesas(despesasFormatadas);
    setError(null);
  } catch (err) {
    console.error('Erro ao buscar despesas:', err);
    setError(err.message);
    setDespesas([]);
  } finally {
    setLoading(false);
  }
}, []);

  // Atualiza totalArray quando despesas mudam
  useEffect(() => {
    if (despesas.length > 0) {
      // Agrupa por categoria e soma os valores
      const categoriasAgrupadas = despesas.reduce((acc, despesa) => {
        if (!acc[despesa.categoria]) {
          acc[despesa.categoria] = 0
        }
        acc[despesa.categoria] += despesa.valor
        return acc
      }, {})

      setTotalArray(Object.values(categoriasAgrupadas))
    } else {
      setTotalArray([])
    }
  }, [despesas])

  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {({ token }) => (
          <Context.Provider
            value={{
              signedIn,
              setSignedIn,
              user,
              setUser,
              despesas,
              setDespesas,
              fetchDespesas,
              loading,
              error,
              totalArray,
              month,
              setMonth,
              year,
              setYear,
              category,
              setCategory
            }}
          >
            <App />
          </Context.Provider>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  )
}
