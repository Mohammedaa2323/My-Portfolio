import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { techShowcase, type TechShowcaseItem } from '@/data/techShowcase';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

const TOTAL = techShowcase.length;

export function TechShowcase() {
  const prefersReducedMotion = useReducedMotion();
  return prefersReducedMotion ? <StaticShowcase /> : <ScrollShowcase />;
}

function ScrollShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  return (
    <section id="toolkit" aria-label="My toolkit">
      {/* Each technology gets ~70vh of scroll while the stage stays pinned. */}
      <div ref={containerRef} className="relative" style={{ height: `${TOTAL * 70 + 100}vh` }}>
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
          <div className="section-container mb-4 text-center md:mb-6">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-3)]">
              My Toolkit
            </span>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--color-text)] md:text-4xl">
              The stack I build with
            </h2>
          </div>

          <div className="relative aspect-square w-[min(88vw,62vh)]">
            {techShowcase.map((item, index) => (
              <OrbitIcon key={item.name} item={item} index={index} progress={scrollYProgress} />
            ))}
            {techShowcase.map((item, index) => (
              <TechSlide key={item.name} item={item} index={index} progress={scrollYProgress} />
            ))}
          </div>

          <ProgressBar progress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}

interface ItemProps {
  item: TechShowcaseItem;
  index: number;
  progress: MotionValue<number>;
}

function TechSlide({ item, index, progress }: ItemProps) {
  const start = index / TOTAL;
  const end = (index + 1) / TOTAL;
  const fade = (end - start) * 0.3;
  const isLast = index === TOTAL - 1;

  const opacity = useTransform(progress, [start, start + fade, end - fade, end], [0, 1, 1, isLast ? 1 : 0]);
  const scale = useTransform(progress, [start, start + fade, end - fade, end], [0.5, 1, 1, isLast ? 1 : 1.35]);
  const rotate = useTransform(progress, [start, start + fade], [-25, 0]);
  const blur = useTransform(progress, [start, start + fade, end - fade, end], [12, 0, 0, isLast ? 0 : 12]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const Icon = item.icon;

  return (
    <motion.div
      style={{ opacity, scale, filter }}
      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center"
    >
      <motion.div style={{ rotate }} className="relative">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 scale-150 rounded-full opacity-40 blur-3xl"
          style={{ backgroundColor: item.color }}
        />
        <Icon
          className="h-[min(28vw,18vh)] w-[min(28vw,18vh)]"
          style={{ color: item.color, filter: `drop-shadow(0 0 24px ${item.color}80)` }}
        />
      </motion.div>
      <h3 className="mt-5 text-2xl font-semibold text-[var(--color-text)] md:text-3xl">{item.name}</h3>
      <p className="mt-2 max-w-[16rem] text-sm text-[var(--color-text-muted)] md:max-w-xs">{item.caption}</p>
    </motion.div>
  );
}

function OrbitIcon({ item, index, progress }: ItemProps) {
  const angle = (index / TOTAL) * Math.PI * 2 - Math.PI / 2;
  const left = 50 + 46 * Math.cos(angle);
  const top = 50 + 46 * Math.sin(angle);
  const start = index / TOTAL;

  // Dim until its turn, then stays lit so the ring fills up as you scroll.
  const opacity = useTransform(progress, [start, start + 0.6 / TOTAL], [0.15, 1]);
  const scale = useTransform(progress, [start, start + 0.6 / TOTAL], [0.7, 1]);
  const Icon = item.icon;

  return (
    <motion.div
      style={{ left: `${left}%`, top: `${top}%`, opacity, scale }}
      className="glass absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl md:h-12 md:w-12"
      title={item.name}
    >
      <Icon className="h-5 w-5 md:h-6 md:w-6" style={{ color: item.color }} />
    </motion.div>
  );
}

function ProgressBar({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="mt-6 h-1 w-40 overflow-hidden rounded-full bg-[var(--color-fill)] md:mt-8 md:w-56">
      <motion.div
        style={{ scaleX: progress }}
        className="h-full origin-left rounded-full bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-2)] to-[var(--color-accent-3)]"
      />
    </div>
  );
}

/** Shown instead of the scroll animation when the visitor prefers reduced motion. */
function StaticShowcase() {
  return (
    <section id="toolkit" className="section-container py-24 md:py-32">
      <SectionHeading eyebrow="My Toolkit" title="The stack I build with" />
      <motion.ul
        variants={staggerContainer(0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto mt-12 grid max-w-4xl grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6"
      >
        {techShowcase.map(({ name, icon: Icon, color }) => (
          <motion.li key={name} variants={fadeUp} className="glass flex flex-col items-center gap-2 rounded-2xl p-4">
            <Icon className="h-8 w-8" style={{ color }} />
            <span className="text-center text-xs text-[var(--color-text-muted)]">{name}</span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
