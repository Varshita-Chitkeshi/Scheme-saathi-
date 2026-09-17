const axios = require('axios')
const Scheme = require('../models/Scheme')
const { toSchemeDto } = require('../utils/schemeMapper')

const UNVERIFIED =
  "I couldn't verify that information. Please check the official government portal."

function providerConfig() {
  const provider = (process.env.AI_PROVIDER || 'openai').toLowerCase()
  const apiKey = process.env.AI_API_KEY
  const model = process.env.AI_MODEL || (provider === 'groq' ? 'llama-3.1-8b-instant' : 'gpt-4o-mini')

  if (provider === 'groq') {
    return {
      provider,
      apiKey,
      model,
      url: 'https://api.groq.com/openai/v1/chat/completions',
    }
  }

  if (provider === 'openai-compatible' && process.env.AI_BASE_URL) {
    return {
      provider,
      apiKey,
      model,
      url: `${process.env.AI_BASE_URL.replace(/\/$/, '')}/chat/completions`,
    }
  }

  return {
    provider: 'openai',
    apiKey,
    model,
    url: 'https://api.openai.com/v1/chat/completions',
  }
}

function formatSchemeBlock(scheme) {
  const dto = toSchemeDto(scheme)
  return [
    `Name: ${dto.name}`,
    `Category: ${dto.category}`,
    `Short description: ${dto.shortDescription}`,
    `Overview: ${dto.description}`,
    `Benefits: ${(dto.benefits || []).join('; ')}`,
    `Eligibility summary: ${(dto.eligibilityCriteria || []).join('; ')}`,
    `Required documents: ${(dto.requiredDocuments || []).join('; ')}`,
    `Application steps: ${(dto.applicationSteps || []).join('; ')}`,
    dto.officialUrlVerified && dto.officialUrl
      ? `Official website (verified in database): ${dto.officialUrl}`
      : 'Official website: not verified in this database — tell the citizen to check the official government portal.',
    `Last verified date in database: ${dto.lastVerifiedDate || 'unknown'}`,
  ].join('\n')
}

function buildSystemPrompt(schemes, focused, language) {
  const directory = schemes.map((s) => `- ${s.name} [${s.slug}] (${s.category})`).join('\n')
  const focusedBlock = focused ? `\n\nFOCUSED SCHEME DETAILS:\n${formatSchemeBlock(focused)}` : ''
  const details = schemes
    .filter((s) => !focused || s.slug !== focused.slug)
    .slice(0, 12)
    .map((s) => formatSchemeBlock(s))
    .join('\n\n---\n\n')

  return `You are Scheme Saathi, a careful citizen assistant for Indian government scheme discovery.

LANGUAGE: Prefer ${language === 'hi' ? 'Hindi' : language === 'mr' ? 'Marathi' : 'English'}. If the user asks for Hindi or Marathi, answer in that language.

HARD RULES:
- Use ONLY the scheme information supplied below from the Scheme Saathi database.
- Do NOT invent government schemes, benefits, eligibility, deadlines, quotas, payment amounts, or official URLs.
- If a fact is not in the database, say exactly: ${UNVERIFIED}
- Never claim the user is approved, guaranteed eligible, or will receive money.
- Potential matches are not official decisions. Authorities decide eligibility.
- Scheme Saathi never submits applications.
- Clearly distinguish:
  1) "From the Scheme Saathi database:" for facts copied from the records below
  2) "General explanation:" for plain-language restatements of those same facts only
- Only share an official URL if it is marked verified in the database.

SCHEME DIRECTORY:
${directory}
${focusedBlock}

OTHER DATABASE RECORDS:
${details}`
}

