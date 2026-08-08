import { motion } from 'framer-motion';
import { Code2, Palette, Lightbulb, Gauge, type LucideIcon } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { services } from '@/data/services';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Palette,
  Lightbulb,
  Gauge,
};

export function Services() {
  return (
    <section id="services" className="section-container py-24 md:py-32">
      <SectionHeading
        eyebrow="Services"
        title="How I can help your team"
        description="Flexible engagement, from a single feature to a full product build."
      />

      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {services.map((service) => {
          const Icon = iconMap[service.icon] ?? Code2;
          return (
            <motion.div key={service.title} variants={fadeUp}>
              <GlassCard className="h-full">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent-3)]/10 text-[var(--color-accent-3)]">
                  <Icon size={20} />
                </div>
                <h3 className="text-base font-semibold text-[var(--color-text)]">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {service.description}
                </p>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
