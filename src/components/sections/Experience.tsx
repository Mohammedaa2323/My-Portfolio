import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { experience } from '@/data/experience';
import { fadeUp, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';

export function Experience() {
  return (
    <section id="experience" className="section-container py-24 md:py-32">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've made an impact"
        description="A track record of shipping products that matter, across teams and industries."
      />

      <div className="relative mt-16">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-border-strong)] to-transparent md:left-1/2 md:-translate-x-1/2" />

        <div className="flex flex-col gap-10">
          {experience.map((item, index) => (
            <motion.div
              key={item.role + item.company}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className={cn(
                'relative flex flex-col gap-4 pl-12 md:w-1/2 md:pl-0',
                index % 2 === 0 ? 'md:pr-12 md:self-start md:text-right' : 'md:pl-12 md:self-end',
              )}
            >
              <span
                className={cn(
                  'absolute left-2.5 top-1.5 h-3 w-3 rounded-full bg-[var(--color-accent-3)] ring-4 ring-[var(--color-bg)] md:top-1.5',
                  index % 2 === 0 ? 'md:left-auto md:-right-[7px]' : 'md:-left-[7px]',
                )}
              />

              <GlassCard>
                <div className={cn('flex flex-col gap-1', index % 2 === 0 && 'md:items-end')}>
                  <span className="text-xs font-medium uppercase tracking-widest text-[var(--color-accent-3)]">
                    {item.period}
                  </span>
                  <h3 className="text-lg font-semibold text-[var(--color-text)]">{item.role}</h3>
                  <span className="text-sm text-[var(--color-text-muted)]">
                    {item.company} · {item.location}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {item.description}
                </p>
                <ul className="mt-4 flex flex-col gap-2 text-left text-sm text-[var(--color-text-muted)]">
                  {item.highlights.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="text-[var(--color-accent)]">▹</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