function groundedFallback({ message, schemes, focused, language }) {
  const text = (message || '').toLowerCase()
  const intro =
    language === 'hi'
      ? 'यह सामान्य स्पष्टीकरण है, आधिकारिक निर्णय नहीं।'
      : language === 'mr'
        ? 'ही सामान्य समजावणी आहे, अधिकृत निर्णय नाही.'
        : 'This is a general explanation, not an official decision.'

  const list = schemes.map(toSchemeDto)
  const focusedDto = focused ? toSchemeDto(focused) : null

  if (focusedDto && (text.includes('explain') || text.includes('simply') || text.includes('this scheme'))) {
    return [
      `From the Scheme Saathi database: ${focusedDto.name} is listed under ${focusedDto.category}.`,
      focusedDto.shortDescription,
      `General explanation: ${focusedDto.description}`,
      `Required documents in our records: ${focusedDto.requiredDocuments.join(', ')}.`,
      focusedDto.officialUrlVerified
        ? `Apply only on the official portal: ${focusedDto.officialUrl}`
        : UNVERIFIED,
      intro,
    ].join('\n\n')
  }

  if (text.includes('document')) {
    const names = list.slice(0, 4).map((s) => `${s.name}: ${s.requiredDocuments.slice(0, 3).join(', ')}`)
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

  if (text.includes('business') || text.includes('mudra') || text.includes('entrepreneur')) {
    const biz = list.filter((s) => s.category === 'Entrepreneurship' || s.occupations.includes('Entrepreneur'))
    if (biz.length) {
      return [
        'From the Scheme Saathi database, these listed schemes are often discussed for enterprise support:',
        biz.map((s) => `• ${s.name} (${s.category})`).join('\n'),
        'General explanation: a bank or ministry decides credit and eligibility. Scheme Saathi only points to listed programmes.',
        intro,
      ].join('\n\n')
    }
  }

  if (text.includes('relevant') || text.includes('for me') || text.includes('eligible')) {
    const top = list.slice(0, 5).map((s) => `• ${s.name} (${s.category})`)
    return [
      'From the Scheme Saathi database, these listed schemes are in the directory:',
      top.join('\n'),
      'General explanation: “may be relevant” is not official eligibility. Authorities decide after you apply on their portal.',
      intro,
    ].join('\n\n')
  }

  const found = list.find((s) => text.includes(s.name.toLowerCase().split('(')[0].trim().slice(0, 12).toLowerCase()))
  if (found) {
    return [
      `From the Scheme Saathi database: ${found.name} — ${found.shortDescription}`,
      `Who may be eligible (our summary): ${found.eligibilityCriteria[0]}`,
      found.officialUrlVerified ? `Official portal: ${found.officialUrl}` : UNVERIFIED,
      intro,
    ].join('\n\n')
  }

  return [UNVERIFIED, 'I can only explain schemes that exist in the Scheme Saathi directory.', intro].join('\n\n')
}

async function chatAboutSchemes({ message, language = 'en', schemeId, profile }) {
  const schemes = await Scheme.find({ isActive: true }).lean()
  if (!schemes.length) {
    return { reply: UNVERIFIED, source: 'database' }
  }

  const focused =
    schemes.find((s) => s.slug === schemeId) ||
    schemes.find((s) => s.slug === (profile && profile.focusedSchemeId)) ||
    null

  const cfg = providerConfig()
  const hasKey = cfg.apiKey && !cfg.apiKey.includes('your_ai_api_key')

  if (!hasKey) {
    return {
      reply: groundedFallback({ message, schemes, focused, language }),
      source: 'database',
    }
  }

  try {
    const response = await axios.post(
      cfg.url,
      {
        model: cfg.model,
        temperature: 0.2,
        messages: [
          { role: 'system', content: buildSystemPrompt(schemes, focused, language) },
          {
            role: 'user',
            content: `Citizen question: ${message}${
              profile && (profile.occupation || profile.state)
                ? `\nCitizen profile (for wording only, not an eligibility decision): occupation=${profile.occupation || ''}, state=${profile.state || ''}, age=${profile.age || ''}`
                : ''
            }`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${cfg.apiKey}`,
          'Content-Type': 'application/json',
        },
        timeout: 20000,
      },
    )

    const reply = response.data?.choices?.[0]?.message?.content?.trim()
    if (!reply) {
      return { reply: UNVERIFIED, source: 'database' }
    }
    return { reply, source: cfg.provider }
  } catch (error) {
    const fallback = groundedFallback({ message, schemes, focused, language })
    const err = new Error(error.response?.data?.error?.message || 'The AI provider could not be reached. Showing a database-backed answer.')
    err.fallbackReply = fallback
    err.status = 502
    throw err
  }
}

module.exports = { chatAboutSchemes, UNVERIFIED }
