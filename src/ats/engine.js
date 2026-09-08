import { ATS_SCORE_CAP } from '../constants.js';

// ─── Role Keyword Dictionaries ───
const ROLE_KEYWORDS = {
  'project analyst': {
    keywords: [
      'Project Management', 'Stakeholder Management', 'Excel', 'Reporting',
      'Data Analysis', 'Documentation', 'Process Improvement', 'KPI Tracking',
      'Risk Management', 'Project Planning', 'Agile', 'Power BI',
      'Resource Planning', 'Budget Tracking', 'JIRA', 'Confluence',
    ],
  },
  'project manager': {
    keywords: [
      'Project Management', 'Stakeholder Management', 'Agile', 'Scrum',
      'Risk Management', 'Budget Management', 'Resource Planning', 'Timeline Management',
      'PMP', 'JIRA', 'Confluence', 'MS Project', 'Waterfall', 'Sprint Planning',
      'Change Management', 'Cross-functional',
    ],
  },
  'data analyst': {
    keywords: [
      'Data Analysis', 'SQL', 'Python', 'Excel', 'Tableau', 'Power BI',
      'Data Visualization', 'Statistical Analysis', 'ETL', 'Data Modeling',
      'Reporting', 'Dashboard', 'R', 'Machine Learning', 'Data Cleaning',
      'Business Intelligence',
    ],
  },
  'data scientist': {
    keywords: [
      'Machine Learning', 'Python', 'Deep Learning', 'TensorFlow', 'PyTorch',
      'SQL', 'Statistical Modeling', 'NLP', 'Data Visualization', 'A/B Testing',
      'Feature Engineering', 'Scikit-learn', 'R', 'Big Data', 'Neural Networks',
      'Predictive Modeling',
    ],
  },
  'software engineer': {
    keywords: [
      'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'Git',
      'REST API', 'SQL', 'Agile', 'CI/CD', 'Docker', 'AWS',
      'TypeScript', 'Testing', 'Microservices', 'System Design',
    ],
  },
  'software developer': {
    keywords: [
      'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'Git',
      'REST API', 'SQL', 'Agile', 'CI/CD', 'Docker', 'AWS',
      'TypeScript', 'Testing', 'Object-Oriented', 'Full Stack',
    ],
  },
  'frontend developer': {
    keywords: [
      'JavaScript', 'React', 'CSS', 'HTML', 'TypeScript', 'Vue',
      'Angular', 'Responsive Design', 'Git', 'REST API', 'Webpack',
      'UI/UX', 'Performance Optimization', 'Accessibility', 'Tailwind', 'Figma',
    ],
  },
  'backend developer': {
    keywords: [
      'Node.js', 'Python', 'Java', 'SQL', 'REST API', 'Microservices',
      'Docker', 'AWS', 'MongoDB', 'PostgreSQL', 'Redis', 'CI/CD',
      'Git', 'System Design', 'Kubernetes', 'GraphQL',
    ],
  },
  'product manager': {
    keywords: [
      'Product Strategy', 'Roadmap', 'Agile', 'User Research', 'Stakeholder Management',
      'A/B Testing', 'PRD', 'JIRA', 'Data-Driven', 'Go-to-Market',
      'Cross-functional', 'KPI', 'Product Analytics', 'Customer Discovery',
      'Sprint Planning', 'Prioritization',
    ],
  },
  'business analyst': {
    keywords: [
      'Business Analysis', 'Requirements Gathering', 'SQL', 'Stakeholder Management',
      'Process Improvement', 'Data Analysis', 'JIRA', 'Agile', 'Documentation',
      'Use Cases', 'User Stories', 'Business Intelligence', 'Reporting',
      'Gap Analysis', 'Excel', 'Visio',
    ],
  },
  'marketing manager': {
    keywords: [
      'Digital Marketing', 'SEO', 'Content Strategy', 'Social Media', 'Analytics',
      'Campaign Management', 'Email Marketing', 'Brand Strategy', 'Google Analytics',
      'PPC', 'CRM', 'Marketing Automation', 'Lead Generation', 'ROI',
      'A/B Testing', 'Content Marketing',
    ],
  },
  'ux designer': {
    keywords: [
      'User Research', 'Wireframing', 'Prototyping', 'Figma', 'User Testing',
      'Information Architecture', 'Interaction Design', 'UI Design', 'Sketch',
      'Design Systems', 'Usability', 'Journey Mapping', 'Accessibility',
      'Visual Design', 'Adobe XD', 'InVision',
    ],
  },
  'ui designer': {
    keywords: [
      'UI Design', 'Figma', 'Visual Design', 'Design Systems', 'Typography',
      'Color Theory', 'Responsive Design', 'Prototyping', 'Adobe Creative Suite',
      'Sketch', 'Component Libraries', 'Interaction Design', 'Accessibility',
      'Branding', 'Motion Design', 'CSS',
    ],
  },
  'devops engineer': {
    keywords: [
      'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Jenkins',
      'Linux', 'Python', 'Monitoring', 'Infrastructure as Code', 'Git',
      'Ansible', 'CloudFormation', 'Grafana', 'Prometheus', 'Shell Scripting',
    ],
  },
  'hr manager': {
    keywords: [
      'Recruitment', 'Employee Relations', 'Performance Management', 'HRIS',
      'Onboarding', 'Talent Acquisition', 'Compliance', 'Training & Development',
      'Compensation', 'Benefits', 'Labor Law', 'Succession Planning',
      'Employee Engagement', 'Workforce Planning', 'Diversity & Inclusion', 'Payroll',
    ],
  },
  'financial analyst': {
    keywords: [
      'Financial Modeling', 'Excel', 'Forecasting', 'Budgeting', 'Variance Analysis',
      'Financial Reporting', 'P&L', 'Cash Flow', 'Valuation', 'SQL',
      'Data Analysis', 'Power BI', 'SAP', 'Bloomberg', 'Risk Analysis', 'ROI',
    ],
  },
  'sales executive': {
    keywords: [
      'Sales', 'CRM', 'Lead Generation', 'Negotiation', 'Pipeline Management',
      'B2B', 'Revenue Growth', 'Client Relationship', 'Cold Calling',
      'Salesforce', 'Account Management', 'Presentations', 'Target Achievement',
      'Business Development', 'Objection Handling', 'Closing',
    ],
  },
  'operations manager': {
    keywords: [
      'Operations Management', 'Process Improvement', 'Supply Chain', 'Lean',
      'Six Sigma', 'KPI', 'Vendor Management', 'Inventory Management',
      'Quality Assurance', 'Budgeting', 'Logistics', 'ERP',
      'Team Management', 'Cost Reduction', 'SOP', 'Compliance',
    ],
  },
  'content writer': {
    keywords: [
      'Content Writing', 'SEO', 'Copywriting', 'Blog', 'Social Media',
      'Content Strategy', 'Editing', 'Proofreading', 'WordPress',
      'Content Management', 'Storytelling', 'Brand Voice', 'Research',
      'Email Campaigns', 'Analytics', 'Content Calendar',
    ],
  },
  'graphic designer': {
    keywords: [
      'Adobe Creative Suite', 'Photoshop', 'Illustrator', 'InDesign', 'Figma',
      'Branding', 'Typography', 'Layout Design', 'Print Design', 'Digital Design',
      'Logo Design', 'Visual Identity', 'Color Theory', 'Packaging',
      'Motion Graphics', 'After Effects',
    ],
  },
};

