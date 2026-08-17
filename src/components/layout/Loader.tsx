import { AnimatePresence, motion } from 'framer-motion';
import { site } from '@/data/site';
import { staggerContainer, wordUp } from '@/lib/motion';

export function Loader({ isLoading }: { isLoading: boolean }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-bg)]"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center justify-center gap-x-2 text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              <motion.span variants={wordUp} className="text-[var(--color-text-muted)]">
                Hey, I&apos;m
              </motion.span>
              <motion.span variants={wordUp} className="text-gradient">
                {site.name}
              </motion.span>
            </motion.div>

            <div className="relative h-[2px] w-40 overflow-hidden rounded-full bg-[var(--color-fill-strong)]">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-3)]"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
