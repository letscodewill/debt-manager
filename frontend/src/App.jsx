import { BrowserRouter,Routes,Route } from 'react-router'
import './App.css'
import Login from './Components/Login'
import Panel from './Components/Panel'

function App() {
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
