import { useEffect, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { CodeWindow } from '@/components/ui/CodeWindow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RotatingWord } from '@/components/ui/RotatingWord';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { staggerContainer, fadeUp, wordUp } from '@/lib/motion';

const HEADLINE_WORDS = ['Full-Stack', 'Engineer', 'Building'];
const ROTATING_ACCENTS = [
  'Ideas into Reality',
  'Intelligent Systems',
  'Cloud Infrastructure',
  'Scalable Solutions',
  'Real-World Impact',
];

export function Hero() {
  const [isPointerFine, setIsPointerFine] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsPointerFine(query.matches);
    const onChange = () => setIsPointerFine(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const spotlightBg = useTransform([springX, springY], ([x, y]) =>
    `radial-gradient(600px circle at ${50 + (x as number) * 60}% ${50 + (y as number) * 60}%, rgba(124,92,255,0.16), transparent 70%)`,
  );

  const scrollTo = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  const handlePointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (!isPointerFine) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="home"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative flex min-h-screen items-center overflow-hidden py-24"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-[1]"
        style={{ background: spotlightBg }}
      />

      <div className="section-container grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          animate="visible"
          style={{ rotateX, rotateY, transformPerspective: 800 }}
          className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left"
        >
          <motion.div
            variants={fadeUp}
            className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-[var(--color-text-muted)]"
          >
            <motion.span
              animate={{ opacity: [1, 0.35, 1], scale: [1, 0.85, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="h-2 w-2 rounded-full bg-[var(--color-accent-3)]"
            />
            Available for work
          </motion.div>

          <motion.h1
            variants={staggerContainer(0.07, 0)}
            aria-label={`Full-Stack Engineer Building ${ROTATING_ACCENTS.join(', ')}`}
            className="max-w-xl font-semibold tracking-tight text-[var(--color-text)]"
          >
            <span aria-hidden="true">
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                {HEADLINE_WORDS.map((word) => (
                  <motion.span key={word} variants={wordUp} className="mr-[0.25em] inline-block last:mr-0">
                    {word}
                  </motion.span>
                ))}
              </span>
              <motion.span
                variants={wordUp}
                className="mt-1 block text-xl sm:mt-2 sm:text-3xl md:text-4xl lg:text-4xl"
              >
                <RotatingWord words={ROTATING_ACCENTS} />
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-md text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg"
          >
            2+ years turning ideas into production-grade software.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <MagneticButton>
              <Button onClick={() => scrollTo('#projects')}>View My Work</Button>
            </MagneticButton>
            <MagneticButton>
              <Button variant="secondary" onClick={() => scrollTo('#contact')}>
                Get In Touch
              </Button>
            </MagneticButton>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-12">
            <SocialLinks />
          </motion.div>
        </motion.div>

        <div className="hidden lg:order-2 lg:flex lg:justify-end">
          <CodeWindow mouseX={springX} mouseY={springY} />
        </div>
      </div>
    </section>
  );
}
