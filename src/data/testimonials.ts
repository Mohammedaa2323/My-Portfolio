import type { Testimonial } from '@/types';

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'Product Manager',
    company: 'TechCorp',
    quote:
      "Working with them was a game-changer for our product. They don't just write code — they think about the user, the business, and the long-term maintainability.",
    avatar: '/avatars/sarah.jpg',
  },
  {
    name: 'Marcus Lee',
    role: 'CTO',
    company: 'StartupX',
    quote:
      'One of the most reliable engineers I have worked with. Deadlines were always met, and the quality of the code exceeded our expectations every time.',
    avatar: '/avatars/marcus.jpg',
  },
  {
    name: 'Priya Sharma',
    role: 'Design Lead',
    company: 'Creative Studio',
    quote:
      'A rare mix of strong engineering and genuine design sensibility. Every handoff turned into pixel-perfect, performant UI without endless back-and-forth.',
    avatar: '/avatars/priya.jpg',
  },
];
