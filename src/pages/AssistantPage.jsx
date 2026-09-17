import { useLocation } from 'react-router-dom'
import AIChatBox from '../components/AIChatBox'
import { mockSchemes } from '../data/mockSchemes'

export default function AssistantPage() {
  const location = useLocation()
  const scheme = mockSchemes.find((s) => s.id === location.state?.schemeId) || null

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-3xl text-navy-900">Scheme Saathi Assistant</h1>
        <p className="mt-2 text-ink-600">Ask questions about government schemes in simple language.</p>
        {scheme && (
          <p className="mt-2 text-sm font-medium text-teal-800">Currently focused on: {scheme.name}</p>
        )}
      </div>
      <AIChatBox scheme={scheme} />
    </div>
  )
}
