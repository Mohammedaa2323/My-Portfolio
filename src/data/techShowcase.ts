import type { IconType } from 'react-icons';
import { FaAws } from 'react-icons/fa6';
import {
  SiDjango,
  SiDocker,
  SiFastapi,
  SiFirebase,
  SiFlutter,
  SiGithubactions,
  SiMongodb,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
} from 'react-icons/si';

export interface TechShowcaseItem {
  name: string;
  caption: string;
  icon: IconType;
  /** Brand color, lightened where the official one disappears on a dark background. */
  color: string;
}

export const techShowcase: TechShowcaseItem[] = [
  { name: 'Python', caption: 'The language behind everything I build', icon: SiPython, color: '#4B8BBE' },
  { name: 'Django', caption: 'Production backends, admin dashboards and REST APIs', icon: SiDjango, color: '#44B78B' },
  { name: 'FastAPI', caption: 'High-performance async microservices', icon: SiFastapi, color: '#05998B' },
  { name: 'PostgreSQL', caption: 'Reliable relational data at the core', icon: SiPostgresql, color: '#4169E1' },
  { name: 'MongoDB', caption: 'Flexible documents for fast-moving features', icon: SiMongodb, color: '#47A248' },
  { name: 'Redis', caption: 'Caching, queues and real-time speed', icon: SiRedis, color: '#FF4438' },
  { name: 'Docker', caption: 'Same build from laptop to production', icon: SiDocker, color: '#2496ED' },
  { name: 'AWS', caption: 'EC2, S3, Lambda and EventBridge in the cloud', icon: FaAws, color: '#FF9900' },
  { name: 'React', caption: 'Fast, responsive interfaces', icon: SiReact, color: '#61DAFB' },
  { name: 'Flutter', caption: 'Mobile apps powered by my APIs', icon: SiFlutter, color: '#42A5F5' },
  { name: 'Firebase', caption: 'Auth, push notifications and realtime data', icon: SiFirebase, color: '#FFCA28' },
  { name: 'GitHub Actions', caption: 'Automated CI/CD on every push', icon: SiGithubactions, color: '#2088FF' },
];