// ─── Industry Fallback Keywords ───
const INDUSTRY_KEYWORDS = {
  Technology: [
    'Software', 'Development', 'Engineering', 'Cloud', 'API', 'Agile',
    'Data', 'Security', 'Architecture', 'Automation', 'Testing', 'Git',
  ],
  Consulting: [
    'Strategy', 'Analysis', 'Client Management', 'Presentation', 'Research',
    'Problem Solving', 'Project Management', 'Stakeholder', 'Communication',
    'Business Development', 'Report Writing', 'Excel',
  ],
  Finance: [
    'Financial Analysis', 'Accounting', 'Budgeting', 'Forecasting', 'Excel',
    'Risk Management', 'Compliance', 'Reporting', 'Auditing', 'SAP',
    'Valuation', 'Investment',
  ],
  Healthcare: [
    'Patient Care', 'Clinical', 'Compliance', 'HIPAA', 'Electronic Health Records',
    'Quality Assurance', 'Research', 'Documentation', 'Team Collaboration',
    'Communication', 'Problem Solving', 'Empathy',
  ],
  Marketing: [
    'Digital Marketing', 'SEO', 'Analytics', 'Content', 'Social Media',
    'Campaign Management', 'Branding', 'CRM', 'Email Marketing', 'PPC',
    'Google Analytics', 'ROI',
  ],
  Operations: [
    'Process Improvement', 'Supply Chain', 'Logistics', 'Quality', 'Lean',
    'KPI', 'Vendor Management', 'Inventory', 'ERP', 'Compliance',
    'Cost Reduction', 'Scheduling',
  ],
  Sustainability: [
    'Sustainability', 'ESG', 'Environmental', 'Carbon', 'Renewable Energy',
    'Climate', 'Reporting', 'Compliance', 'Stakeholder Engagement',
    'Data Analysis', 'Research', 'Impact Assessment',
  ],
  Education: [
    'Curriculum', 'Teaching', 'Assessment', 'Student Engagement', 'Learning Management',
    'Research', 'Communication', 'Presentation', 'Mentoring',
    'Educational Technology', 'Differentiation', 'Collaboration',
  ],
  Legal: [
    'Legal Research', 'Contract', 'Compliance', 'Litigation', 'Drafting',
    'Negotiation', 'Due Diligence', 'Regulatory', 'Corporate Law',
    'Legal Writing', 'Case Management', 'Intellectual Property',
  ],
  Retail: [
    'Customer Service', 'Sales', 'Inventory', 'Visual Merchandising', 'POS',
    'Team Management', 'Revenue', 'CRM', 'Loss Prevention',
    'Customer Experience', 'Product Knowledge', 'Store Operations',
  ],
  Manufacturing: [
    'Production', 'Quality Control', 'Lean Manufacturing', 'Six Sigma', 'ERP',
    'Supply Chain', 'Safety', 'Process Improvement', 'CAD',
    'Inventory', 'Maintenance', 'Automation',
  ],
};

