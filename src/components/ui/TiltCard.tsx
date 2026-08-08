import { type PointerEvent as ReactPointerEvent, type ReactNode, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  onHoverChange?: (isHovered: boolean) => void;
  shine?: boolean;
}

export function TiltCard({ children, className, onHoverChange, shine = true }: TiltCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const setHovered = (value: boolean) => {
    setIsHovered(value);
    onHoverChange?.(value);
  };
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 20, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 20, mass: 0.4 });
  const rotateX = useTransform(springY, [0, 1], [8, -8]);
  const rotateY = useTransform(springX, [0, 1], [-8, 8]);
  const spotlight = useTransform(
    [springX, springY],
    ([x, y]) =>
      `radial-gradient(220px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(124,92,255,0.18), transparent 75%)`,
  );

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handlePointerLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setHovered(false);
  };

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={handlePointerLeave}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="relative"
    >
      {/* soft ambient glow */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: isHovered ? 0.55 : 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="pointer-events-none absolute -inset-3 -z-10 rounded-[28px] blur-2xl"
        style={{ background: 'radial-gradient(circle, var(--color-accent), transparent 70%)' }}
      />

      <motion.div
        animate={{
          borderColor: isHovered ? 'rgba(124,92,255,0.45)' : 'var(--color-border)',
          boxShadow: isHovered
            ? '0 20px 45px -15px rgba(124,92,255,0.25)'
            : '0 0px 0px 0px rgba(124,92,255,0)',
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className={cn('glass relative overflow-hidden rounded-2xl p-6', className)}
      >
        {/* cursor-follow spotlight */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: spotlight }}
        />

        {/* diagonal shine sweep */}
        {shine && (
          <motion.div
            aria-hidden="true"
            initial={false}
            animate={{ x: isHovered ? '220%' : '-40%' }}
            transition={{ duration: 0.85, ease: 'easeInOut' }}
            className="pointer-events-none absolute inset-y-0 left-0 w-1/4 -skew-x-12"
            style={{
              background:
                'linear-gradient(to right, transparent, rgba(255,255,255,0.14), transparent)',
            }}
          />
        )}

        <div className="relative" style={{ transform: 'translateZ(20px)' }}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
