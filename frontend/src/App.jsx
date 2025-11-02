import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Login from './pages/Login'
import Panel from './pages/Panel'
import PrivateRoute from './Components/PrivateRoute'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <>
      <BrowserRouter>
        
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dividas"
              element={
                <PrivateRoute>
                  <Panel />
                </PrivateRoute>
              }
            />
          </Routes>{' '}
      </BrowserRouter>
    </>
  )
}

export default App
