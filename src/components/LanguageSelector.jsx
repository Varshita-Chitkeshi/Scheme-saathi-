import { Globe } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिन्दी' },
  { value: 'mr', label: 'मराठी' },
]

export default function LanguageSelector({ compact = false, id = 'language-select' }) {
  const { language, setLanguage } = useLanguage()

  return (
    <label className="flex items-center gap-2 text-sm font-medium text-ink-700" htmlFor={id}>
      <Globe className="h-4 w-4 shrink-0 text-teal-700" aria-hidden="true" />
      <span className={compact ? 'sr-only' : ''}>Language</span>
      <select
        id={id}
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
        className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm text-ink-900"
      >
        {OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
