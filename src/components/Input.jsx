import { cn } from '../utils/helpers'

export default function Input({
  id,
  label,
  error,
  hint,
  className,
  type = 'text',
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink-700">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={cn(
          'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-base text-ink-900 shadow-sm placeholder:text-slate-400',
          error && 'border-red-400',
          className,
        )}
        aria-invalid={Boolean(error)}
        {...props}
      />
      {hint && !error && <p className="mt-1 text-sm text-ink-500">{hint}</p>}
      {error && (
        <p className="mt-1 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
