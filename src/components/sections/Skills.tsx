import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/ui/TiltCard';
import { skillCategories } from '@/data/skills';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

function SkillBar({ name, level, isHovered }: { name: string; level: number; isHovered: boolean }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-[var(--color-text)]">{name}</span>
        <span className="text-[var(--color-text-dim)]">{isHovered ? level : 0}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-fill)]">
        <motion.div
          animate={{ width: isHovered ? `${level}%` : '0%' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-3)]"
        />
      </div>
    </div>
  );
}

function SkillCategoryCard({ category }: { category: (typeof skillCategories)[number] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TiltCard className="h-full" onHoverChange={setIsHovered}>
      <h3 className="mb-6 text-lg font-semibold text-[var(--color-text)]">{category.category}</h3>
      <div className="flex flex-col gap-5">
        {category.skills.map((skill) => (
          <SkillBar key={skill.name} name={skill.name} level={skill.level} isHovered={isHovered} />
        ))}
      </div>
    </TiltCard>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section-container py-24 md:py-32">
      <SectionHeading
        eyebrow="Skills"
        title="A toolkit built for shipping quality products"
        description="From interface to infrastructure, here's what I bring to every project."
      />

      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-16 grid gap-6 md:grid-cols-3"
      >
        {skillCategories.map((category) => (
          <motion.div key={category.category} variants={fadeUp}>
            <SkillCategoryCard category={category} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
