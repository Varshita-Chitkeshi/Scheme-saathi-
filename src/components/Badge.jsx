import { cn } from '../utils/helpers'

const styles = {
  default: 'bg-navy-50 text-navy-800',
  match: 'bg-teal-50 text-teal-700 border border-teal-200',
  category: 'bg-slate-100 text-ink-700',
  warning: 'bg-amber-50 text-amber-900 border border-amber-200',
  info: 'bg-sky-50 text-sky-900',
}

export default function Badge({ children, variant = 'default', className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold',
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
