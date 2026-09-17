import { createContext, useContext, useMemo, useState } from 'react'
import { translations } from '../data/translations'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'scheme-saathi-language'

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => localStorage.getItem(STORAGE_KEY) || 'en')

  const setLanguage = (code) => {
    setLanguageState(code)
    localStorage.setItem(STORAGE_KEY, code)
  }

  const t = translations[language] || translations.en

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
