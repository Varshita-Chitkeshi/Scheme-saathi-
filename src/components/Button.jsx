import { cn } from '../utils/helpers'

const variants = {
  primary:
    'bg-navy-800 text-white hover:bg-navy-900 shadow-sm',
  secondary:
    'bg-teal-600 text-white hover:bg-teal-700 shadow-sm',
  outline:
    'border border-navy-200 bg-white text-navy-800 hover:bg-navy-50',
  ghost: 'text-navy-800 hover:bg-navy-50',
}

const sizes = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-sm sm:text-base',
  lg: 'px-5 py-3 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
