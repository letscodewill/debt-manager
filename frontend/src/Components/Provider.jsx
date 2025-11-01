import { Context } from '../contexts/Context'
import { useState } from 'react'
import { despesas } from '../utils/data'
import App from '../App'

export default function Provider() {
  const [signedIn, setSignedIn] = useState(false)
  const [user, setUser] = useState({ name: 'Willian' })

  const totalByCategory = despesas.reduce((acc, item) => {
    if (!acc[item.categoria]) {
      acc[item.categoria] = {
        label: item.categoria,
        value: 0,
        color: item.color
      }
    }
    acc[item.categoria].value += item.valor
    return acc
  }, {})

  const totalArray = Object.values(totalByCategory)

  return (
    <Context.Provider
      value={{ signedIn, setSignedIn, user, setUser, despesas, totalArray }}
    >
      <App />
    </Context.Provider>
  )
}
