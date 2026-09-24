import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

function loadUsers() {
  return JSON.parse(localStorage.getItem('caderno_users') || '{}')
}

function saveUsers(users) {
  localStorage.setItem('caderno_users', JSON.stringify(users))
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('caderno_current_user')
    return saved ? JSON.parse(saved) : null
  })

  function register(email, password) {
    const users = loadUsers()
    if (users[email]) {
      throw new Error('Já existe uma conta com esse e-mail.')
    }
    users[email] = { email, password }
    saveUsers(users)
    login(email, password)
  }

  function login(email, password) {
    const users = loadUsers()
    const found = users[email]
    if (!found || found.password !== password) {
      throw new Error('E-mail ou senha incorretos.')
    }
    const sessionUser = { email }
    localStorage.setItem('caderno_current_user', JSON.stringify(sessionUser))
    setUser(sessionUser)
  }

  function logout() {
    localStorage.removeItem('caderno_current_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
