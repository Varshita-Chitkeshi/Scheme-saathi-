export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function getProfileCompletion(profile) {
  if (!profile) return 0
  const fields = [
    'fullName',
    'age',
    'gender',
    'state',
    'district',
    'occupation',
    'annualIncome',
    'socialCategory',
    'areaType',
    'disabilityStatus',
    'isStudent',
    'isFarmer',
    'isEntrepreneur',
  ]
  const filled = fields.filter((key) => {
    const value = profile[key]
    return value !== undefined && value !== null && String(value).trim() !== ''
  }).length
  return Math.round((filled / fields.length) * 100)
}

export function scoreScheme(scheme, answers = {}, profile = {}) {
  const merged = { ...profile, ...answers }
  let score = 1
  const reasons = []

  if (scheme.state === 'All India' || scheme.state === merged.state) {
    score += 2
    reasons.push('Available in your selected state / nationally')
  }

  if (merged.occupation && scheme.occupations?.includes(merged.occupation)) {
    score += 3
    reasons.push('Occupation overlap with this scheme’s typical audience')
  }

  const groups = scheme.targetGroups || []
  if (merged.isStudent === 'Yes' && groups.includes('Students')) {
    score += 3
    reasons.push('Student-related scheme')
  }
  if (merged.isFarmer === 'Yes' && groups.includes('Farmers')) {
    score += 3
    reasons.push('Farmer-related scheme')
  }
  if (
    (merged.isEntrepreneur === 'Yes' ||
      merged.occupation === 'Entrepreneur' ||
      merged.occupation === 'Self-employed') &&
    groups.includes('Entrepreneurs')
  ) {
    score += 3
    reasons.push('Enterprise / self-employment related')
  }
  if (merged.gender === 'Female' && groups.includes('Women')) {
    score += 2
    reasons.push('Includes women as a target group')
  }
  if (merged.areaType === 'Urban' && scheme.category === 'Housing') {
    score += 1
  }
  if (merged.areaType === 'Rural' && scheme.category === 'Agriculture') {
    score += 1
  }

  let label = 'Based on your profile'
  if (score >= 7) label = 'Potential Match'
  else if (score >= 4) label = 'May be applicable'

  return { score, label, reasons: reasons.slice(0, 3) }
}

export function rankSchemes(schemes, answers, profile) {
  return [...schemes]
    .map((scheme) => ({ scheme, match: scoreScheme(scheme, answers, profile) }))
    .sort((a, b) => b.match.score - a.match.score)
}

export function generateMockAiReply({ message, schemes, language, focusedScheme }) {
  const text = (message || '').toLowerCase()
  const intro =
    language === 'hi'
      ? 'यह सामान्य स्पष्टीकरण है, आधिकारिक निर्णय नहीं।'
      : language === 'mr'
        ? 'ही सामान्य समजावणी आहे, अधिकृत निर्णय नाही.'
        : 'This is a general explanation, not an official decision.'

  if (focusedScheme && (text.includes('explain') || text.includes('simply') || text.includes('this scheme'))) {
    return [
      `From the Scheme Saathi database: ${focusedScheme.name} is listed under ${focusedScheme.category}.`,
      focusedScheme.shortDescription,
      `General explanation: ${focusedScheme.description}`,
      `Required documents in our records: ${focusedScheme.requiredDocuments.join(', ')}.`,
      focusedScheme.officialUrlVerified
        ? `Apply only on the official portal: ${focusedScheme.officialUrl}`
        : 'I could not attach a verified apply link. Please check the official government portal.',
      intro,
    ].join('\n\n')
  }

  if (text.includes('document')) {
    const names = schemes.slice(0, 4).map((s) => `${s.name}: ${s.requiredDocuments.slice(0, 3).join(', ')}`)
    return [
      'From the Scheme Saathi database, common documents include Aadhaar, bank details and scheme-specific certificates.',
      names.join('\n'),
      'General explanation: exact lists vary. Verify on the official portal before you apply.',
      intro,
    ].join('\n\n')
  }

  if (text.includes('apply') || text.includes('how do i')) {
    return [
      'From the Scheme Saathi database: every scheme card includes an official apply path when we have a verified URL.',
      'General explanation: Scheme Saathi never submits applications. Use only government or authorised bank/post office channels.',
      intro,
    ].join('\n\n')
  }

  if (text.includes('marathi') || text.includes('मराठी') || language === 'mr') {
    return [
      'स्कीम साथी डेटाबेसमधील माहिती: आम्ही फक्त नोंदवलेल्या योजनांचे सार देतो.',
      'सामान्य समजावणी: अर्ज फक्त अधिकृत शासकीय संकेतस्थळावर करा. योजना साठी अधिकृत पात्रता ठरवत नाही.',
      intro,
    ].join('\n\n')
  }

  if (text.includes('hindi') || text.includes('हिंदी') || language === 'hi') {
    return [
      'स्कीम साथी डेटाबेस से: हम केवल सूचीबद्ध योजनाओं का सार बताते हैं।',
      'सामान्य व्याख्या: आवेदन केवल आधिकारिक सरकारी पोर्टल पर करें। यह साइट पात्रता प्रमाणित नहीं करती।',
      intro,
    ].join('\n\n')
  }

  if (text.includes('relevant') || text.includes('for me') || text.includes('eligible')) {
    const top = schemes.slice(0, 5).map((s) => `• ${s.name} (${s.category})`)
    return [
      'From the Scheme Saathi database, these listed schemes are often relevant to similar profiles:',
      top.join('\n'),
      'General explanation: “may be relevant” is not official eligibility. Authorities decide after you apply on their portal.',
      intro,
    ].join('\n\n')
  }

  const found = schemes.find((s) => text.includes(s.name.toLowerCase().split('(')[0].trim().slice(0, 12).toLowerCase()))
  if (found) {
    return [
      `From the Scheme Saathi database: ${found.name} — ${found.shortDescription}`,
      `Who may be eligible (our summary): ${found.eligibilityCriteria[0]}`,
      found.officialUrlVerified
        ? `Official portal: ${found.officialUrl}`
        : "I couldn't verify that information. Please check the official government portal.",
      intro,
    ].join('\n\n')
  }

  if (text.includes('pm-kisan') || text.includes('kisan')) {
    const kisan = schemes.find((s) => s.id === 'pm-kisan')
    if (kisan) {
      return [
        `From the Scheme Saathi database: ${kisan.shortDescription}`,
        `Official portal: ${kisan.officialUrl}`,
        intro,
      ].join('\n\n')
    }
  }

  return [
    "I couldn't verify that information. Please check the official government portal.",
    'I can only explain schemes that exist in the Scheme Saathi directory. Try asking about a listed scheme, documents, or how to apply.',
    intro,
  ].join('\n\n')
}
