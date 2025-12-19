import { BrowserRouter, Routes, Route } from 'react-router'
import { Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Panel from './pages/Panel'
import PrivateRoute from './Components/PrivateRoute'
import Adm from './pages/Adm'

function App() {
  return (
    <>
      <BrowserRouter>
        
          <Routes>
            <Route path="/" element={<Navigate to="/login"/>} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dividas"
              element={
                <PrivateRoute>
                  <Panel />
                </PrivateRoute>
              }
            />
            <Route
              path="/padmin"
              element={
                <PrivateRoute>
                  <Adm />
                </PrivateRoute>
              }
            />
          </Routes>{' '}
      </BrowserRouter>
    </>
  )
}

export default App
