export interface Project {
  id: string;
  title: string;
  category: 'Agentic AI & LLMs' | 'Autonomous & Robotics' | 'Voice & NLP' | 'IoT & Security';
  tagline: string;
  description: string;
  highlights: string[];
  technologies: string[];
  metrics: { label: string; value: string }[];
  githubUrl: string;
  liveUrl?: string;
  year: string;
  featured: boolean;
  architectureDetails?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: 'work' | 'leadership' | 'education';
  highlights: string[];
  badge?: string;
  metrics?: string;
}

export interface SkillCategory {
  category: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // percentage (e.g. 95)
    experienceYears: string;
    highlight: string;
  }[];
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  type: 'Award' | 'Hackathon' | 'Community' | 'Certification';
  icon: string;
  description: string;
  badgeText: string;
  accentColor: string;
  verificationLink?: string;
}
