import { motion } from 'framer-motion';
import { ArrowUpRight, FolderGit2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { projects } from '@/data/projects';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

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
            <GlassCard className="group flex h-full flex-col overflow-hidden p-0">
              <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--color-accent)]/20 via-[var(--color-accent-2)]/10 to-transparent">
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                  }}
                />
                <FolderGit2
                  size={48}
                  strokeWidth={1.2}
                  className="relative text-[var(--color-text-muted)] transition-transform duration-500 group-hover:scale-110 group-hover:text-[var(--color-accent-3)]"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-[var(--color-text)]">{project.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>

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
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
