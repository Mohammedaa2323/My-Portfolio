import { useEffect, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { site } from '@/data/site';
import { fadeUp, viewportOnce } from '@/lib/motion';

type Status = 'idle' | 'submitting' | 'success' | 'mailto' | 'error';

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (status !== 'success' && status !== 'mailto' && status !== 'error') return;
    const id = window.setTimeout(() => setStatus('idle'), 10000);
    return () => window.clearTimeout(id);
  }, [status]);

  useEffect(() => {
    if (Object.keys(errors).length === 0) return;
    const id = window.setTimeout(() => setErrors({}), 5000);
    return () => window.clearTimeout(id);
  }, [errors]);

  const validate = (data: FormData) => {
    const nextErrors: Record<string, string> = {};
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    if (name.length < 2) nextErrors.name = 'Please enter your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Enter a valid email';
    if (message.length < 10) nextErrors.message = 'Message should be at least 10 characters';

    return nextErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const nextErrors = validate(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('submitting');

    // Requires a form backend (e.g. Formspree, Web3Forms) via VITE_FORM_ENDPOINT — falls back to mailto.
    if (!FORM_ENDPOINT) {
      const subject = encodeURIComponent(`Portfolio Contact from ${data.get('name')}`);
      const body = encodeURIComponent(String(data.get('message')));
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus('mailto');
      form.reset();
      return;
    }

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section-container py-24 md:py-32">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something great together"
        description="Have a project in mind or just want to say hi? My inbox is always open."
      />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-5"
      >
        <div className="flex flex-col gap-4 md:col-span-2">
          <GlassCard hover={false} className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-fill)] text-[var(--color-accent-3)]">
              <Mail size={18} />
            </div>
            <div>
              <div className="text-xs text-[var(--color-text-dim)]">Email</div>
              <div className="text-sm font-medium text-[var(--color-text)]">{site.email}</div>
            </div>
          </GlassCard>
          <GlassCard hover={false} className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-fill)] text-[var(--color-accent-3)]">
              <Phone size={18} />
            </div>
            <div>
              <div className="text-xs text-[var(--color-text-dim)]">Phone</div>
              <div className="text-sm font-medium text-[var(--color-text)]">{site.phone}</div>
            </div>
          </GlassCard>
          <GlassCard hover={false} className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-fill)] text-[var(--color-accent-3)]">
              <MapPin size={18} />
            </div>
            <div>
              <div className="text-xs text-[var(--color-text-dim)]">Location</div>
              <div className="text-sm font-medium text-[var(--color-text)]">{site.location}</div>
            </div>
          </GlassCard>
        </div>

        <GlassCard hover={false} className="md:col-span-3">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <input
                  name="name"
                  placeholder="Your name"
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-fill)] px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] outline-none transition-colors focus:border-[var(--color-accent)]"
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-1 text-xs text-red-400"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-fill)] px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] outline-none transition-colors focus:border-[var(--color-accent)]"
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-1 text-xs text-red-400"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div>
              <textarea
                name="message"
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full resize-none rounded-xl border border-[var(--color-border)] bg-[var(--color-fill)] px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] outline-none transition-colors focus:border-[var(--color-accent)]"
              />
              <AnimatePresence>
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-1 text-xs text-red-400"
                  >
                    {errors.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <Button type="submit" disabled={status === 'submitting'} className="w-full sm:w-auto">
              {status === 'submitting' ? 'Sending...' : (
                <>
                  Send Message <Send size={15} />
                </>
              )}
            </Button>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-2 text-sm text-emerald-400"
                >
                  <CheckCircle2 size={16} /> Thanks! I'll get back to you soon.
                </motion.div>
              )}
              {status === 'mailto' && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-2 text-sm text-emerald-400"
                >
                  <CheckCircle2 size={16} /> Your email app should now be open with the message ready — hit send there to reach me.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-2 text-sm text-red-400"
                >
                  <AlertCircle size={16} /> Something went wrong. Please try again.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </GlassCard>
      </motion.div>
    </section>
  );
}
