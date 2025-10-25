import { Context } from '../contexts/Context'
import { useState } from 'react'
import App from '../App'

export default function Provider() {
  const [signedIn, setSignedIn] = useState(false)
  const [user, setUser] = useState({ name: 'Willian' })
  const despesas = [
  { descricao: 'Internet bill', categoria: 'Utilities', valor: 120.50 },
  { descricao: 'Supermarket', categoria: 'Groceries', valor: 342.90 },
  { descricao: 'Gasoline', categoria: 'Transport', valor: 210.00 },
  { descricao: 'Gym membership', categoria: 'Health', valor: 89.99 },
  { descricao: 'Netflix subscription', categoria: 'Entertainment', valor: 39.90 }
]

  return (
    <Context.Provider value={{signedIn, setSignedIn, user, setUser, despesas}}>
      <App />
    </Context.Provider>
  )
}