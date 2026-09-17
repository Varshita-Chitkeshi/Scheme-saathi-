import { useMemo, useState } from 'react'
import SchemeCard from '../components/SchemeCard'
import SearchBar from '../components/SearchBar'
import FilterPanel from '../components/FilterPanel'
import EmptyState from '../components/EmptyState'
import { mockSchemes } from '../data/mockSchemes'
import { useAppData } from '../context/AppDataContext'
import { rankSchemes } from '../utils/helpers'
import { useLanguage } from '../context/LanguageContext'

const emptyFilters = { category: '', state: '', occupation: '', income: '', targetGroup: '' }

export default function RecommendationsPage() {
  const { t } = useLanguage()
  const { profile, eligibilityAnswers, savedIds, toggleSave } = useAppData()
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState(emptyFilters)

  const ranked = useMemo(() => {
    let list = rankSchemes(mockSchemes, eligibilityAnswers || {}, profile)
    if (query) {
      const q = query.toLowerCase()
      list = list.filter(
        ({ scheme }) =>
          scheme.name.toLowerCase().includes(q) ||
          scheme.category.toLowerCase().includes(q) ||
          scheme.shortDescription.toLowerCase().includes(q),
      )
    }
    if (filters.category) list = list.filter(({ scheme }) => scheme.category === filters.category)
    if (filters.state && filters.state !== 'All India') {
      list = list.filter(({ scheme }) => scheme.state === 'All India' || scheme.state === filters.state)
    }
    if (filters.occupation) {
      list = list.filter(({ scheme }) => scheme.occupations?.includes(filters.occupation))
    }
    if (filters.targetGroup) {
      list = list.filter(({ scheme }) => scheme.targetGroups?.includes(filters.targetGroup))
    }
    return list
  }, [query, filters, eligibilityAnswers, profile])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-navy-900">Schemes That May Match Your Profile</h1>
        <p className="mt-2 max-w-3xl text-ink-600">
          Based on the information you provided, these schemes may be relevant to you. Labels such as “Potential Match”
          are guidance only — not official eligibility.
        </p>
      </div>
      <SearchBar value={query} onChange={setQuery} placeholder={t.common.search} />
      <FilterPanel filters={filters} onChange={setFilters} onReset={() => setFilters(emptyFilters)} />
      {ranked.length === 0 ? (
        <EmptyState title={t.common.noSchemes} description={t.common.noSchemesHint} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {ranked.map(({ scheme, match }) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              matchLabel={match.label}
              matchReasons={match.reasons}
              saved={savedIds.includes(scheme.id)}
              onSave={toggleSave}
            />
          ))}
        </div>
      )}
    </div>
  )
}
