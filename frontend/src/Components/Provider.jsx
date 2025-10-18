import { Context } from '../contexts/Context'
import { useState } from 'react'
import App from '../App'

export default function Provider() {
  const [signedIn, setSignedIn] = useState(false)
  const [user, setUser] = useState({ name: 'Willian' })

  return (
    <Context.Provider value={[signedIn, setSignedIn, user, setUser]}>
      <App />
    </Context.Provider>
  )
}