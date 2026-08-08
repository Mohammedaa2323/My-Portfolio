import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends HTMLMotionProps<'button'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
}

const variants = {
  primary:
    'bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] text-white shadow-lg shadow-[var(--color-accent)]/20 hover:shadow-[var(--color-accent)]/40',
  secondary: 'glass text-[var(--color-text)] hover:border-[var(--color-border-strong)]',
  ghost: 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
};

export function Button({ children, variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 cursor-pointer',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
