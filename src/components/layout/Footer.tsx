import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { site, navLinks } from '@/data/site';
import { SocialLinks } from '@/components/ui/SocialLinks';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="section-container relative py-12">
      <div className="glass-strong flex flex-col items-center gap-8 rounded-3xl p-8 md:p-10">
        <div className="text-xl font-semibold tracking-tight text-[var(--color-text)]">
          {site.name}
          <span className="text-gradient">.</span>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[var(--color-text-muted)]">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-[var(--color-text)]">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <SocialLinks />

        <div className="w-full border-t border-[var(--color-border)] pt-6 text-center text-xs text-[var(--color-text-dim)]">
          © {year} {site.name}. Built with React, Tailwind CSS & Framer Motion.
        </div>
      </div>

      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ y: -3 }}
        aria-label="Back to top"
        className="glass absolute -top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full text-[var(--color-text)] shadow-lg cursor-pointer md:right-10"
      >
        <ArrowUp size={18} />
      </motion.button>
    </footer>
  );
}
