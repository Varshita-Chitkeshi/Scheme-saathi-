import DocumentChecklist from '../components/DocumentChecklist'
import Card from '../components/Card'
import { DEFAULT_DOCUMENTS } from '../data/constants'
import { mockSchemes } from '../data/mockSchemes'
import { useAppData } from '../context/AppDataContext'

export default function DocumentsPage() {
  const { documents, toggleDocument, savedIds } = useAppData()
  const savedSchemes = mockSchemes.filter((s) => savedIds.includes(s.id))
  const coreReady = DEFAULT_DOCUMENTS.filter((d) => documents[d.id]).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-navy-900">My Document Checklist</h1>
        <p className="mt-2 text-ink-600">
          Mark papers you already have. This is a personal reminder, not an official verification.
        </p>
      </div>
      <Card className="bg-navy-50">
        <p className="font-display text-2xl text-navy-900">
          {coreReady} of {DEFAULT_DOCUMENTS.length} core documents ready
        </p>
      </Card>
      <DocumentChecklist
        title="Common documents"
        items={DEFAULT_DOCUMENTS}
        checkedMap={documents}
        onToggle={toggleDocument}
      />
      {savedSchemes.map((scheme) => (
        <DocumentChecklist
          key={scheme.id}
          title={`${scheme.name} — extra papers`}
          items={scheme.requiredDocuments.map((label) => ({
            id: `${scheme.id}:${label}`,
            label,
          }))}
          checkedMap={documents}
          onToggle={toggleDocument}
        />
      ))}
      <p className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
        Documents required can vary by scheme. Verify the official requirements before applying.
      </p>
    </div>
  )
}
