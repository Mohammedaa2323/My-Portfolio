import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, [role="button"], [data-cursor-hover]';

export function CustomCursor() {
  const [isPointerFine, setIsPointerFine] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const dotX = useSpring(cursorX, { damping: 32, stiffness: 900, mass: 0.4 });
  const dotY = useSpring(cursorY, { damping: 32, stiffness: 900, mass: 0.4 });
  const ringX = useSpring(cursorX, { damping: 28, stiffness: 260, mass: 0.6 });
  const ringY = useSpring(cursorY, { damping: 28, stiffness: 260, mass: 0.6 });

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsPointerFine(query.matches);
    const onChange = () => setIsPointerFine(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!isPointerFine) return;

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };
    const handleOver = (e: MouseEvent) => {
      setIsHovering(Boolean((e.target as HTMLElement).closest(INTERACTIVE_SELECTOR)));
    };
    const handleLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseover', handleOver);
    document.documentElement.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
      document.documentElement.removeEventListener('mouseleave', handleLeave);
    };
  }, [isPointerFine, cursorX, cursorY]);

  if (!isPointerFine) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[200] h-2 w-2 rounded-full bg-[var(--color-accent-3)]"
        style={{ x: dotX, y: dotY, translate: '-50% -50%', opacity: isVisible ? 1 : 0 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[200] rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translate: '-50% -50%',
          borderColor: 'var(--color-accent)',
          opacity: isVisible ? (isHovering ? 0.9 : 0.45) : 0,
        }}
        animate={{
          width: isHovering ? 52 : 30,
          height: isHovering ? 52 : 30,
          backgroundColor: isHovering ? 'rgba(124, 92, 255, 0.12)' : 'rgba(124, 92, 255, 0)',
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />
    </>
  );
}
