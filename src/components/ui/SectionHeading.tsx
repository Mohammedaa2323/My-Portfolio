import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '@/lib/motion';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ eyebrow, title, description, align = 'center' }: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={align === 'center' ? 'text-center mx-auto max-w-2xl' : 'text-left max-w-2xl'}
    >
      <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-accent-3)] mb-3">
        {eyebrow}
      </span>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--color-text)]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[var(--color-text-muted)] text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
