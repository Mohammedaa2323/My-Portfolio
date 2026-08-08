# Portfolio

A premium, dark-themed personal portfolio built with React, Vite, TypeScript, Tailwind CSS, and Framer Motion.

## Stack

- **React 19 + TypeScript** — components and type safety
- **Vite** — dev server and build tooling
- **Tailwind CSS v4** — styling via the `@tailwindcss/vite` plugin (no `tailwind.config.js`; theme tokens live in `src/index.css`)
- **Framer Motion** — scroll-triggered and interactive animations
- **lucide-react** + **react-icons** — UI and brand/social icons
- **react-helmet-async** — per-page SEO meta tags

## Getting started

```bash
npm install
npm run dev       # start dev server at http://localhost:5173
npm run build     # type-check + production build to dist/
npm run preview   # preview the production build locally
npm run lint      # run oxlint
```

## Project structure

```
src/
├── assets/images/       # local image assets
├── components/
│   ├── layout/           # Navbar, Footer, Loader, AnimatedBackground
│   ├── sections/         # Hero, About, Skills, Experience, Projects, Services, Testimonials, Contact
│   └── ui/                # Button, GlassCard, SectionHeading, Badge, SocialLinks
├── data/                 # editable content: site.ts, skills.ts, experience.ts, projects.ts, services.ts, testimonials.ts
├── hooks/                # useActiveSection, useLoading
├── lib/                  # utils.ts (cn helper), motion.ts (Framer Motion variants)
└── types/                # shared TypeScript interfaces
```

## Customizing content

All personal content lives in `src/data/` — edit those files to update your name, bio, skills, experience, projects, services, testimonials, and social links without touching component code.

Project screenshots go in `public/projects/` and testimonial avatars in `public/avatars/`; reference them by path in the corresponding `src/data/*.ts` file.

## Contact form

The contact form (`src/components/sections/Contact.tsx`) validates client-side and submits to a form backend via `VITE_FORM_ENDPOINT` (e.g. [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com)). Copy `.env.example` to `.env` and set the endpoint. If left unset, submitting opens the visitor's email client instead.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it in [Vercel](https://vercel.com/new) — framework preset `Vite` is auto-detected.
3. Add `VITE_FORM_ENDPOINT` as an environment variable if using a form backend.
4. Deploy. `vercel.json` is already configured for SPA routing and asset caching.

## SEO

Update the placeholder metadata in `index.html` (`<title>`, `og:*`, `twitter:*`, canonical URL) and `public/sitemap.xml` / `public/robots.txt` with your real domain before deploying.
