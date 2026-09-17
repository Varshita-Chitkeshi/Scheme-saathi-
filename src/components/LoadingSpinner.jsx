export default function LoadingSpinner({ label = 'Loading' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12" role="status" aria-live="polite">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-navy-100 border-t-teal-600" />
      <p className="text-sm font-medium text-ink-600">{label}</p>
    </div>
  )
}
