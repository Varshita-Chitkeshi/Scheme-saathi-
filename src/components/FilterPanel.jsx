import { CATEGORIES, INCOME_RANGES, OCCUPATIONS, STATES, TARGET_GROUPS } from '../data/constants'
import Select from './Select'
import Button from './Button'

export default function FilterPanel({ filters, onChange, onReset }) {
  const set = (key, value) => onChange({ ...filters, [key]: value })

  return (
    <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-5">
      <Select
        id="filter-category"
        label="Category"
        value={filters.category}
        onChange={(e) => set('category', e.target.value)}
        options={CATEGORIES.map((c) => c.id)}
        placeholder="All categories"
      />
      <Select
        id="filter-state"
        label="State"
        value={filters.state}
        onChange={(e) => set('state', e.target.value)}
        options={STATES}
        placeholder="All states"
      />
      <Select
        id="filter-occupation"
        label="Occupation"
        value={filters.occupation}
        onChange={(e) => set('occupation', e.target.value)}
        options={OCCUPATIONS}
        placeholder="All occupations"
      />
      <Select
        id="filter-income"
        label="Income"
        value={filters.income}
        onChange={(e) => set('income', e.target.value)}
        options={INCOME_RANGES}
        placeholder="Any income"
      />
      <div className="flex flex-col">
        <Select
          id="filter-group"
          label="Target group"
          value={filters.targetGroup}
          onChange={(e) => set('targetGroup', e.target.value)}
          options={TARGET_GROUPS}
          placeholder="Any group"
        />
        <Button variant="ghost" size="sm" className="mt-2 self-start" onClick={onReset}>
          Clear filters
        </Button>
      </div>
    </div>
  )
}
