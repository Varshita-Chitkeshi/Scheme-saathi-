import { Link } from 'react-router-dom'
import { LogoMark } from './HeroIllustration'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <LogoMark />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-600">
            A citizen guide to discovering government financial schemes and subsidies. Not an official application portal.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">Explore</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link className="text-navy-800 hover:underline" to="/schemes">
                Explore Schemes
              </Link>
            </li>
            <li>
              <Link className="text-navy-800 hover:underline" to="/eligibility">
                Find Schemes For Me
              </Link>
            </li>
            <li>
              <Link className="text-navy-800 hover:underline" to="/assistant">
                AI Assistant
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">About</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-600">
            <li>About</li>
            <li>Contact</li>
            <li>Privacy</li>
            <li>Disclaimer</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-100 px-4 py-4 text-center text-xs text-ink-500">
        Scheme Saathi helps citizens discover and understand government schemes. Eligibility and application decisions are
        made by the respective government authorities.
      </div>
    </footer>
  )
}
