import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks, site } from '@/data/site';
import { useActiveSection } from '@/hooks/useActiveSection';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const activeId = useActiveSection(navLinks.map((link) => link.href.replace('#', '')));

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 px-4 pt-4"
    >
      <nav className="glass-strong mx-auto flex max-w-5xl items-center justify-between rounded-full px-5 py-3">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="text-sm font-semibold tracking-tight text-[var(--color-text)]"
        >
          {site.name}
          <span className="text-gradient">.</span>
        </a>

        <ul className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeId === link.href.replace('#', '');
            return (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer',
                    isActive ? 'text-[var(--color-text)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <button
          onClick={() => handleNavClick('#contact')}
          className="hidden xl:inline-flex rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] px-5 py-2 text-sm font-medium text-white shadow-lg shadow-[var(--color-accent)]/20 transition-shadow hover:shadow-[var(--color-accent)]/40 cursor-pointer"
        >
          Let's Talk
        </button>

        <button
          onClick={() => setIsOpen((v) => !v)}
          className="xl:hidden text-[var(--color-text)] cursor-pointer"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="glass-strong mx-auto mt-2 flex max-w-5xl flex-col gap-1 rounded-2xl p-3 xl:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="rounded-xl px-4 py-3 text-left text-sm font-medium text-[var(--color-text-muted)] hover:bg-white/5 hover:text-[var(--color-text)] cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