// ─── Generic Fallback Keywords ───
const GENERIC_KEYWORDS = [
  'Communication', 'Leadership', 'Problem Solving', 'Team Management',
  'Project Management', 'Data Analysis', 'Microsoft Office', 'Excel',
  'Presentation', 'Time Management', 'Collaboration', 'Reporting',
  'Strategic Planning', 'Process Improvement', 'Customer Service', 'Research',
];

// ─── Section Headings to Check ───
const REQUIRED_SECTIONS = [
  { key: 'experience', patterns: [/experience/i, /work\s*history/i, /employment/i, /professional\s*experience/i] },
  { key: 'education', patterns: [/education/i, /academic/i, /qualification/i, /degree/i] },
  { key: 'skills', patterns: [/skills/i, /technical\s*skills/i, /core\s*competencies/i, /proficiencies/i] },
  { key: 'summary', patterns: [/summary/i, /objective/i, /profile/i, /about\s*me/i, /professional\s*summary/i] },
];

// ─── Improvement Templates ───
const IMPROVEMENT_TEMPLATES = {
  SUMMARY_NOT_FOUND: {
    priority: 'MEDIUM',
    title: 'Add a professional summary',
    description: "We couldn't detect a clearly labelled professional summary section. A strong summary helps recruiters quickly understand your profile.",
  },
  EXPERIENCE_NOT_FOUND: {
    priority: 'HIGH',
    title: 'Add a work experience section',
    description: "We couldn't find a clearly labelled experience section. This is one of the most important sections for ATS systems.",
  },
  EDUCATION_NOT_FOUND: {
    priority: 'MEDIUM',
    title: 'Add an education section',
    description: "We couldn't detect a clearly labelled education section. Many ATS systems and recruiters look for this.",
  },
  SKILLS_NOT_FOUND: {
    priority: 'MEDIUM',
    title: 'Add a skills section',
    description: "We couldn't find a dedicated skills section. A clear skills section helps ATS systems match your resume to job requirements.",
  },
  EMAIL_NOT_FOUND: {
    priority: 'HIGH',
    title: 'Add your email address',
    description: "We couldn't detect an email address. This is essential for recruiters to contact you.",
  },
  PHONE_NOT_FOUND: {
    priority: 'MEDIUM',
    title: 'Add your phone number',
    description: "We couldn't detect a phone number. Including a phone number helps recruiters reach you quickly.",
  },
  LINKEDIN_NOT_FOUND: {
    priority: 'LOW',
    title: 'Add your LinkedIn profile',
    description: 'Consider adding your LinkedIn URL. Many recruiters check LinkedIn profiles during the screening process.',
  },
  TOO_SHORT: {
    priority: 'HIGH',
    title: 'Your resume may be too short',
    description: 'Your resume appears to have less than 200 words. Consider adding more detail about your experience and achievements.',
  },
  TOO_LONG: {
    priority: 'MEDIUM',
    title: 'Consider shortening your resume',
    description: 'Your resume appears to be longer than 2 pages. Most ATS-optimised resumes perform best at 1–2 pages.',
  },
  LOW_KEYWORD_MATCH: {
    priority: 'HIGH',
    title: 'Improve keyword coverage',
    description: 'Your resume is missing several role-relevant keywords. Consider naturally incorporating more industry and role-specific terms.',
  },
  SPECIAL_CHARS: {
    priority: 'LOW',
    title: 'Reduce special characters',
    description: 'Your resume contains a higher-than-usual density of special characters. Some ATS systems may not parse these correctly.',
  },
};

