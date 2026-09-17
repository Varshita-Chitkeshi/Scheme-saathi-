import { Search } from 'lucide-react'
import Button from './Button'

export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon: Icon = Search,
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
      <Icon className="mx-auto h-10 w-10 text-navy-300" aria-hidden="true" />
      <h2 className="mt-4 font-display text-xl text-navy-900">{title}</h2>
      {description && <p className="mx-auto mt-2 max-w-md text-ink-600">{description}</p>}
      {actionLabel && onAction && (
        <Button className="mt-5" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
