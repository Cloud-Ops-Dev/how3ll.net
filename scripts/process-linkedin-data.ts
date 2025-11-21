/**
 * Script to process LinkedIn CSV export data into structured JSON format
 * Usage: npx ts-node scripts/process-linkedin-data.ts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LINKEDIN_DATA_DIR = path.join(
  process.env.HOME || '/home/clay',
  'Documents/projects/how3ll.net/Data2site/linkedin'
);

const OUTPUT_DIR = path.join(__dirname, '../public/data');

interface Profile {
  firstName: string;
  lastName: string;
  headline: string;
  summary: string;
  industry: string;
  location: string;
}

interface Position {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  duration: string;
  description: string;
}

interface Skill {
  name: string;
  endorsements: number;
}

interface Education {
  school: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

interface Recommendation {
  author: string;
  authorTitle: string;
  authorCompany: string;
  text: string;
  date: string;
  relationship: string;
}

interface ProjectEntry {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  url?: string;
}

interface LinkedInData {
  profile: Profile;
  positions: Position[];
  skills: Skill[];
  education: Education[];
  certifications: Certification[];
  recommendations: Recommendation[];
  projects: ProjectEntry[];
}

function readCSV(filePath: string): any[] {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return parse(content, {
      columns: true,
      skip_empty_lines: true,
    });
  } catch (error) {
    console.warn(`Could not read ${filePath}: ${error}`);
    return [];
  }
}

function processProfile(data: any[]): Profile {
  const record = data[0] || {};
  return {
    firstName: record['First Name'] || 'Mark',
    lastName: record['Last Name'] || 'Howell',
    headline: record['Headline'] || '',
    summary: record['Summary'] || '',
    industry: record['Industry'] || '',
    location: record['Geo Location'] || '',
  };
}

function processPositions(data: any[]): Position[] {
  return data.map((record) => ({
    title: record['Title'] || '',
    company: record['Company Name'] || '',
    startDate: record['Started On'] || '',
    endDate: record['Ended On'] || 'Present',
    duration: record['Duration'] || '',
    description: record['Description'] || '',
  }));
}

function processSkills(data: any[]): Skill[] {
  return data.map((record) => ({
    name: record['Name'] || '',
    endorsements: parseInt(record['Endorsement Count'] || '0', 10),
  }));
}

function processEducation(data: any[]): Education[] {
  return data.map((record) => ({
    school: record['School Name'] || '',
    fieldOfStudy: record['Field of Study'] || '',
    startDate: record['Started On'] || '',
    endDate: record['Ended On'] || '',
  }));
}

function processCertifications(data: any[]): Certification[] {
  return data.map((record) => ({
    name: record['Name'] || '',
    issuer: record['Issuer'] || '',
    date: record['Issued On'] || '',
    credentialId: record['Credential ID'] || undefined,
  }));
}

function processRecommendations(data: any[]): Recommendation[] {
  return data.map((record) => ({
    author: record['First Name'] || '',
    authorTitle: record['Title'] || '',
    authorCompany: record['Company'] || '',
    text: record['Recommendation Text'] || '',
    date: record['Created Date'] || '',
    relationship: record['Relationship'] || '',
  }));
}

function processProjects(data: any[]): ProjectEntry[] {
  return data.map((record) => ({
    title: record['Title'] || '',
    description: record['Description'] || '',
    startDate: record['Started On'] || '',
    endDate: record['Ended On'] || '',
    url: record['URL'] || undefined,
  }));
}

async function main() {
  console.log('Processing LinkedIn data...');

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Read and process all CSV files
  const profileData = readCSV(path.join(LINKEDIN_DATA_DIR, 'Profile.csv'));
  const positionsData = readCSV(path.join(LINKEDIN_DATA_DIR, 'Positions.csv'));
  const skillsData = readCSV(path.join(LINKEDIN_DATA_DIR, 'Skills.csv'));
  const educationData = readCSV(path.join(LINKEDIN_DATA_DIR, 'Education.csv'));
  const certificationsData = readCSV(
    path.join(LINKEDIN_DATA_DIR, 'Certifications.csv')
  );
  const recommendationsData = readCSV(
    path.join(LINKEDIN_DATA_DIR, 'Recommendations_Received.csv')
  );
  const projectsData = readCSV(path.join(LINKEDIN_DATA_DIR, 'Projects.csv'));

  // Process data
  const linkedInData: LinkedInData = {
    profile: processProfile(profileData),
    positions: processPositions(positionsData),
    skills: processSkills(skillsData).sort((a, b) => b.endorsements - a.endorsements),
    education: processEducation(educationData),
    certifications: processCertifications(certificationsData),
    recommendations: processRecommendations(recommendationsData),
    projects: processProjects(projectsData),
  };

  // Write output file
  const outputPath = path.join(OUTPUT_DIR, 'linkedin-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(linkedInData, null, 2));
  console.log(`✓ Data processed successfully: ${outputPath}`);
  console.log(`  - Profile: ${linkedInData.profile.firstName} ${linkedInData.profile.lastName}`);
  console.log(`  - Positions: ${linkedInData.positions.length}`);
  console.log(`  - Skills: ${linkedInData.skills.length}`);
  console.log(`  - Education: ${linkedInData.education.length}`);
  console.log(`  - Certifications: ${linkedInData.certifications.length}`);
  console.log(`  - Recommendations: ${linkedInData.recommendations.length}`);
  console.log(`  - Projects: ${linkedInData.projects.length}`);
}

main().catch(console.error);
