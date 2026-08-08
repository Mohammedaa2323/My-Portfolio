export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: 'github' | 'linkedin' | 'twitter' | 'instagram' | 'dribbble' | 'mail';
}

export interface SkillCategory {
  category: string;
  skills: {
    name: string;
    level: number; // 0-100
  }[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
}
