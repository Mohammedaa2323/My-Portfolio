import type { Project } from '@/types';

export const projects: Project[] = [
  {
    title: 'LIVO — AI-Powered Smart Agriculture Platform',
    description:
      'A cloud-based mobile platform helping farmers reduce cultivation costs and increase crop yield through AI-powered chat, GDD & fertigation recommendations, disease diagnosis, and real-time weather alerts.',
    image: '/projects/livo.jpg',
    tags: ['Django', 'FastAPI', 'Flutter', 'AWS', 'PostgreSQL', 'Redis'],
    liveUrl: 'https://play.google.com/store/apps/details?id=com.revin.livo',
    featured: true,
  },
  {
    title: 'Revin Log — Fertilizer Calculator & Inventory',
    description:
      'An IoT-enabled mobile agriculture application featuring a GDD-powered fertilizer calculator, integrated inventory management, and expense and income tracking to help farmers and agronomists optimize crop management and farm operations.',
    image: '/projects/revin-log.jpg',
    tags: ['Django', 'Flutter', 'MySQL', 'MongoDB'],
    liveUrl: 'https://play.google.com/store/apps/details?id=com.revin.log',
    featured: true,
  },
  {
    title: 'Revin Admin Dashboard',
    description:
      'A centralized admin platform for managing IoT devices, employees, and support tickets with role-based access and real-time device monitoring.',
    image: '/projects/revin-admin.jpg',
    tags: ['Django', 'React', 'MySQL', 'MongoDB'],
    liveUrl: 'https://server.revinkrishi.com/revin',
    featured: true,
  },
  {
    title: 'E-Learning Platform',
    description:
      'A scalable e-learning platform with PhonePe payments and automated email workflows powered by Redis and Django Channels.',
    image: '/projects/elearning.jpg',
    tags: ['Django', 'PostgreSQL', 'Redis', 'AWS'],
    liveUrl: 'https://imatglobal.com/',
    repoUrl: 'https://github.com/Mohammedaa2323/imatglobal_new',
  },
  {
    title: 'Management System — IMAT Global & Alkor Cyber Space',
    description:
      'A secure management platform for student, employee, and sales data with role-based access and real-time performance monitoring.',
    image: '/projects/management-system.jpg',
    tags: ['Django', 'PostgreSQL', 'JavaScript', 'Bootstrap'],
    repoUrl: 'https://github.com/Mohammedaa2323/imatglobal_organication_pr',
  },
];
