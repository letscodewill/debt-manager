import { Context } from '../contexts/Context'
import { useState } from 'react'
import { despesas } from '../utils/data'
import App from '../App'
import { byCategory} from '../utils/datesFilter'

export default function Provider() {
  const [signedIn, setSignedIn] = useState(false)
  const [user, setUser] = useState({ name: 'Willian' })
  const totalArray = Object.values(byCategory(despesas))
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear())
  return (
    <Context.Provider
      value={{ signedIn, setSignedIn, user, setUser, despesas, totalArray, month, setMonth, year, setYear }}
    >
      <App />
    </Context.Provider>
  )
}
