import type { PortfolioDocument } from '@/types';
import { site } from '@/data/site';

export const documents: PortfolioDocument[] = [
  {
    title: 'Resume',
    issuer: site.name,
    date: 'Updated Aug 2026',
    kind: 'resume',
    format: 'pdf',
    file: site.resumeUrl,
    downloadName: 'Mohammed-A-A-Resume.pdf',
  },
  {
    title: 'Experience Certificate',
    issuer: 'IIT Palakkad — Satcard',
    date: 'May 2025 — Sep 2025',
    kind: 'certificate',
    format: 'pdf',
    file: '/documents/iit-palakkad-experience-certificate.pdf',
    downloadName: 'Mohammed-A-A-IIT-Palakkad-Experience-Certificate.pdf',
  },
  {
    title: 'Python Web Development Expert',
    issuer: 'Luminar Technolab, Cochin',
    date: 'June 2024 · Grade A+',
    kind: 'certificate',
    format: 'image',
    file: '/documents/luminar-python-web-development-certificate.jpeg',
    downloadName: 'Mohammed-A-A-Luminar-Python-Web-Development-Certificate.jpeg',
  },
  {
    title: 'National Council for Technology and Training',
    issuer: 'Luminar Technolab, Cochin',
    date: 'June 2024',
    kind: 'certificate',
    format: 'image',
  },
];
