import { Link } from 'react-router-dom'
import Card from './Card'

export default function SchemeCategoryCard({ title, description, icon: Icon, to }) {
  const content = (
    <Card className="h-full transition hover:border-teal-200 hover:shadow-md">
      {Icon && (
        <span className="inline-flex rounded-xl bg-navy-50 p-2.5 text-navy-800">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
      )}
      <h3 className="mt-3 font-display text-lg text-navy-900">{title}</h3>
      {description && <p className="mt-1 text-sm text-ink-600">{description}</p>}
    </Card>
  )

  if (!to) return content
  return (
    <Link to={to} className="block h-full">
      {content}
    </Link>
  )
}
