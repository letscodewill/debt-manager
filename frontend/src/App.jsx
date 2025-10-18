import { useContext, useState } from 'react'

import './App.css'
import { Context } from './contexts/Context'
import Component from './Components/Component'

function App() {
  const [signedIn, setSignedIn, user, setUser] = useContext(Context)

  return (
    <>
      <label>Hello {user.name}</label>
      <Component />
      <button onClick={() => user.name == 'Willian'? setUser({ name: 'John' }):setUser({ name: 'Willian' })}>Change name</button>
      <button onClick={() => setSignedIn(!signedIn)}>Change Logged</button>
    </>
  )
}


export default App
