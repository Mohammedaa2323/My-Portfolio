import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  hover?: boolean;
}

export function GlassCard({ children, hover = true, className, ...props }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -6, borderColor: 'rgba(255,255,255,0.2)' } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={cn(
        'glass rounded-2xl p-6 transition-shadow duration-300',
        hover && 'hover:shadow-2xl hover:shadow-[var(--color-accent)]/10',
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
