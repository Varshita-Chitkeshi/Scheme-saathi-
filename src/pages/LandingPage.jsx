import { Link } from 'react-router-dom'
import { ArrowRight, ClipboardCheck, FileText, Languages, Search, ShieldCheck, User } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'
import SchemeCard from '../components/SchemeCard'
import HeroIllustration from '../components/HeroIllustration'
import { mockSchemes } from '../data/mockSchemes'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'

const steps = [
  { icon: User, title: 'Create Your Profile', text: 'Share basic details such as age, state and occupation.' },
  { icon: ClipboardCheck, title: 'Answer a Few Questions', text: 'A short questionnaire replaces hunting across many websites.' },
  { icon: Search, title: 'Discover Matching Schemes', text: 'See programmes that may be relevant — never an official approval.' },
  { icon: ShieldCheck, title: 'Apply Through the Official Portal', text: 'We send you to the government or authorised site to apply.' },
]

const why = [
  { icon: Search, title: 'Personalized Discovery', text: 'Filter schemes using a simple citizen profile instead of ministry jargon.' },
  { icon: ClipboardCheck, title: 'Simple Eligibility Guidance', text: 'Plain-language criteria so you know what to double-check officially.' },
  { icon: FileText, title: 'Document Checklist', text: 'Tick papers you already have before you visit a portal or office.' },
  { icon: Languages, title: 'Multilingual Assistance', text: 'Switch English, Hindi or Marathi and ask the assistant in simple words.' },
]

export default function LandingPage() {
  const { isAuthenticated } = useAuth()
  const { t } = useLanguage()
  const findTo = isAuthenticated ? '/eligibility' : '/login'
  const featured = mockSchemes.slice(0, 4)

  return (
    <div className="space-y-16">
      <section className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">{t.brand}</p>
          <h1 className="mt-2 font-display text-4xl leading-tight text-navy-900 sm:text-5xl">{t.tagline}</h1>
          <p className="mt-4 max-w-xl text-lg text-ink-600">
            Discover government financial schemes and subsidies that may match your profile — all in one place.
          </p>
          <p className="mt-3 text-sm font-medium text-ink-500">Simple. Accessible. Citizen-focused.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link to={findTo}>
              <Button size="lg" className="w-full sm:w-auto">
                Find Schemes For Me
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/schemes">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Explore Schemes
              </Button>
            </Link>
          </div>
        </div>
        <HeroIllustration />
      </section>

      <section>
        <h2 className="font-display text-3xl text-navy-900">How Scheme Saathi Works</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card key={step.title}>
              <p className="text-xs font-bold uppercase tracking-wide text-teal-700">Step {index + 1}</p>
              <step.icon className="mt-3 h-6 w-6 text-navy-800" />
              <h3 className="mt-2 font-display text-lg text-navy-900">{step.title}</h3>
              <p className="mt-1 text-sm text-ink-600">{step.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl text-navy-900">Why Use Scheme Saathi?</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {why.map((item) => (
            <Card key={item.title} className="flex gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <item.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-lg text-navy-900">{item.title}</h3>
                <p className="mt-1 text-sm text-ink-600">{item.text}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl text-navy-900">Featured schemes</h2>
          <Link to="/schemes" className="text-sm font-semibold text-teal-700 hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">
        Scheme Saathi helps citizens discover and understand government schemes. Eligibility and application decisions are
        made by the respective government authorities.
      </section>
    </div>
  )
}
