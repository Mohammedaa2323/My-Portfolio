import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, ExternalLink, X } from 'lucide-react';
import type { PortfolioDocument } from '@/types';

export type ViewableDocument = PortfolioDocument & Required<Pick<PortfolioDocument, 'file' | 'downloadName'>>;

interface DocumentViewerProps {
  doc: ViewableDocument | null;
  onClose: () => void;
}

export function DocumentViewer({ doc, onClose }: DocumentViewerProps) {
  useEffect(() => {
    if (!doc) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [doc, onClose]);

  return (
    <AnimatePresence>
      {doc && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-6"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${doc.title} preview`}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong bg-[var(--color-menu-bg)] flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl"
          >
            <div className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] px-4 py-3">
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-[var(--color-text)]">{doc.title}</h3>
                <p className="truncate text-xs text-[var(--color-text-dim)]">{doc.issuer}</p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close preview"
                className="rounded-full p-2 text-[var(--color-text-muted)] hover:bg-[var(--color-fill)] hover:text-[var(--color-text)] cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {doc.format === 'pdf' ? (
              <iframe src={`${doc.file}#view=FitH`} title={doc.title} className="min-h-0 w-full flex-1 bg-white" />
            ) : (
              <div className="min-h-0 flex-1 overflow-auto bg-black/20 p-3">
                <img src={doc.file} alt={doc.title} className="mx-auto h-auto w-full max-w-2xl rounded-lg" />
              </div>
            )}

            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[var(--color-border)] px-4 py-3">
              <a
                href={doc.file}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[var(--color-text-muted)] hover:bg-[var(--color-fill)] hover:text-[var(--color-text)]"
              >
                <ExternalLink size={16} />
                Open in new tab
              </a>
              <a
                href={doc.file}
                download={doc.downloadName}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] px-5 py-2 text-sm font-medium text-white shadow-lg shadow-[var(--color-accent)]/20 transition-shadow hover:shadow-[var(--color-accent)]/40"
              >
                <Download size={16} />
                Download
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
