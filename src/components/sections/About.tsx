import { motion } from 'framer-motion';
import { Award, CalendarClock, Layers, Rocket, Sparkles, Target } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { TiltCard } from '@/components/ui/TiltCard';
import { certifications } from '@/data/certifications';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

const stats = [
  { label: 'Years of Experience', value: '2+', icon: CalendarClock },
  { label: 'Production Platforms Shipped', value: '5+', icon: Rocket },
  { label: 'Core Technologies', value: '20+', icon: Layers },
];

export function About() {
  return (
    <section id="about" className="section-container py-24 md:py-32">
      <SectionHeading
        eyebrow="About Me"
        title="Building reliable software with clean, scalable architecture"
        description="I'm a full-stack engineer who partners product ambition with production-grade backend engineering — from microservices and cloud infrastructure to AI-powered features that ship."
      />

      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-16 grid gap-6 md:grid-cols-2"
      >
        <motion.div variants={fadeUp}>
          <TiltCard className="h-full">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent-3)]">
              <Target size={18} />
            </div>
            <h3 className="text-lg font-semibold text-[var(--color-text)]">My Approach</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
              I design systems around performance and reliability from day one — microservices with
              Django and FastAPI, cloud-native deployment on AWS, and clean, maintainable code that
              scales with the product.
            </p>
          </TiltCard>
        </motion.div>
        <motion.div variants={fadeUp}>
          <TiltCard className="h-full">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent-3)]">
              <Sparkles size={18} />
            </div>
            <h3 className="text-lg font-semibold text-[var(--color-text)]">What I Bring</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
              Experience shipping AI-powered features end-to-end, live
              chat, and real-time alerts — backed by solid REST APIs, cloud infrastructure, and
              payment integrations.
            </p>
          </TiltCard>
        </motion.div>
      </motion.div>

      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={fadeUp}>
            <TiltCard className="text-center">
              <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent-3)]">
                <stat.icon size={16} />
              </div>
              <div className="text-2xl font-semibold text-gradient md:text-3xl">{stat.value}</div>
              <div className="mt-1 text-xs text-[var(--color-text-muted)]">{stat.label}</div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-8"
      >
        <GlassCard hover={false}>
          <h3 className="mb-4 text-lg font-semibold text-[var(--color-text)]">Certifications</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {certifications.map((cert) => (
              <div key={cert.title} className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-fill)] text-[var(--color-accent-3)]">
                  <Award size={16} />
                </div>
                <div>
                  <div className="text-sm font-medium text-[var(--color-text)]">{cert.title}</div>
                  <div className="text-xs text-[var(--color-text-dim)]">
                    {cert.issuer} · {cert.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
}
