import { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, ChevronRight, FileText } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DocumentViewer } from '@/components/ui/DocumentViewer';
import { documents } from '@/data/documents';
import { site } from '@/data/site';
import { goTo } from '@/hooks/usePathname';
import { fadeUp, staggerContainer } from '@/lib/motion';
import type { ViewableDocument } from '@/components/ui/DocumentViewer';

export function ResumePage() {
  const [active, setActive] = useState<ViewableDocument | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <section id="resume" className="section-container min-h-screen pt-32 pb-24 md:pt-40 md:pb-32">
      <Helmet>
        <title>{`Resume & Certificates — ${site.name}`}</title>
      </Helmet>

      <button
        onClick={() => goTo('/')}
        className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] cursor-pointer"
      >
        <ArrowLeft size={16} />
        Back to home
      </button>

      <SectionHeading
        eyebrow="Resume"
        title="Resume & certificates"
        description="Select a document to preview it, then download it from the preview."
      />

      <motion.ul
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate="visible"
        className="mx-auto mt-14 flex max-w-3xl flex-col gap-4"
      >
        {documents.map((doc) => {
          const Icon = doc.kind === 'resume' ? FileText : Award;
          const { file, downloadName } = doc;
          const details = (
            <>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-fill)] text-[var(--color-accent-3)]">
                <Icon size={22} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-[var(--color-text)]">{doc.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{doc.issuer}</p>
                <p className="mt-0.5 text-xs text-[var(--color-text-dim)]">{doc.date}</p>
              </div>
            </>
          );

          return (
            <motion.li key={doc.title} variants={fadeUp}>
              {file && downloadName ? (
                <button
                  onClick={() => setActive({ ...doc, file, downloadName })}
                  className="glass group flex w-full items-center gap-4 rounded-2xl p-5 text-left transition-shadow hover:shadow-2xl hover:shadow-[var(--color-accent)]/10 cursor-pointer"
                >
                  {details}
                  <span className="hidden text-sm font-medium text-[var(--color-accent-3)] sm:inline">View</span>
                  <ChevronRight
                    size={20}
                    className="shrink-0 text-[var(--color-text-muted)] transition-transform group-hover:translate-x-1"
                  />
                </button>
              ) : (
                <div className="glass flex w-full items-center gap-4 rounded-2xl p-5">{details}</div>
              )}
            </motion.li>
          );
        })}
      </motion.ul>

      <DocumentViewer doc={active} onClose={close} />
    </section>
  );
}
