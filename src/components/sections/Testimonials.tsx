import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { testimonials } from '@/data/testimonials';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function Testimonials() {
  return (
    <section id="testimonials" className="section-container py-24 md:py-32">
      <SectionHeading
        eyebrow="Testimonials"
        title="What people say about working with me"
        description="Feedback from teammates, clients, and collaborators."
      />

      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-16 grid gap-6 md:grid-cols-3"
      >
        {testimonials.map((testimonial) => (
          <motion.div key={testimonial.name} variants={fadeUp}>
            <GlassCard className="flex h-full flex-col">
              <Quote size={28} className="text-[var(--color-accent)]/50" />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
                "{testimonial.quote}"
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)] text-xs font-semibold text-white">
                  {initials(testimonial.name)}
                </div>
                <div>
                  <div className="text-sm font-medium text-[var(--color-text)]">{testimonial.name}</div>
                  <div className="text-xs text-[var(--color-text-dim)]">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
