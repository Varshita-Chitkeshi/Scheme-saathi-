import { cn } from '../utils/helpers'

export default function Select({
  id,
  label,
  error,
  options = [],
  placeholder = 'Select',
  className,
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink-700">
          {label}
        </label>
      )}
      <select
        id={id}
        className={cn(
          'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-base text-ink-900 shadow-sm',
          error && 'border-red-400',
          className,
        )}
        aria-invalid={Boolean(error)}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => {
          const value = typeof option === 'string' ? option : option.value
          const labelText = typeof option === 'string' ? option : option.label
          return (
            <option key={value} value={value}>
              {labelText}
            </option>
          )
        })}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
