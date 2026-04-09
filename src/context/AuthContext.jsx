import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  function login(email, password) {
    // Mock auth — accepts any email/password
    const name = email.split('@')[0]
    setUser({ email, name: name.charAt(0).toUpperCase() + name.slice(1) })
    return true
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}