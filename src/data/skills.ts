import type { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    category: 'Languages & Frameworks',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'Django / DRF', level: 92 },
      { name: 'FastAPI', level: 85 },
      { name: 'JavaScript / React', level: 78 },
    ],
  },
  {
    category: 'Databases & Cloud',
    skills: [
      { name: 'PostgreSQL / MySQL', level: 88 },
      { name: 'MongoDB / Redis', level: 82 },
      { name: 'AWS (EC2, S3, Lambda)', level: 85 },
      { name: 'Docker', level: 82 },
    ],
  },
  {
    category: 'Architecture & Tools',
    skills: [
      { name: 'Microservices & REST APIs', level: 90 },
      { name: 'CI/CD (GitHub Actions)', level: 80 },
      { name: 'Flutter', level: 10 },
      { name: 'Nginx / Linux', level: 78 },
    ],
  },
];
