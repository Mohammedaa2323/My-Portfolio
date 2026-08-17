import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      className={cn(
        'glass relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)] hover:border-[var(--color-border-strong)] cursor-pointer',
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isLight ? 'sun' : 'moon'}
          initial={{ opacity: 0, rotate: -90, scale: 0.4 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.4 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="flex"
        >
          {isLight ? <Sun size={16} /> : <Moon size={16} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
