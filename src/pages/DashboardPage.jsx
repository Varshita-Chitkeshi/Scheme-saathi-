import { Link } from 'react-router-dom'
import {
  Bookmark,
  Bot,
  Briefcase,
  FileText,
  GraduationCap,
  Heart,
  Home,
  Landmark,
  Tractor,
  User,
} from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'
import SchemeCard from '../components/SchemeCard'
import SchemeCategoryCard from '../components/SchemeCategoryCard'
import { mockSchemes } from '../data/mockSchemes'
import { useAuth } from '../context/AuthContext'
import { useAppData } from '../context/AppDataContext'
import { getProfileCompletion, rankSchemes } from '../utils/helpers'
import { DEFAULT_DOCUMENTS } from '../data/constants'

const categories = [
  { title: 'Education', icon: GraduationCap, query: 'Education' },
  { title: 'Agriculture', icon: Tractor, query: 'Agriculture' },
  { title: 'Entrepreneurship', icon: Briefcase, query: 'Entrepreneurship' },
  { title: 'Women & Family', icon: Heart, query: 'Women & Family' },
  { title: 'Housing', icon: Home, query: 'Housing' },
  { title: 'Employment', icon: Landmark, query: 'Employment' },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const { profile, savedIds, documents, toggleSave, eligibilityAnswers } = useAppData()
  const completion = getProfileCompletion(profile)
  const ranked = rankSchemes(mockSchemes, eligibilityAnswers || {}, profile).slice(0, 4)
  const docsReady = DEFAULT_DOCUMENTS.filter((d) => documents[d.id]).length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-navy-900">Welcome, {profile.fullName || user?.fullName}</h1>
        <p className="mt-1 text-ink-600">Find government support that may match your situation.</p>
      </div>

      <Card className="flex flex-col gap-4 bg-navy-50 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-teal-800">Profile completion</p>
          <p className="font-display text-2xl text-navy-900">Your profile is {completion}% complete</p>
          <div className="mt-2 h-2 w-56 overflow-hidden rounded-full bg-white">
            <div className="h-full bg-teal-600" style={{ width: `${completion}%` }} />
          </div>
        </div>
        <Link to="/profile">
          <Button>{completion < 100 ? 'Complete Profile' : 'Update Profile'}</Button>
        </Link>
      </Card>

      <Card className="flex flex-col items-start gap-4 bg-white sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl text-navy-900">Find Schemes For Me</h2>
          <p className="text-sm text-ink-600">Answer a few questions and see schemes that may be relevant.</p>
        </div>
        <Link to="/eligibility">
          <Button size="lg">Find Schemes For Me</Button>
        </Link>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-ink-500">Matching schemes</p>
          <p className="mt-1 font-display text-3xl text-navy-900">{ranked.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-ink-500">Saved schemes</p>
          <p className="mt-1 font-display text-3xl text-navy-900">{savedIds.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-ink-500">Documents ready</p>
          <p className="mt-1 font-display text-3xl text-navy-900">
            {docsReady}/{DEFAULT_DOCUMENTS.length}
          </p>
        </Card>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Link to="/eligibility">
          <Button className="w-full" variant="primary">
            Find Schemes
          </Button>
        </Link>
        <Link to="/schemes">
          <Button className="w-full" variant="outline">
            Explore Schemes
          </Button>
        </Link>
        <Link to="/documents">
          <Button className="w-full" variant="outline">
            <FileText className="h-4 w-4" /> My Documents
          </Button>
        </Link>
        <Link to="/assistant">
          <Button className="w-full" variant="outline">
            <Bot className="h-4 w-4" /> Ask AI Assistant
          </Button>
        </Link>
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl text-navy-900">Recommended For You</h2>
          <Link to="/recommendations" className="text-sm font-semibold text-teal-700">
            See all
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {ranked.map(({ scheme, match }) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              matchLabel={match.label}
              matchReasons={match.reasons}
              saved={savedIds.includes(scheme.id)}
              onSave={toggleSave}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-2xl text-navy-900">Continue Exploring</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <SchemeCategoryCard
              key={cat.title}
              title={cat.title}
              icon={cat.icon}
              to={`/schemes?category=${encodeURIComponent(cat.query)}`}
              description={`Browse ${cat.title.toLowerCase()} schemes`}
            />
          ))}
        </div>
      </section>

      <section className="flex items-center gap-2 text-sm text-ink-500">
        <User className="h-4 w-4" />
        <Bookmark className="h-4 w-4" />
        Saved items and profile stay on this device until the backend is connected.
      </section>
    </div>
  )
}
