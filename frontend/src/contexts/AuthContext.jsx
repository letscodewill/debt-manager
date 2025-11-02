import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || null)

  const login = (email, password) => {
    // In real app, replace with axios.post('/login', { email, password })
    if (email === 'test@test.com' && password === '123456') {
      const fakeToken = 'abc123xyz' // Fake JWT token
      setToken(fakeToken)
      setUser({ email })
      localStorage.setItem('token', fakeToken)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
