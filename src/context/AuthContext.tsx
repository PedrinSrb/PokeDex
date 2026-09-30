import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

interface AuthContextValue {
  user: string | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(() => localStorage.getItem('pth_user'))

  const login = (username: string, password: string) => {
    const valid = username === 'treinador' && password === 'pokemon123'
    if (valid) {
      localStorage.setItem('pth_user', username)
      setUser(username)
    }
    return valid
  }

  const logout = () => {
    localStorage.removeItem('pth_user')
    setUser(null)
  }

  const value = useMemo(() => ({ user, login, logout }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return context
}