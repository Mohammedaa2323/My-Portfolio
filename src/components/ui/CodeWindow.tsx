import { useEffect, useState, type ReactNode } from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';

interface Token {
  text: string;
  className: string;
}

interface CodeLine {
  tokens: Token[];
}

const KEYWORD = 'text-[var(--color-accent-2)]';
const STRING = 'text-[var(--color-accent-3)]';
const IDENT = 'text-[var(--color-text)]';
const MUTED = 'text-[var(--color-text-muted)]';

const CODE_LINES: CodeLine[] = [
  { tokens: [{ text: 'class ', className: KEYWORD }, { text: 'Engineer', className: IDENT }, { text: ':', className: MUTED }] },
  { tokens: [{ text: '    name = ', className: MUTED }, { text: '"Mohammed A A"', className: STRING }] },
  { tokens: [{ text: '    role = ', className: MUTED }, { text: '"Full-Stack Developer"', className: STRING }] },
  { tokens: [{ text: '    stack = [', className: MUTED }] },
  { tokens: [{ text: '        ', className: MUTED }, { text: '"Python", "Django", "FastAPI", "AWS",', className: STRING }] },
  { tokens: [{ text: '    ]', className: MUTED }] },
  { tokens: [] },
  { tokens: [{ text: '    experience = ', className: MUTED }, { text: '"2+ years"', className: STRING }] },
  { tokens: [] },
  { tokens: [{ text: '    def ', className: KEYWORD }, { text: 'build', className: IDENT }, { text: '(self):', className: MUTED }] },
  { tokens: [{ text: '        return ', className: KEYWORD }, { text: '"scalable, production-ready apps"', className: STRING }] },
];

const LINE_LENGTHS = CODE_LINES.map((line) => line.tokens.reduce((sum, t) => sum + t.text.length, 0));
const LAST_LINE = CODE_LINES.length - 1;

function renderTokens(tokens: Token[], count: number): ReactNode {
  if (tokens.length === 0) return ' ';
  let used = 0;
  const nodes: ReactNode[] = [];
  for (const tok of tokens) {
    if (used >= count) break;
    const slice = tok.text.slice(0, Math.max(0, count - used));
    if (slice) nodes.push(
      <span key={nodes.length} className={tok.className}>
        {slice}
      </span>,
    );
    used += tok.text.length;
  }
  return nodes.length ? nodes : ' ';
}

interface CodeWindowProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

export function CodeWindow({ mouseX, mouseY }: CodeWindowProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-4, 4]);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(query.matches);
    const onChange = () => setReduceMotion(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setLineIndex(LAST_LINE);
      setCharIndex(LINE_LENGTHS[LAST_LINE]);
      return;
    }

    const currentLength = LINE_LENGTHS[lineIndex] ?? 0;

    if (charIndex < currentLength) {
      const id = window.setTimeout(() => setCharIndex((c) => c + 1), 26);
      return () => window.clearTimeout(id);
    }

    if (lineIndex < LAST_LINE) {
      const id = window.setTimeout(() => {
        setLineIndex((l) => l + 1);
        setCharIndex(0);
      }, 220);
      return () => window.clearTimeout(id);
    }

    const id = window.setTimeout(() => {
      setLineIndex(0);
      setCharIndex(0);
    }, 3200);
    return () => window.clearTimeout(id);
  }, [charIndex, lineIndex, reduceMotion]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="relative w-full max-w-md"
    >
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-accent), transparent 70%)' }}
      />

      <div className="glass-strong overflow-hidden rounded-2xl shadow-2xl shadow-[var(--color-accent)]/10">
        <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
          <span className="ml-2 text-xs text-[var(--color-text-dim)]">engineer.py</span>
        </div>

        <pre className="overflow-x-auto p-5 text-left font-mono text-[12px] leading-relaxed sm:text-[13px]">
          <code>
            {CODE_LINES.map((line, i) => (
              <div key={i} className={i > lineIndex ? 'opacity-0' : undefined}>
                {i === lineIndex
                  ? renderTokens(line.tokens, charIndex)
                  : renderTokens(line.tokens, Infinity)}
                {i === lineIndex && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.9, repeat: Infinity }}
                    className="-mb-[2px] ml-[1px] inline-block h-[1em] w-[2px] bg-[var(--color-accent-3)] align-middle"
                  />
                )}
              </div>
            ))}
          </code>
        </pre>
      </div>
    </motion.div>
  );
}
