import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)
const USER_KEY = 'scheme-saathi-user'
const TOKEN_KEY = 'scheme-saathi-token'

function readUser() {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser)
  const [error, setError] = useState('')

  const persist = (nextUser, token) => {
    setUser(nextUser)
    if (nextUser) localStorage.setItem(USER_KEY, JSON.stringify(nextUser))
    else localStorage.removeItem(USER_KEY)
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  }

  const login = async ({ email, password }) => {
    setError('')
    if (!email || !password) {
      setError('Enter email and password.')
      return { ok: false }
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a valid email address.')
      return { ok: false }
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return { ok: false }
    }
    // Mock session only — never store the password.
    const nextUser = {
      id: 'user-' + email.toLowerCase(),
      email: email.toLowerCase(),
      fullName: email.split('@')[0].replace(/[._]/g, ' '),
      isGuest: false,
    }
    persist(nextUser, 'mock-jwt-token')
    return { ok: true }
  }

  const register = async ({ fullName, email, password, confirmPassword, state }) => {
    setError('')
    if (!fullName?.trim()) {
      setError('Please enter your full name.')
      return { ok: false }
    }
    if (!/^\S+@\S+\.\S+$/.test(email || '')) {
      setError('Enter a valid email address.')
      return { ok: false }
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.')
      return { ok: false }
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return { ok: false }
    }
    const nextUser = {
      id: 'user-' + email.toLowerCase(),
      email: email.toLowerCase(),
      fullName: fullName.trim(),
      state: state || '',
      isGuest: false,
    }
    persist(nextUser, 'mock-jwt-token')
    return { ok: true }
  }

  const continueAsGuest = () => {
    setError('')
    persist(
      {
        id: 'guest',
        email: '',
        fullName: 'Guest Citizen',
        isGuest: true,
      },
      'mock-guest-token',
    )
    return { ok: true }
  }

  const logout = () => persist(null, null)

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      error,
      setError,
      login,
      register,
      continueAsGuest,
      logout,
    }),
    [user, error],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
