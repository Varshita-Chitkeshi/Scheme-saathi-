import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useAuth } from './AuthContext'

const AppDataContext = createContext(null)

function storageKey(userId, name) {
  return `scheme-saathi-${userId || 'anon'}-${name}`
}

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const emptyProfile = {
  fullName: '',
  age: '',
  gender: '',
  state: '',
  district: '',
  occupation: '',
  annualIncome: '',
  socialCategory: '',
  areaType: '',
  disabilityStatus: '',
  isStudent: '',
  isFarmer: '',
  isEntrepreneur: '',
}

export function AppDataProvider({ children }) {
  const { user } = useAuth()
  const userId = user?.id || 'anon'

  const [profile, setProfileState] = useState(emptyProfile)
  const [savedIds, setSavedIds] = useState([])
  const [documents, setDocuments] = useState({})
  const [eligibilityAnswers, setEligibilityAnswers] = useState(null)
  const [recentlyViewed, setRecentlyViewed] = useState([])

  useEffect(() => {
    const storedProfile = readJson(storageKey(userId, 'profile'), {
      ...emptyProfile,
      fullName: user?.fullName || '',
      state: user?.state || '',
    })
    setProfileState(storedProfile)
    setSavedIds(readJson(storageKey(userId, 'saved'), []))
    setDocuments(readJson(storageKey(userId, 'docs'), {}))
    setEligibilityAnswers(readJson(storageKey(userId, 'eligibility'), null))
    setRecentlyViewed(readJson(storageKey(userId, 'recent'), []))
  }, [userId, user?.fullName, user?.state])

  const saveProfile = (next) => {
    const merged = { ...profile, ...next }
    setProfileState(merged)
    localStorage.setItem(storageKey(userId, 'profile'), JSON.stringify(merged))
  }

  const toggleSave = (schemeId) => {
    setSavedIds((prev) => {
      const next = prev.includes(schemeId) ? prev.filter((id) => id !== schemeId) : [...prev, schemeId]
      localStorage.setItem(storageKey(userId, 'saved'), JSON.stringify(next))
      return next
    })
  }

  const toggleDocument = (docId) => {
    setDocuments((prev) => {
      const next = { ...prev, [docId]: !prev[docId] }
      localStorage.setItem(storageKey(userId, 'docs'), JSON.stringify(next))
      return next
    })
  }

  const saveEligibility = (answers) => {
    setEligibilityAnswers(answers)
    localStorage.setItem(storageKey(userId, 'eligibility'), JSON.stringify(answers))
    saveProfile({
      age: answers.age || profile.age,
      state: answers.state || profile.state,
      occupation: answers.occupation || profile.occupation,
      annualIncome: answers.annualIncome || profile.annualIncome,
      socialCategory: answers.socialCategory || profile.socialCategory,
      areaType: answers.areaType || profile.areaType,
      isStudent: answers.isStudent || profile.isStudent,
      isFarmer: answers.isFarmer || profile.isFarmer,
      isEntrepreneur: answers.isEntrepreneur || profile.isEntrepreneur,
    })
  }

  const addRecentlyViewed = (schemeId) => {
    setRecentlyViewed((prev) => {
      const next = [schemeId, ...prev.filter((id) => id !== schemeId)].slice(0, 6)
      localStorage.setItem(storageKey(userId, 'recent'), JSON.stringify(next))
      return next
    })
  }

  const value = useMemo(
    () => ({
      profile,
      saveProfile,
      savedIds,
      toggleSave,
      documents,
      toggleDocument,
      eligibilityAnswers,
      saveEligibility,
      recentlyViewed,
      addRecentlyViewed,
    }),
    [profile, savedIds, documents, eligibilityAnswers, recentlyViewed],
  )

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}

export function useAppData() {
  const ctx = useContext(AppDataContext)
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider')
  return ctx
}
