import { Link } from 'react-router-dom'

export default function HeroIllustration() {
  return (
    <svg viewBox="0 0 520 380" className="h-auto w-full" role="img" aria-labelledby="hero-art-title">
      <title id="hero-art-title">Citizen profile matching to government schemes</title>
      <rect width="520" height="380" rx="28" fill="#EEF5F9" />
      <rect x="32" y="48" width="140" height="180" rx="18" fill="#fff" stroke="#D5E6F0" />
      <circle cx="102" cy="108" r="28" fill="#0D7377" />
      <rect x="58" y="150" width="88" height="10" rx="5" fill="#ADCDE0" />
      <rect x="70" y="168" width="64" height="8" rx="4" fill="#E8F4F4" />
      <text x="102" y="210" textAnchor="middle" fontSize="12" fill="#0B3D5C" fontFamily="Noto Sans">
        Citizen
      </text>

      <rect x="190" y="88" width="140" height="140" rx="18" fill="#fff" stroke="#D5E6F0" />
      <rect x="210" y="112" width="100" height="10" rx="5" fill="#0D7377" />
      <rect x="210" y="132" width="80" height="8" rx="4" fill="#ADCDE0" />
      <rect x="210" y="148" width="90" height="8" rx="4" fill="#ADCDE0" />
      <rect x="210" y="164" width="70" height="8" rx="4" fill="#ADCDE0" />
      <text x="260" y="208" textAnchor="middle" fontSize="12" fill="#0B3D5C" fontFamily="Noto Sans">
        Profile
      </text>

      <rect x="348" y="48" width="140" height="180" rx="18" fill="#0B3D5C" />
      <rect x="368" y="78" width="100" height="12" rx="6" fill="#E8F4F4" />
      <rect x="368" y="104" width="84" height="8" rx="4" fill="#14919B" />
      <rect x="368" y="122" width="92" height="8" rx="4" fill="#14919B" />
      <rect x="368" y="148" width="100" height="36" rx="10" fill="#0D7377" />
      <text x="418" y="250" textAnchor="middle" fontSize="12" fill="#0B3D5C" fontFamily="Noto Sans">
        Matching
      </text>

      <rect x="120" y="268" width="280" height="72" rx="16" fill="#fff" stroke="#ADCDE0" />
      <rect x="140" y="288" width="36" height="32" rx="8" fill="#0D7377" />
      <text x="192" y="300" fontSize="13" fill="#0B3D5C" fontFamily="Source Serif 4">
        Government scheme
      </text>
      <text x="192" y="320" fontSize="11" fill="#475569" fontFamily="Noto Sans">
        Official portal — not this website
      </text>
    </svg>
  )
}

export function LogoMark({ className = 'h-8 w-8' }) {
  return (
    <Link to="/" className="flex items-center gap-2 font-display text-lg text-navy-900 sm:text-xl">
      <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#0B3D5C" />
        <path
          d="M8 22V10h6.2c2.6 0 4.3 1.5 4.3 3.8 0 1.5-.8 2.6-2.1 3.2 1.6.5 2.6 1.8 2.6 3.5 0 2.5-1.9 4.5-5 4.5H8zm2.7-7.2h3.2c1.3 0 2-.6 2-1.6s-.7-1.5-2-1.5h-3.2v3.1zm0 5.4h3.6c1.5 0 2.3-.7 2.3-1.8s-.8-1.7-2.4-1.7h-3.5v3.5z"
          fill="#E8F4F4"
        />
        <circle cx="23.5" cy="10.5" r="2.5" fill="#0D7377" />
      </svg>
      Scheme Saathi
    </Link>
  )
}
