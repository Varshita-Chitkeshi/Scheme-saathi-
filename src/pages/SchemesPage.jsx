import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Briefcase,
  GraduationCap,
  Heart,
  Home,
  Landmark,
  ShieldCheck,
  Tractor,
  Wallet,
} from 'lucide-react'
import SearchBar from '../components/SearchBar'
import SchemeCard from '../components/SchemeCard'
import SchemeCategoryCard from '../components/SchemeCategoryCard'
import EmptyState from '../components/EmptyState'
import LoadingSpinner from '../components/LoadingSpinner'
import Button from '../components/Button'
import { mockSchemes } from '../data/mockSchemes'
import { CATEGORIES } from '../data/constants'
import { useAppData } from '../context/AppDataContext'
import { useLanguage } from '../context/LanguageContext'

const icons = {
  'Financial Assistance': Wallet,
  Education: GraduationCap,
  Agriculture: Tractor,
  Entrepreneurship: Briefcase,
  'Women & Family': Heart,
  Housing: Home,
  Employment: Landmark,
  'Social Security': ShieldCheck,
}

export default function SchemesPage() {
  const { t } = useLanguage()
  const { savedIds, toggleSave } = useAppData()
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const category = params.get('category') || ''

  const filtered = useMemo(() => {
    let list = [...mockSchemes]
    if (category) list = list.filter((s) => s.category === category)
    if (query) {
      const q = query.toLowerCase()
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.shortDescription.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q),
      )
    }
    return list
  }, [query, category])

  const retry = () => {
    setError('')
    setLoading(true)
    setTimeout(() => setLoading(false), 300)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-navy-900">Explore Government Schemes</h1>
        <p className="mt-2 text-ink-600">Browse the directory. Apply only on official government websites.</p>
      </div>
      <SearchBar
        value={query}
        onChange={(value) => {
          setQuery(value)
          const next = new URLSearchParams(params)
          if (value) next.set('q', value)
          else next.delete('q')
          setParams(next)
        }}
        placeholder="Search schemes..."
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className={category === cat.id ? 'rounded-2xl ring-2 ring-teal-600' : ''}
          >
            <SchemeCategoryCard
              title={cat.label}
              icon={icons[cat.id]}
              to={`/schemes?category=${encodeURIComponent(cat.id)}`}
              description={category === cat.id ? 'Selected category' : 'View schemes'}
            />
          </div>
        ))}
      </div>
      {category && (
        <Button
          variant="ghost"
          onClick={() => {
            const next = new URLSearchParams(params)
            next.delete('category')
            setParams(next)
          }}
        >
          Clear category: {category}
        </Button>
      )}
      {loading && <LoadingSpinner />}
      {error && (
        <p className="text-sm text-red-700">
          {error}{' '}
          <button type="button" className="font-semibold underline" onClick={retry}>
            Retry
          </button>
        </p>
      )}
      {!loading && filtered.length === 0 ? (
        <EmptyState title={t.common.noSchemes} description={t.common.noSchemesHint} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              saved={savedIds.includes(scheme.id)}
              onSave={toggleSave}
            />
          ))}
        </div>
      )}
    </div>
  )
}
