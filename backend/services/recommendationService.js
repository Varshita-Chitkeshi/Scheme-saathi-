const { toSchemeDto } = require('../utils/schemeMapper')

function scoreScheme(scheme, answers = {}, profile = {}) {
  const merged = { ...profile, ...answers }
  let score = 0
  const reasons = []

  const state = scheme.state || 'All India'
  const occupations = scheme.occupations || scheme.eligibleOccupations || []
  const groups = scheme.targetGroups || []
  const category = scheme.category || ''

  if (state === 'All India' || (merged.state && (state === merged.state || (scheme.eligibleStates || []).includes(merged.state)))) {
    score += 20
    reasons.push('Available in your selected state / nationally')
  }

  if (merged.occupation && occupations.includes(merged.occupation)) {
    score += 20
    reasons.push('Occupation overlap with this scheme’s typical audience')
  }

  if (merged.isStudent === 'Yes' && (groups.includes('Students') || category === 'Education')) {
    score += 40
    reasons.push('Student-related scheme')
  } else if (merged.isFarmer === 'Yes' && (groups.includes('Farmers') || category === 'Agriculture')) {
    score += 40
    reasons.push('Farmer-related scheme')
  } else if (
    (merged.isEntrepreneur === 'Yes' || merged.occupation === 'Entrepreneur' || merged.occupation === 'Self-employed') &&
    (groups.includes('Entrepreneurs') || category === 'Entrepreneurship')
  ) {
    score += 40
    reasons.push('Enterprise / self-employment related')
  } else if (merged.occupation === 'Artisan' && (groups.includes('Artisans') || category === 'Employment')) {
    score += 40
    reasons.push('Artisan / skill-related scheme')
  } else if (category && merged.occupation) {
    score += 10
  }

  if (merged.gender === 'Female' && groups.includes('Women')) {
    score += 10
    reasons.push('Includes women as a target group')
  }

  if (merged.areaType === 'Urban' && category === 'Housing') {
    score += 10
  }
  if (merged.areaType === 'Rural' && category === 'Agriculture') {
    score += 10
  }

  const age = Number(merged.age)
  if (!Number.isNaN(age) && age > 0) {
    const min = scheme.minimumAge
    const max = scheme.maximumAge
    if ((min == null || age >= min) && (max == null || age <= max)) {
      score += 10
    }
  }

  if (merged.annualIncome || merged.annualIncomeRange) {
    score += 10
  }

  let eligibilityStatus = 'Needs verification'
  let label = 'Needs verification'
  if (score >= 70) {
    eligibilityStatus = 'Potentially eligible'
    label = 'Potentially eligible'
  } else if (score >= 40) {
    eligibilityStatus = 'Matches your profile'
    label = 'Matches your profile'
  }

  return {
    score,
    matchScore: score,
    label,
    eligibilityStatus,
    reasons: reasons.slice(0, 3),
    matchReasons: reasons.slice(0, 3),
  }
}

function rankSchemes(schemes, answers, profile) {
  return schemes
    .map((scheme) => {
      const match = scoreScheme(scheme, answers, profile)
      return {
        scheme: toSchemeDto(scheme),
        match,
        matchScore: match.matchScore,
        matchReasons: match.matchReasons,
        eligibilityStatus: match.eligibilityStatus,
      }
    })
    .sort((a, b) => b.matchScore - a.matchScore)
}

module.exports = { scoreScheme, rankSchemes }
