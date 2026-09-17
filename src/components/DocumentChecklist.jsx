import { CheckCircle2 } from 'lucide-react'
import { cn } from '../utils/helpers'

export default function DocumentChecklist({ items, checkedMap, onToggle, title }) {
  const done = items.filter((item) => checkedMap[item.id]).length

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {title && <h3 className="font-display text-lg text-navy-900">{title}</h3>}
      <p className="mt-1 text-sm font-medium text-ink-600">
        {done} of {items.length} documents ready
      </p>
      <ul className="mt-4 space-y-2">
        {items.map((item) => {
          const ready = Boolean(checkedMap[item.id])
          return (
            <li key={item.id}>
              <label
                className={cn(
                  'flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-3',
                  ready ? 'border-teal-200 bg-teal-50' : 'border-slate-200 bg-white',
                )}
              >
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4"
                  checked={ready}
                  onChange={() => onToggle(item.id)}
                />
                <span className="flex-1 text-sm font-medium text-ink-800">{item.label}</span>
                <span className="text-xs font-semibold text-ink-500">
                  {ready ? 'Available' : 'Not available'}
                </span>
                {ready && <CheckCircle2 className="h-4 w-4 text-teal-700" aria-hidden="true" />}
              </label>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
