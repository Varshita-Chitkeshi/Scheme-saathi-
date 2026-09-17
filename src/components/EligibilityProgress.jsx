export default function EligibilityProgress({ current, total }) {
  const percent = Math.round((current / total) * 100)

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm font-semibold text-ink-700">
        <span>
          Step {current} of {total}
        </span>
        <span>{percent}%</span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-slate-200"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
      >
        <div className="h-full rounded-full bg-teal-600" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