// ─── Resolve Keywords ───
function resolveKeywords(role, industry) {
  const normalizedRole = (role || '').toLowerCase().trim();

  // 1. Exact role match
  if (ROLE_KEYWORDS[normalizedRole]) {
    return {
      keywords: ROLE_KEYWORDS[normalizedRole].keywords,
      isGeneric: false,
      templateLabel: role,
    };
  }

  // 2. Alias / partial match
  for (const [key, data] of Object.entries(ROLE_KEYWORDS)) {
    if (normalizedRole.includes(key) || key.includes(normalizedRole)) {
      return {
        keywords: data.keywords,
        isGeneric: false,
        templateLabel: key.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' '),
      };
    }
  }

  // 3. Industry fallback
  if (industry && INDUSTRY_KEYWORDS[industry]) {
    return {
      keywords: INDUSTRY_KEYWORDS[industry],
      isGeneric: true,
      templateLabel: `${industry} Industry`,
    };
  }

  // 4. Generic fallback
  return {
    keywords: GENERIC_KEYWORDS,
    isGeneric: true,
    templateLabel: null,
  };
}

// ─── Main Scoring Function ───
export function analyzeResume(text, { desiredRole, targetIndustry, experienceLevel, targetLocation, pageCount = 1 }) {
  const result = {
    overallScore: 0,
    breakdown: {
      resumeStructure: { score: 0, max: 20, items: [] },
      atsFormatting: { score: 0, max: 20, items: [] },
      keywordMatch: { score: 0, max: 30, items: [] },
      resumeEssentials: { score: 0, max: 20, items: [] },
    },
    keywords: { found: [], missing: [], isGeneric: false, templateLabel: null, genericNote: null },
    improvements: [],
    context: { desiredRole, targetIndustry, experienceLevel, targetLocation },
    checksPassed: 0,
    needsAttention: 0,
  };

  const wordCount = text.split(/\s+/).filter(Boolean).length;

  // ── Resume Structure (20 points) ──
  let structureScore = 0;
  const sectionsFound = [];
  const sectionsMissing = [];

  for (const section of REQUIRED_SECTIONS) {
    const found = section.patterns.some(p => p.test(text));
    if (found) {
      structureScore += 4;
      sectionsFound.push(section.key);
      result.breakdown.resumeStructure.items.push({ label: `${section.key} section`, passed: true });
    } else {
      sectionsMissing.push(section.key);
      result.breakdown.resumeStructure.items.push({ label: `${section.key} section`, passed: false });

      const ruleKey = `${section.key.toUpperCase()}_NOT_FOUND`;
      if (IMPROVEMENT_TEMPLATES[ruleKey]) {
        result.improvements.push({ rule: ruleKey, ...IMPROVEMENT_TEMPLATES[ruleKey] });
      }
    }
  }

  // Clear heading structure bonus
  if (sectionsFound.length >= 3) structureScore += 4;
  result.breakdown.resumeStructure.items.push({
    label: 'Clear heading structure',
    passed: sectionsFound.length >= 3,
  });

  result.breakdown.resumeStructure.score = Math.min(structureScore, 20);

  // ── ATS Formatting (20 points) ──
  let formattingScore = 0;

  // Word count check
  const goodWordCount = wordCount >= 200 && wordCount <= 1200;
  if (goodWordCount) {
    formattingScore += 5;
  } else if (wordCount < 200) {
    result.improvements.push({ rule: 'TOO_SHORT', ...IMPROVEMENT_TEMPLATES.TOO_SHORT });
  }
  result.breakdown.atsFormatting.items.push({
    label: `Word count (${wordCount} words)`,
    passed: goodWordCount,
  });

  // Page count check
  const goodPageCount = pageCount <= 2;
  if (goodPageCount) {
    formattingScore += 5;
  } else {
    result.improvements.push({ rule: 'TOO_LONG', ...IMPROVEMENT_TEMPLATES.TOO_LONG });
  }
  result.breakdown.atsFormatting.items.push({
    label: `Page count (${pageCount} ${pageCount === 1 ? 'page' : 'pages'})`,
    passed: goodPageCount,
  });

  // Special character density
  const specialChars = (text.match(/[^\w\s.,;:!?@()\-–—/\\'"#&+=%$₹€£¥°·•\n\r\t]/g) || []).length;
  const specialCharDensity = text.length > 0 ? specialChars / text.length : 0;
  const lowSpecialChars = specialCharDensity < 0.03;
  if (lowSpecialChars) {
    formattingScore += 5;
  } else {
    result.improvements.push({ rule: 'SPECIAL_CHARS', ...IMPROVEMENT_TEMPLATES.SPECIAL_CHARS });
  }
  result.breakdown.atsFormatting.items.push({
    label: 'Special character density',
    passed: lowSpecialChars,
  });

  // Text extraction quality (proxy: ratio of readable text)
  const readableChars = (text.match(/[a-zA-Z0-9]/g) || []).length;
  const extractionQuality = text.length > 0 ? readableChars / text.length : 0;
  const goodExtraction = extractionQuality > 0.4;
  if (goodExtraction) formattingScore += 5;
  result.breakdown.atsFormatting.items.push({
    label: 'Text extraction quality',
    passed: goodExtraction,
  });

  result.breakdown.atsFormatting.score = Math.min(formattingScore, 20);

  // ── Keyword Match (30 points) ──
  const { keywords, isGeneric, templateLabel } = resolveKeywords(desiredRole, targetIndustry);
  const foundKeywords = [];
  const missingKeywords = [];
  const textLower = text.toLowerCase();

  for (const kw of keywords) {
    if (textLower.includes(kw.toLowerCase())) {
      foundKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  }

  const keywordRatio = keywords.length > 0 ? foundKeywords.length / keywords.length : 0;
  let keywordScore = Math.round(keywordRatio * 30);
  keywordScore = Math.min(keywordScore, 30);

  if (keywordRatio < 0.3) {
    result.improvements.push({ rule: 'LOW_KEYWORD_MATCH', ...IMPROVEMENT_TEMPLATES.LOW_KEYWORD_MATCH });
  }

  result.breakdown.keywordMatch.score = keywordScore;
  result.breakdown.keywordMatch.items.push({
    label: `${foundKeywords.length} of ${keywords.length} keywords found`,
    passed: keywordRatio >= 0.4,
  });

  result.keywords = {
    found: foundKeywords,
    missing: missingKeywords,
    isGeneric,
    templateLabel,
    genericNote: isGeneric
      ? "We don't have a dedicated keyword template for this exact role yet, so this section uses a general resume keyword checklist."
      : null,
  };

  // ── Resume Essentials (20 points) ──
  let essentialsScore = 0;

  // Email
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
  if (hasEmail) {
    essentialsScore += 5;
  } else {
    result.improvements.push({ rule: 'EMAIL_NOT_FOUND', ...IMPROVEMENT_TEMPLATES.EMAIL_NOT_FOUND });
  }
  result.breakdown.resumeEssentials.items.push({ label: 'Email address', passed: hasEmail });

  // Phone
  const hasPhone = /(\+?\d{1,4}[\s.-]?)?\(?\d{2,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}/.test(text);
  if (hasPhone) {
    essentialsScore += 5;
  } else {
    result.improvements.push({ rule: 'PHONE_NOT_FOUND', ...IMPROVEMENT_TEMPLATES.PHONE_NOT_FOUND });
  }
  result.breakdown.resumeEssentials.items.push({ label: 'Phone number', passed: hasPhone });

  // LinkedIn
  const hasLinkedIn = /linkedin\.com/i.test(text) || /linkedin/i.test(text);
  if (hasLinkedIn) {
    essentialsScore += 5;
  } else {
    result.improvements.push({ rule: 'LINKEDIN_NOT_FOUND', ...IMPROVEMENT_TEMPLATES.LINKEDIN_NOT_FOUND });
  }
  result.breakdown.resumeEssentials.items.push({ label: 'LinkedIn profile', passed: hasLinkedIn });

  // Consistent formatting (heuristic: has dates in experience)
  const hasDates = /\b(20\d{2}|19\d{2})\b/.test(text) || /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*\s+\d{4}/i.test(text);
  if (hasDates) essentialsScore += 5;
  result.breakdown.resumeEssentials.items.push({ label: 'Date formatting', passed: hasDates });

  result.breakdown.resumeEssentials.score = Math.min(essentialsScore, 20);

  // Preserve the check scores separately from the disclosed automated-review ceiling.
  result.categoryCeilingPercent = 90;
  for (const category of Object.values(result.breakdown)) {
    category.rawScore = category.score;
    category.score = Math.min(category.score, Math.floor(category.max * 0.9));
  }

  // ── Calculate Overall Score ──
  const rawScore =
    result.breakdown.resumeStructure.score +
    result.breakdown.atsFormatting.score +
    result.breakdown.keywordMatch.score +
    result.breakdown.resumeEssentials.score;

  // Apply a slight dampening — never exceed cap
  result.overallScore = Math.min(rawScore, ATS_SCORE_CAP);

  // ── Calculate stats ──
  const allItems = [
    ...result.breakdown.resumeStructure.items,
    ...result.breakdown.atsFormatting.items,
    ...result.breakdown.keywordMatch.items,
    ...result.breakdown.resumeEssentials.items,
  ];
  result.checksPassed = allItems.filter(i => i.passed).length;
  result.needsAttention = allItems.filter(i => !i.passed).length;

  // Sort improvements by priority
  const priorityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
  result.improvements.sort((a, b) => (priorityOrder[a.priority] || 2) - (priorityOrder[b.priority] || 2));

  return result;
}
