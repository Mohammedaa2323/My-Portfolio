import type { NavLink, SocialLink } from '@/types';

export const site = {
  name: 'Mohammed A A',
  role: 'Full-Stack Software Engineer',
  tagline:
    'I design and build scalable, production-grade applications with clean architecture and AI-powered solutions.',
  description:
    'Software Engineer with 2+ years of experience designing and developing scalable, production-grade applications using Python, Django, FastAPI, Flutter, AWS, Docker, PostgreSQL, MongoDB, and Redis. Experienced in microservices, REST APIs, cloud deployment, and AI-powered solutions with a strong focus on performance, reliability, and clean architecture.',
  location: 'Thrissur, Kerala, India',
  email: 'mohammedaa232323@gmail.com',
  phone: '+91 7510554336',
  resumeUrl: '/resume.pdf',
  url: 'https://example.com',
};

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

// TODO: replace with your real LinkedIn profile URL
export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/MohammedaaSATCARD', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/', icon: 'linkedin' },
  { label: 'Email', href: `mailto:${'mohammedaa232323@gmail.com'}`, icon: 'mail' },
];
