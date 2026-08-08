import type { ExperienceItem } from '@/types';

export const experience: ExperienceItem[] = [
  {
    role: 'Full-Stack Developer',
    company: 'Revin Krishi — LIVO',
    period: 'Oct 2025 — Present',
    location: 'Full-Time',
    description:
      'Leading the architecture and development of a cloud-native, AI-powered smart agriculture platform, helping farmers reduce cultivation costs, improve crop yield, and make data-driven decisions through intelligent recommendations and real-time insights.',
    highlights: [
      'Built a microservices-based platform with Django and FastAPI, exposing secure REST APIs for Flutter across Development, Staging, and Production on AWS',
      'Shipped AI-driven features including chat & live voice chat, GDD & fertigation recommendations, crop and disease diagnosis, weather forecasting, and pest/spray alerts',
      'Integrated LiveKit, Firebase, Redis Cloud, Weather API, Google Maps, Customer.io, MSG91, Sentry, and payment gateways (Razorpay, Apple Pay, Google Pay)',
      'Optimized performance, scalability, and reliability using Docker, PostgreSQL, MongoDB, AWS, and distributed caching',
    ],
  },
  {
    role: 'Full-Stack Developer',
    company: 'IIT Palakkad — SatCard',
    period: 'May 2025',
    location: 'Full-Time',
    description:
      'Built a GDD-powered fertilizer calculator and an admin dashboard for IoT device, employee, and support-ticket management, enabling farmers and agronomists to plan crop growth and track inventory and finances.',
    highlights: [
      'Designed a backend fertilizer calculator using Growing Degree Days (GDD) to optimize crop growth planning',
      'Integrated inventory management with fertilizer usage and expense-income tracking for financial planning',
      'Built a full-featured Admin Dashboard (Django + React) with permission-based CRUD for IoT devices, employees, and tickets',
      'Developed device monitoring with data visualization, status tracking, and downloadable reports',
    ],
  },
  {
    role: 'Python Django Developer — Internship',
    company: 'Alkor Cyber Space',
    period: 'Dec 2024 — Apr 2025',
    location: 'Internship',
    description:
      'Delivered a scalable e-learning platform and a management system for student, employee, and sales data — automating manual processes and improving accessibility.',
    highlights: [
      'Built an e-learning platform with Django, PhonePe payments, and email automation via Redis and Django Channels',
      'Developed a management system for IMAT Global & Alkor Cyber Space with role-based access and real-time performance monitoring',
      'Deployed both projects on AWS with a Bootstrap-based responsive frontend',
    ],
  },
];
