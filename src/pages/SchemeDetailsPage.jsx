import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Bot, Bookmark, ExternalLink } from 'lucide-react'
import Badge from '../components/Badge'
import Button from '../components/Button'
import Card from '../components/Card'
import EmptyState from '../components/EmptyState'
import LoadingSpinner from '../components/LoadingSpinner'
import { getSchemeById } from '../services/api'
import { useAppData } from '../context/AppDataContext'
import { scoreScheme } from '../utils/helpers'

export default function SchemeDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { savedIds, toggleSave, addRecentlyViewed, eligibilityAnswers, profile } = useAppData()
  const [scheme, setScheme] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const { data } = await getSchemeById(id)
      setScheme(data)
      addRecentlyViewed(data.id)
    } catch {
      setError('Scheme not found')
      setScheme(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [id])

  if (loading) return <LoadingSpinner label="Loading scheme" />
  if (error || !scheme) {
    return (
      <EmptyState
        title="We could not open this scheme."
        description="Check the link or return to the directory."
        actionLabel="Explore schemes"
        onAction={() => navigate('/schemes')}
      />
    )
  }

  const match = scoreScheme(scheme, eligibilityAnswers || {}, profile)
  const saved = savedIds.includes(scheme.id)

  return (
    <article className="space-y-6">
      <header className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="category">{scheme.category}</Badge>
          <Badge variant="match">{match.label}</Badge>
        </div>
        <h1 className="font-display text-3xl text-navy-900 sm:text-4xl">{scheme.name}</h1>
        <p className="text-ink-600">{scheme.shortDescription}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          {scheme.officialUrlVerified && scheme.officialUrl ? (
            <a href={scheme.officialUrl} target="_blank" rel="noopener noreferrer">
              <Button className="w-full sm:w-auto">
                Apply on Official Portal
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          ) : (
            <Button disabled title="No verified official URL in this demo">
              Official link not verified
            </Button>
          )}
          <Button variant="outline" onClick={() => toggleSave(scheme.id)}>
            <Bookmark className="h-4 w-4" />
            {saved ? 'Saved' : 'Save Scheme'}
          </Button>
          <Link to="/assistant" state={{ schemeId: scheme.id }}>
            <Button variant="outline">
              <Bot className="h-4 w-4" />
              Ask AI About This Scheme
            </Button>
          </Link>
        </div>
        <p className="text-sm font-medium text-teal-800">Official Government Portal — applications never happen on Scheme Saathi.</p>
      </header>

      <Section title="1. Overview">{scheme.description}</Section>
      <Section title="2. Benefits">
        <ul className="list-disc space-y-1 pl-5">
          {scheme.benefits.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>
      <Section title="3. Who May Be Eligible">
        <ul className="list-disc space-y-1 pl-5">
          {scheme.eligibilityCriteria.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-ink-500">This is a summary for discovery. Authorities decide eligibility.</p>
      </Section>
      <Section title="4. Required Documents">
        <ul className="list-disc space-y-1 pl-5">
          {scheme.requiredDocuments.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>
      <Section title="5. How to Apply">
        <ol className="list-decimal space-y-1 pl-5">
          {scheme.applicationSteps.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </Section>
      <Section title="6. Important Information">
        <ul className="list-disc space-y-1 pl-5">
          {scheme.importantInformation.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-ink-500">Last verified in our mock directory: {scheme.lastVerifiedDate}</p>
      </Section>
    </article>
  )
}

function Section({ title, children }) {
  return (
    <Card>
      <h2 className="font-display text-xl text-navy-900">{title}</h2>
      <div className="mt-3 text-ink-700 leading-relaxed">{children}</div>
    </Card>
  )
}
