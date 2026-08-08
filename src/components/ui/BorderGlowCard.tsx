import { useId, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BorderGlowCardProps {
  children: ReactNode;
  className?: string;
}

export function BorderGlowCard({ children, className }: BorderGlowCardProps) {
  const gradientId = `border-glow-${useId()}`;

  return (
    <div className={cn('glass relative overflow-hidden rounded-2xl p-6', className)}>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ filter: 'drop-shadow(0 0 5px var(--color-accent))' }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-accent)" />
            <stop offset="33%" stopColor="var(--color-accent-2)" />
            <stop offset="66%" stopColor="var(--color-accent-3)" />
            <stop offset="100%" stopColor="var(--color-accent)" />
          </linearGradient>
        </defs>
        <motion.rect
          x={0}
          y={0}
          width="100%"
          height="100%"
          rx={16}
          ry={16}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={1.5}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="0.3 0.7"
          animate={{ strokeDashoffset: [0, -1] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
        />
      </svg>

      <div className="relative">{children}</div>
    </div>
  );
}
