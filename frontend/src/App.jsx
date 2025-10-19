import { useContext, useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router'
import './App.css'
import { Context } from './contexts/Context'
import Component from './Components/Component'
import Login from './Components/Login'
import Panel from './Components/Panel'


function App() {
  const [signedIn, setSignedIn, user, setUser] = useContext(Context)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/divida" element={ <Panel />} />
        </Routes>
      </BrowserRouter>
     

    </>
  )
}


export default App
