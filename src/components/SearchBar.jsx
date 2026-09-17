import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder, id = 'scheme-search' }) {
  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-500" aria-hidden="true" />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-base shadow-sm placeholder:text-slate-400"
      />
    </div>
  )
}
