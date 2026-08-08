import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight, FolderGit2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/ui/TiltCard';
import { projects } from '@/data/projects';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

const pillVariants: Variants = {
  hidden: { opacity: 0, y: 14, rotate: -6, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 480, damping: 18 },
  },
};

function TagPill({ tag }: { tag: string }) {
  return (
    <motion.span
      variants={pillVariants}
      whileHover={{
        y: -3,
        rotate: [0, -3, 3, 0],
        transition: { rotate: { duration: 0.4, ease: 'easeInOut' }, y: { type: 'spring', stiffness: 400, damping: 12 } },
      }}
      className="group/pill relative inline-flex items-center overflow-hidden rounded-full border border-[var(--color-border)] bg-white/5 px-3 py-1 text-xs font-medium"
    >
      <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-3)] transition-transform duration-300 ease-out group-hover/pill:scale-x-100" />
      <span className="relative z-10 text-[var(--color-text-muted)] transition-colors duration-300 group-hover/pill:text-white">
        {tag}
      </span>
    </motion.span>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section-container py-24 md:py-32">
      <SectionHeading
        eyebrow="Featured Work"
        title="Projects I'm proud of"
        description="A selection of products I've designed and built end-to-end — from concept to production."
      />

      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-16 grid gap-6 md:grid-cols-2"
      >
        {projects.map((project) => (
          <motion.div key={project.title} variants={fadeUp}>
            <TiltCard shine={false} className="group flex h-full flex-col">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-accent)]/25 to-[var(--color-accent-3)]/15 text-[var(--color-accent-3)] transition-transform duration-300 group-hover:scale-110">
                  <FolderGit2 size={20} strokeWidth={1.5} />
                </div>
                {project.featured && (
                  <span className="text-[11px] font-medium uppercase tracking-widest text-[var(--color-accent-3)]">
                    Featured
                  </span>
                )}
              </div>

              <h3 className="mt-4 text-lg font-semibold text-[var(--color-text)]">{project.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {project.description}
              </p>

              <motion.div
                variants={staggerContainer(0.05)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="mt-4 flex flex-wrap gap-2"
              >
                {project.tags.map((tag) => (
                  <TagPill key={tag} tag={tag} />
                ))}
              </motion.div>

              <div className="mt-6 flex items-center gap-4 text-sm">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-[var(--color-text)] hover:text-[var(--color-accent-3)]"
                  >
                    {project.liveUrl.includes('play.google.com') ? 'App Link' : 'Live Site'}{' '}
                    <ArrowUpRight size={14} />
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                  >
                    <FaGithub size={14} /> Code
                  </a>
                )}
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
