function toSchemeDto(doc) {
  if (!doc) return null
  const obj = typeof doc.toObject === 'function' ? doc.toObject() : doc
  return {
    id: obj.slug,
    slug: obj.slug,
    name: obj.name,
    category: obj.category,
    shortDescription: obj.shortDescription,
    description: obj.description,
    overview: obj.description,
    benefit: Array.isArray(obj.benefits) ? obj.benefits[0] : obj.benefit || '',
    benefits: obj.benefits || [],
    whoCanApply: obj.whoCanApply || obj.eligibilityCriteria || [],
    eligibilityCriteria: obj.eligibilityCriteria || [],
    requiredDocuments: obj.requiredDocuments || [],
    applicationProcess: obj.applicationSteps || obj.applicationProcess || [],
    applicationSteps: obj.applicationSteps || [],
    officialUrl: obj.officialUrl || obj.officialWebsite || '',
    officialWebsite: obj.officialUrl || obj.officialWebsite || '',
    officialUrlVerified: Boolean(obj.officialUrlVerified && (obj.officialUrl || obj.officialWebsite)),
    lastVerifiedDate: obj.lastVerifiedDate || '',
    state: obj.state || 'All India',
    eligibleStates: obj.eligibleStates || [obj.state || 'All India'],
    targetGroups: obj.targetGroups || [],
    occupations: obj.occupations || obj.eligibleOccupations || [],
    eligibleOccupations: obj.occupations || obj.eligibleOccupations || [],
    incomeHint: obj.incomeHint || '',
    incomeLimit: obj.incomeLimit || '',
    minimumAge: obj.minimumAge ?? null,
    maximumAge: obj.maximumAge ?? null,
    importantInformation: obj.importantInformation || [],
    isActive: obj.isActive !== false,
  }
}

module.exports = { toSchemeDto }
