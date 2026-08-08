import type { ExperienceItem } from '@/types';

export const experience: ExperienceItem[] = [
  {
    role: 'Full-Stack Developer',
    company: 'Revin Krishi',
    period: 'Oct 2025 — Present',
    location: 'Full-Time',
    description:
      'Leading development of a cloud-native, AI-powered smart agriculture platform that helps farmers cut costs and boost yield with real-time insights.',
    highlights: [
      'Built a microservices platform with Django & FastAPI powering a Flutter app on AWS',
      'Shipped AI features: live chat, crop diagnosis, weather & pest alerts',
      'Integrated LiveKit, Firebase, Redis, and payment gateways (Razorpay, Applepay, Google Play)',
    ],
  },
  {
    role: 'Full-Stack Developer',
    company: 'Satcard — IIT Palakkad',
    period: 'May 2025',
    location: 'Full-Time',
    description:
      'Built a GDD-powered fertilizer calculator and an admin dashboard for IoT, employee, and support-ticket management.',
    highlights: [
      'Designed a fertilizer calculator using Growing Degree Days for crop planning',
      'Built a Django + React admin dashboard with permission-based CRUD',
      'Added device monitoring with data visualization and reports',
    ],
  },
  {
    role: 'Python Django Developer — Internship',
    company: 'Alkor Cyber Space',
    period: 'Dec 2024 — Apr 2025',
    location: 'Internship',
    description:
      'Delivered a scalable e-learning platform and a management system for student, employee, and sales data.',
    highlights: [
      'Built an e-learning platform with Django, PhonePe payments, and Redis-based email automation',
      'Developed a role-based management system with real-time performance monitoring',
      'Deployed both projects on AWS with a responsive frontend',
    ],
  },
];
