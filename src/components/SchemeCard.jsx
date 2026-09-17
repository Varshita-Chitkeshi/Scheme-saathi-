import { ArrowRight, Bookmark, BookmarkCheck, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import Badge from './Badge'
import Button from './Button'
import Card from './Card'
import { useLanguage } from '../context/LanguageContext'

export default function SchemeCard({ scheme, matchLabel, matchReasons = [], saved, onSave }) {
  const { t } = useLanguage()
  const badgeLabel = matchLabel || t.common.basedOnProfile

  return (
    <Card className="flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="category">{scheme.category}</Badge>
        {matchLabel && <Badge variant="match">{badgeLabel}</Badge>}
      </div>
      <h3 className="mt-3 font-display text-lg text-navy-900">{scheme.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{scheme.shortDescription}</p>
      {scheme.benefits?.[0] && (
        <p className="mt-3 rounded-xl bg-teal-50 px-3 py-2 text-sm text-teal-800">
          <span className="font-semibold">Benefit: </span>
          {scheme.benefits[0]}
        </p>
      )}
      {matchReasons.length > 0 && (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-ink-600">
          {matchReasons.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      )}
      <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-ink-500">
        <FileText className="h-4 w-4" aria-hidden="true" />
        {scheme.requiredDocuments?.length || 0} required documents
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          to={`/schemes/${scheme.id}`}
          className="inline-flex items-center gap-1 rounded-xl bg-navy-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-900"
        >
          {t.common.viewDetails}
          <ArrowRight className="h-4 w-4" />
        </Link>
        {onSave && (
          <Button variant="outline" size="sm" onClick={() => onSave(scheme.id)}>
            {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
            {saved ? t.common.saved : t.common.save}
          </Button>
        )}
      </div>
    </Card>
  )
}
