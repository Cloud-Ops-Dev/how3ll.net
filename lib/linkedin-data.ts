/**
 * Utility to load and type LinkedIn export data
 */

export interface Profile {
  firstName: string;
  lastName: string;
  headline: string;
  summary: string;
  industry: string;
  location: string;
}

export interface Position {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  duration: string;
  description: string;
}

export interface Skill {
  name: string;
  endorsements: number;
}

export interface Education {
  school: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

export interface Recommendation {
  author: string;
  authorTitle: string;
  authorCompany: string;
  text: string;
  date: string;
  relationship: string;
}

export interface ProjectEntry {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  url?: string;
}

export interface LinkedInData {
  profile: Profile;
  positions: Position[];
  skills: Skill[];
  education: Education[];
  certifications: Certification[];
  recommendations: Recommendation[];
  projects: ProjectEntry[];
}

let cachedData: LinkedInData | null = null;

/**
 * Load LinkedIn data from JSON file
 * This is called during build time for static generation
 */
export async function getLinkedInData(): Promise<LinkedInData> {
  if (cachedData) {
    return cachedData;
  }

  try {
    // Import the generated JSON data
    const dataModule = await import('../public/data/linkedin-data.json');
    cachedData = dataModule as LinkedInData;
    return cachedData;
  } catch (error) {
    console.error('Failed to load LinkedIn data:', error);
    // Return empty structure if data is not available
    return {
      profile: {
        firstName: 'Mark',
        lastName: 'Howell',
        headline: 'Cloud Operations Professional',
        summary: '',
        industry: '',
        location: '',
      },
      positions: [],
      skills: [],
      education: [],
      certifications: [],
      recommendations: [],
      projects: [],
    };
  }
}

/**
 * Get top skills by endorsement count
 */
export async function getTopSkills(limit: number = 20): Promise<Skill[]> {
  const data = await getLinkedInData();
  return data.skills.slice(0, limit);
}

/**
 * Get skills grouped by category (simple grouping based on name patterns)
 */
export async function getSkillsByCategory(): Promise<Record<string, Skill[]>> {
  const data = await getLinkedInData();
  const categories: Record<string, Skill[]> = {
    'Cloud & Infrastructure': [],
    'DevOps & Automation': [],
    'Security & Incident Response': [],
    'Project Management': [],
    'Other': [],
  };

  const cloudKeywords = ['AWS', 'Azure', 'IBM', 'Cloud', 'VSI', 'EC2', 'VPC', 'Kubernetes', 'Docker', 'MultiCloud'];
  const devopsKeywords = ['Ansible', 'Automation', 'CI/CD', 'Jenkins', 'GitHub', 'GitLab', 'DevOps', 'Terraform', 'Kubernetes'];
  const securityKeywords = ['Security', 'Incident Response', 'EDR', 'SIEM', 'Firewall', 'Compliance', 'Forensics', 'Malware', 'Threat'];
  const pmKeywords = ['Agile', 'Scrum', 'Project Management', 'Leadership', 'ServiceNow', 'Jira', 'Zenhub', 'ITIL'];

  data.skills.forEach((skill) => {
    const name = skill.name.toUpperCase();
    if (cloudKeywords.some((kw) => name.includes(kw.toUpperCase()))) {
      categories['Cloud & Infrastructure'].push(skill);
    } else if (devopsKeywords.some((kw) => name.includes(kw.toUpperCase()))) {
      categories['DevOps & Automation'].push(skill);
    } else if (securityKeywords.some((kw) => name.includes(kw.toUpperCase()))) {
      categories['Security & Incident Response'].push(skill);
    } else if (pmKeywords.some((kw) => name.includes(kw.toUpperCase()))) {
      categories['Project Management'].push(skill);
    } else {
      categories['Other'].push(skill);
    }
  });

  return categories;
}

/**
 * Get featured positions (non-duplicate roles)
 */
export async function getFeaturedPositions(): Promise<Position[]> {
  const data = await getLinkedInData();
  // Remove duplicate roles (same title at same company)
  const seen = new Set<string>();
  return data.positions.filter((pos) => {
    const key = `${pos.title}-${pos.company}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}
