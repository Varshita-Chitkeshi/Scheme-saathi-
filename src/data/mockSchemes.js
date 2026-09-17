/**
 * Mock scheme directory for the frontend MVP.
 * officialUrl values point only to known public government / official portals.
 * Unverified links are omitted and marked with officialUrlVerified: false.
 */
export const mockSchemes = [
  {
    id: 'pm-kisan',
    name: 'PM-KISAN',
    category: 'Agriculture',
    shortDescription:
      'Income support for eligible landholding farmer families through Direct Benefit Transfer.',
    description:
      'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a Central Sector Scheme that provides income support to eligible landholding farmer families. Installments are credited to registered bank accounts after verification by the concerned authorities.',
    benefits: [
      'Financial assistance of ₹6,000 per year, typically in three installments',
      'Direct transfer to the beneficiary bank account',
      'Central government scheme available across states, subject to eligibility',
    ],
    eligibilityCriteria: [
      'Landholding farmer family as defined by the scheme guidelines',
      'Name in land records as required by the state / implementing agency',
      'Exclusions apply for certain income-tax payers and institutional landholders — verify on the official portal',
    ],
    requiredDocuments: [
      'Aadhaar',
      'Land records',
      'Bank account details',
      'Address proof',
    ],
    applicationSteps: [
      'Visit the official PM-KISAN portal',
      'Check your status or complete farmer registration as guided by your state',
      'Ensure Aadhaar and bank details are seeded as required',
      'Follow instructions from the local agriculture / revenue office if additional verification is needed',
    ],
    officialUrl: 'https://pmkisan.gov.in/',
    officialUrlVerified: true,
    lastVerifiedDate: '2026-09-01',
    state: 'All India',
    targetGroups: ['Farmers', 'Families'],
    occupations: ['Farmer'],
    incomeHint: 'Typically aimed at eligible farmer families; confirm exclusions on the official portal',
    importantInformation: [
      'Scheme Saathi cannot confirm official eligibility. Final decisions are made by government authorities.',
      'Installment amounts and payment calendars can change. Always verify on the official portal.',
    ],
  },
  {
    id: 'nsp-scholarships',
    name: 'National Scholarship Portal schemes',
    category: 'Education',
    shortDescription:
      'A common portal for students to discover and apply for multiple central and state scholarships.',
    description:
      'The National Scholarship Portal (NSP) is a government platform that lists several scholarship schemes for eligible students. Each scheme has its own eligibility, documents and timelines. Scheme Saathi points you to the portal; it does not replace the official application.',
    benefits: [
      'Single window to browse multiple scholarship schemes',
      'Digital application and tracking on the official portal',
      'Support for eligible students across categories, as defined by each scheme',
    ],
    eligibilityCriteria: [
      'Varies by individual scholarship listed on NSP',
      'Typically includes student status, income ceiling, course and category conditions',
      'Check the specific scheme page on scholarships.gov.in before applying',
    ],
    requiredDocuments: [
      'Aadhaar',
      'Educational certificates / mark sheets',
      'Income certificate',
      'Bank account details',
      'Caste certificate where applicable',
    ],
    applicationSteps: [
      'Open the National Scholarship Portal',
      'Register or log in as a student',
      'Search schemes that match your course and category',
      'Apply only through the official portal and track status there',
    ],
    officialUrl: 'https://scholarships.gov.in/',
    officialUrlVerified: true,
    lastVerifiedDate: '2026-09-01',
    state: 'All India',
    targetGroups: ['Students'],
    occupations: ['Student'],
    incomeHint: 'Income ceilings differ by scholarship — verify on NSP',
    importantInformation: [
      'Deadlines and scheme lists change every academic cycle.',
      'Scheme Saathi does not submit scholarship applications on your behalf.',
    ],
  },
  {
    id: 'pmay-urban',
    name: 'Pradhan Mantri Awas Yojana — Urban (PMAY-U)',
    category: 'Housing',
    shortDescription:
      'Housing assistance programme for eligible urban households, implemented through official government channels.',
    description:
      'PMAY-Urban is a Government of India mission that supports eligible urban families in accessing housing assistance as per notified guidelines. Benefits, verticals and eligibility are determined by the Ministry of Housing and Urban Affairs and state implementing agencies.',
    benefits: [
      'Housing-related assistance for eligible urban beneficiaries under notified verticals',
      'Support is defined by official guidelines, not by this website',
    ],
    eligibilityCriteria: [
      'Urban household meeting the mission’s beneficiary definition',
      'Income and ownership conditions as notified for the relevant vertical',
      'Verify current eligibility on the official PMAY-U portal',
    ],
    requiredDocuments: [
      'Aadhaar',
      'Income proof',
      'Address / residence proof',
      'Bank account details',
      'Photograph',
    ],
    applicationSteps: [
      'Visit the official PMAY-U MIS / citizen portal',
      'Search or apply as instructed for your city / state',
      'Submit documents only through official channels',
      'Track application status on the government portal',
    ],
    officialUrl: 'https://pmaymis.gov.in/',
    officialUrlVerified: true,
    lastVerifiedDate: '2026-09-01',
    state: 'All India',
    targetGroups: ['Families'],
    occupations: ['Salaried Employee', 'Self-employed', 'Unemployed', 'Other'],
    incomeHint: 'Income slabs depend on the PMAY vertical — check the official site',
    importantInformation: [
      'Do not pay agents who claim guaranteed allotment.',
      'Only government portals and authorised ULBs process applications.',
    ],
  },
  {
    id: 'mudra',
    name: 'Pradhan Mantri MUDRA Yojana (PMMY)',
    category: 'Entrepreneurship',
    shortDescription:
      'Collateral-free loans for eligible non-corporate, non-farm micro enterprises, through banks and NBFCs.',
    description:
      'PMMY provides refinance support so member lending institutions can extend loans under Shishu, Kishore and Tarun categories to eligible micro businesses. Sanction is decided by the lending institution, not by Scheme Saathi.',
    benefits: [
      'Access to MUDRA loan products (Shishu, Kishore, Tarun) as offered by participating lenders',
      'Intended for income-generating micro enterprises in manufacturing, trading and services',
    ],
    eligibilityCriteria: [
      'Non-corporate, non-farm small / micro enterprise as defined by PMMY',
      'Credit decision rests with the bank / NBFC / MFI',
      'Meet lender KYC and repayment capacity checks',
    ],
    requiredDocuments: [
      'Identity and address proof',
      'Business proof / activity details',
      'Bank account details',
      'Photographs',
      'Other papers required by the lender',
    ],
    applicationSteps: [
      'Read about PMMY on the official MUDRA website',
      'Approach a participating bank, small finance bank, NBFC or MFI',
      'Submit the loan application and documents to the lender',
      'The lender communicates sanction or rejection',
    ],
    officialUrl: 'https://www.mudra.org.in/',
    officialUrlVerified: true,
    lastVerifiedDate: '2026-09-01',
    state: 'All India',
    targetGroups: ['Entrepreneurs'],
    occupations: ['Entrepreneur', 'Self-employed', 'Artisan'],
    incomeHint: 'Loan size depends on the MUDRA category and lender assessment',
    importantInformation: [
      'Scheme Saathi does not process loans or guarantee sanction.',
      'Beware of anyone asking for a fee to “approve” a MUDRA loan.',
    ],
  },
  {
    id: 'standup-india',
    name: 'Stand-Up India',
    category: 'Entrepreneurship',
    shortDescription:
      'Bank loans for eligible SC/ST and women entrepreneurs setting up a greenfield enterprise.',
    description:
      'Stand-Up India facilitates bank loans between ₹10 lakh and ₹1 crore to at least one Scheduled Caste or Scheduled Tribe borrower and at least one woman borrower per bank branch for setting up a greenfield enterprise. Final sanction is by the bank.',
    benefits: [
      'Composite loan for eligible greenfield enterprises, as per scheme guidelines',
      'Handholding support may be available through connected portals and banks',
    ],
    eligibilityCriteria: [
      'SC / ST and / or woman entrepreneur as defined by the scheme',
      'Greenfield enterprise in manufacturing, services or the trading sector (as notified)',
      'Meet bank credit norms',
    ],
    requiredDocuments: [
      'Identity and address proof',
      'Category certificate where applicable',
      'Project / business plan',
      'Bank account details',
    ],
    applicationSteps: [
      'Review the scheme on the official Stand-Up India portal',
      'Register / apply online or through a bank branch',
      'Complete bank due diligence',
      'Track status only through official bank / portal channels',
    ],
    officialUrl: 'https://www.standupmitra.in/',
    officialUrlVerified: true,
    lastVerifiedDate: '2026-09-01',
    state: 'All India',
    targetGroups: ['Entrepreneurs', 'Women'],
    occupations: ['Entrepreneur', 'Self-employed'],
    incomeHint: 'Credit size is determined by the bank within scheme limits',
    importantInformation: [
      'Potential match on this site is not a bank approval.',
    ],
  },
  {
    id: 'pm-svanidhi',
    name: 'PM Street Vendor’s AtmaNirbhar Nidhi (PM SVANidhi)',
    category: 'Financial Assistance',
    shortDescription:
      'Working-capital support for eligible street vendors through a Government of India scheme.',
    description:
      'PM SVANidhi is a micro-credit scheme for identified street vendors to access affordable working capital. Eligibility, loan amount and repayment terms are governed by official guidelines and participating lending institutions.',
    benefits: [
      'Working-capital loan facility for eligible street vendors, as notified',
      'Interest subsidy / digital incentives may apply as per current guidelines — verify officially',
    ],
    eligibilityCriteria: [
      'Street vendor identified / eligible as per scheme rules and ULB processes',
      'Must meet lender KYC requirements',
    ],
    requiredDocuments: [
      'Identity proof',
      'Vendor identification / Letter of Recommendation as applicable',
      'Bank account details',
    ],
    applicationSteps: [
      'Open the official PM SVANidhi portal',
      'Follow the citizen / vendor application path for your city',
      'Complete lending-institution steps if prompted',
    ],
    officialUrl: 'https://pmsvanidhi.mohua.gov.in/',
    officialUrlVerified: true,
    lastVerifiedDate: '2026-09-01',
    state: 'All India',
    targetGroups: ['Street vendors', 'Entrepreneurs'],
    occupations: ['Self-employed', 'Entrepreneur', 'Other'],
    incomeHint: 'Designed as working-capital support; not an income-guarantee scheme',
    importantInformation: [
      'ULB and lender verification is mandatory.',
    ],
  },
  {
    id: 'pm-jay',
    name: 'Ayushman Bharat — PM-JAY',
    category: 'Social Security',
    shortDescription:
      'Health assurance scheme for eligible families, administered by the National Health Authority.',
    description:
      'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY) provides health cover to eligible families as identified through official databases and state processes. Entitlements, empanelled hospitals and claim rules are defined by NHA and states.',
    benefits: [
      'Health cover for eligible families up to the amount notified by the Government of India',
      'Cashless treatment at empanelled hospitals, subject to scheme rules',
    ],
    eligibilityCriteria: [
      'Family identified as eligible in official SECC / state beneficiary lists, or as notified by the state',
      'Eligibility cannot be self-declared on Scheme Saathi',
    ],
    requiredDocuments: [
      'Aadhaar or other accepted ID',
      'Ration card / family ID where used by the state',
      'PM-JAY e-card if already issued',
    ],
    applicationSteps: [
      'Check eligibility on the official NHA / PM-JAY beneficiary portals',
      'Visit an empanelled hospital or authorised kiosk if you need a card',
      'Do not share OTP or pay anyone promising a “fast card”',
    ],
    officialUrl: 'https://nha.gov.in/',
    officialUrlVerified: true,
    lastVerifiedDate: '2026-09-01',
    state: 'All India',
    targetGroups: ['Families', 'Workers'],
    occupations: ['Farmer', 'Unemployed', 'Salaried Employee', 'Self-employed', 'Other'],
    incomeHint: 'Based on official beneficiary identification, not a self-reported income form on this site',
    importantInformation: [
      'Hospital empanelment and package rates are published by NHA / states.',
    ],
  },
  {
    id: 'pm-vishwakarma',
    name: 'PM Vishwakarma',
    category: 'Employment',
    shortDescription:
      'Support scheme for traditional artisans and craftspeople recognised under PM Vishwakarma.',
    description:
      'PM Vishwakarma is a Central scheme for artisans and craftspeople in notified trades. It may include recognition, skill training, toolkit incentive and credit support as per official guidelines. Enrolment and benefits are processed only through government systems.',
    benefits: [
      'Recognition as a Vishwakarma artisan, where approved',
      'Skill training, toolkit support and credit components as notified — confirm current benefits on the official site',
    ],
    eligibilityCriteria: [
      'Artisan / craftsperson in a notified trade',
      'Must meet age, Aadhaar and other conditions in the scheme guidelines',
      'Family / duplication rules apply as notified',
    ],
    requiredDocuments: [
      'Aadhaar',
      'Bank account details',
      'Photograph',
      'Proof of trade / activity as required',
    ],
    applicationSteps: [
      'Visit the official PM Vishwakarma portal',
      'Complete registration if the window is open',
      'Follow verification by the implementing department',
    ],
    officialUrl: 'https://pmvishwakarma.gov.in/',
    officialUrlVerified: true,
    lastVerifiedDate: '2026-09-01',
    state: 'All India',
    targetGroups: ['Artisans'],
    occupations: ['Artisan', 'Self-employed'],
    incomeHint: 'Targeted at traditional artisans; income rules are in official guidelines',
    importantInformation: [
      'Registration windows and trades list can change. Use only the official portal.',
    ],
  },
  {
    id: 'ncs',
    name: 'National Career Service (NCS)',
    category: 'Employment',
    shortDescription:
      'Government career platform for job search, counselling and employability services.',
    description:
      'National Career Service is a Government of India portal that connects job seekers with vacancies, career counselling and related services. It is not a cash subsidy, but it is an official employment-support service many citizens can use.',
    benefits: [
      'Job listings from participating employers',
      'Career guidance and employability-related services as offered on the portal',
    ],
    eligibilityCriteria: [
      'Job seekers and employers who complete official registration',
      'Specific programmes listed on NCS may have extra criteria',
    ],
    requiredDocuments: [
      'Identity proof for registration',
      'Educational / experience details as required by employers',
    ],
    applicationSteps: [
      'Open the National Career Service portal',
      'Register as a job seeker',
      'Complete your profile and search vacancies',
    ],
    officialUrl: 'https://www.ncs.gov.in/',
    officialUrlVerified: true,
    lastVerifiedDate: '2026-09-01',
    state: 'All India',
    targetGroups: ['Workers', 'Students'],
    occupations: ['Unemployed', 'Student', 'Salaried Employee', 'Other'],
    incomeHint: 'Service platform — not an income-transfer scheme',
    importantInformation: [
      'Never pay a private agent claiming an NCS “government job guarantee”.',
    ],
  },
  {
    id: 'myscheme',
    name: 'myScheme — official scheme discovery',
    category: 'Financial Assistance',
    shortDescription:
      'National government portal to search schemes by eligibility and category.',
    description:
      'myScheme is an official Government of India discovery platform that lists schemes from central and state governments. Use it to cross-check information you see on Scheme Saathi and to find additional programmes.',
    benefits: [
      'Searchable directory of government schemes',
      'Eligibility-based browsing on the official site',
    ],
    eligibilityCriteria: [
      'Not a benefit scheme itself — it is a discovery portal',
      'Each listed scheme has its own rules',
    ],
    requiredDocuments: [
      'Depends on the individual scheme you open on myScheme',
    ],
    applicationSteps: [
      'Visit myscheme.gov.in',
      'Filter by category, ministry or eligibility',
      'Open the scheme page and follow its official apply link',
    ],
    officialUrl: 'https://www.myscheme.gov.in/',
    officialUrlVerified: true,
    lastVerifiedDate: '2026-09-01',
    state: 'All India',
    targetGroups: ['Families', 'Students', 'Farmers', 'Entrepreneurs', 'Workers', 'Women'],
    occupations: ['Student', 'Farmer', 'Entrepreneur', 'Salaried Employee', 'Self-employed', 'Artisan', 'Unemployed', 'Other'],
    incomeHint: 'Portal only — income rules belong to each listed scheme',
    importantInformation: [
      'Prefer myScheme and ministry websites for the latest official wording.',
    ],
  },
  {
    id: 'sukanya-demo',
    name: 'Sukanya Samriddhi Yojana (information page)',
    category: 'Women & Family',
    shortDescription:
      'Small savings scheme for a girl child, offered through authorised banks and post offices.',
    description:
      'Sukanya Samriddhi Yojana is a government small-savings scheme for the girl child. Accounts are opened at authorised banks and India Post. Scheme Saathi provides an overview only. Interest rates and rules are notified by the Government of India from time to time.',
    benefits: [
      'Deposit scheme for a girl child, with tax treatment as notified',
      'Interest rate is set by the government and can change',
    ],
    eligibilityCriteria: [
      'Girl child meeting age and account-limit rules in official notifications',
      'Opened by the guardian at an authorised bank or post office',
    ],
    requiredDocuments: [
      'Birth certificate of the girl child',
      'Identity and address proof of the guardian',
      'Photograph',
    ],
    applicationSteps: [
      'Read the latest rules on an official India Post / authorised bank / nsiindia page',
      'Visit a bank branch or post office — do not apply on unofficial websites',
    ],
    officialUrl: '',
    officialUrlVerified: false,
    lastVerifiedDate: '2026-09-01',
    state: 'All India',
    targetGroups: ['Women', 'Families'],
    occupations: ['Homemaker', 'Salaried Employee', 'Self-employed', 'Other'],
    incomeHint: 'Savings scheme; contribution limits are notified officially',
    importantInformation: [
      'Official apply URL is not embedded here because product pages differ by bank and India Post.',
      'Use a nationalised bank, authorised private bank, or India Post counter. Do not use third-party “apply now” sites.',
    ],
  },
]
