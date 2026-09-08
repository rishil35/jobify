// ─── External Links ───
export const LINKS = {
  WHATSAPP: 'https://wa.me/917207240653',
  LINKEDIN_COMPANY: 'https://www.linkedin.com/company/jobify-jobs',
  LINKEDIN_CAREER: 'https://www.linkedin.com/company/jobify-jobs/?viewAsMember=true',
  INSTAGRAM: 'https://www.instagram.com/jobify.jobs/',
  FACEBOOK: 'https://www.facebook.com/jobify.jobs/',
};

// ─── Navigation Items ───
export const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About Us', href: '#about' },
];

// ─── Pricing Data ───
export const PRICING_DATA = [
  {
    id: 'ats-resume',
    title: 'ATS\nResume',
    oldPrice: '₹499',
    price: '₹390',
    featuresLabel: 'Features:',
    features: [
      'ATS-friendly format',
      'Role-specific keywords',
      'Professionally written',
      '3 free revisions',
    ],
    cta: 'Get Started',
    ctaMessage: "Hi Jobify, I'm interested in the ATS Resume service.",
  },
  {
    id: 'linkedin-naukri',
    title: 'Linkedin / Naukri\nOptimisation',
    price: '₹950',
    featuresLabel: 'Features:',
    features: [
      'Profile rewrite',
      'Recruiter visibility',
      'Personal branding',
      'Keyword optimisation',
    ],
    cta: 'Get Started',
    ctaMessage: "Hi Jobify, I'm interested in the LinkedIn/Naukri Optimisation service.",
  },
  {
    id: 'portfolio',
    title: 'Personal\nPortfolio',
    price: '₹2500',
    featuresLabel: 'Features:',
    features: [
      'Personal portfolio website',
      'Mobile-friendly design',
      'Projects & experience',
      'Customised to your profile',
    ],
    cta: 'Get Started',
    ctaMessage: "Hi Jobify, I'm interested in the Personal Portfolio service.",
  },
  {
    id: 'job-applications',
    title: 'Job\nApplications',
    price: '₹20 / Per job',
    note: '*Minimum 250 applications',
    featuresLabel: 'Features:',
    features: [
      'Approved jobs only',
      'Dedicated career consultant',
      'Resume & cover letter preparation',
    ],
    cta: 'Book a Call',
    ctaMessage: "Hi Jobify, I'm interested in the Job Applications service.",
  },
];

// ─── FAQ Data ───
export const FAQ_DATA = [
  {
    question: 'Who are we, and how can we help with your job search?',
    answer:
      'JOBIFY is a team of career-support professionals helping job seekers become job-ready and move faster through their search. We create ATS-friendly resumes tailored to your role and target market, optimise LinkedIn/Naukri profiles, build personal portfolios, prepare cover letters, and can also apply to approved jobs on your behalf.',
  },
  {
    question: 'How do you create an ATS-friendly resume for me?',
    answer:
      'We build your resume around your target role, relevant keywords, clear section structure, and ATS-readable formatting. The goal is to make your experience easy for both applicant tracking systems and recruiters to understand, while keeping the resume specific to the roles and locations you are targeting.',
  },
  {
    question: 'How does your job application service work?',
    answer:
      'We first understand the roles, locations, and preferences you want to target. We then identify relevant opportunities for you to approve, and our team handles the applications on your behalf. The service starts from a minimum of 250 approved applications and is priced at ₹20 per application.',
  },
  {
    question: 'Can you help me apply for jobs outside my country?',
    answer:
      'Yes. JOBIFY supports job seekers targeting opportunities across different countries. We can tailor your resume and profile around the role and target market, and our job-application service can be aligned with the locations you want to pursue.',
  },
  {
    question: 'Do you guarantee interviews or a job?',
    answer:
      'No. Final hiring decisions are made by employers, so we do not guarantee interviews or job offers. What we do is improve your resume and profile, strengthen how you present your experience, and help you execute a more consistent and targeted job search.',
  },
];

// ─── Footer Link Map ───
export const FOOTER_LINKS = {
  company: [
    { label: 'Home', href: '#home', internal: true },
    { label: 'Pricing', href: '#pricing', internal: true },
    { label: 'Career', href: LINKS.LINKEDIN_CAREER, internal: false },
  ],
  documentation: [
    { label: 'Contact', href: LINKS.WHATSAPP, internal: false },
    { label: 'FAQ', href: '#about', internal: true },
    { label: 'Privacy Policy', href: '/privacy', internal: true },
  ],
  social: [
    { label: 'Facebook', href: LINKS.FACEBOOK, internal: false },
    { label: 'Instagram', href: LINKS.INSTAGRAM, internal: false },
    { label: 'Linkedin', href: LINKS.LINKEDIN_COMPANY, internal: false },
  ],
};

// ─── Trusted Logos ───
export const TRUSTED_LOGOS = [
  { src: '/assets/trusted-logos/Logo 1.png', alt: 'Trusted Company 1' },
  { src: '/assets/trusted-logos/Logo 2.png', alt: 'Trusted Company 2' },
  { src: '/assets/trusted-logos/Logo 3.png', alt: 'Trusted Company 3' },
  { src: '/assets/trusted-logos/Logo 4.png', alt: 'Trusted Company 4' },
  { src: '/assets/trusted-logos/Logo5.png', alt: 'Trusted Company 5' },
  { src: '/assets/trusted-logos/Logo6.png', alt: 'Trusted Company 6' },
  { src: '/assets/trusted-logos/Logo7.png', alt: 'Trusted Company 7' },
  { src: '/assets/trusted-logos/Logo8.png', alt: 'Trusted Company 8' },
];

// ─── ATS Constants ───
export const ATS_SCORE_CAP = 70;
export const MAX_UPLOAD_SIZE = 10 * 1024 * 1024; // 10 MB
export const ACCEPTED_TYPES = {
  'application/pdf': '.pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
};

// ─── Industry Options ───
export const INDUSTRY_OPTIONS = [
  'Technology',
  'Consulting',
  'Finance',
  'Healthcare',
  'Marketing',
  'Operations',
  'Sustainability',
  'Education',
  'Legal',
  'Retail',
  'Manufacturing',
  'Other',
];

// ─── Experience Levels ───
export const EXPERIENCE_LEVELS = [
  'Student / Fresher',
  '0–2 years',
  '2–4 years',
  '4–7 years',
  '7+ years',
];

// ─── Country Options ───
export const COUNTRY_OPTIONS = [
  'India',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'Singapore',
  'UAE',
  'Netherlands',
  'France',
  'Japan',
  'South Korea',
  'New Zealand',
  'Ireland',
  'Sweden',
  'Switzerland',
  'Multiple countries / Global',
];

// ─── Score Labels ───
export const SCORE_LABELS = {
  '0-30': 'Needs major improvement',
  '31-45': 'Needs improvement',
  '46-60': 'Partially optimised',
  '61-70': 'Good base — further optimisation recommended',
};

export function getScoreLabel(score) {
  if (score <= 30) return SCORE_LABELS['0-30'];
  if (score <= 45) return SCORE_LABELS['31-45'];
  if (score <= 60) return SCORE_LABELS['46-60'];
  return SCORE_LABELS['61-70'];
}
