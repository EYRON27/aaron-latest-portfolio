import { useState } from 'react';
import { Code2, Server, Database, Wrench, Users } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SKILL_CATEGORIES } from '../../data/portfolio';

// ← Edit skills in src/data/portfolio.ts → SKILL_CATEGORIES
const skillCategories = SKILL_CATEGORIES.map((cat, i) => ({
  ...cat,
  icon: [Code2, Server, Database, Wrench, Users][i] ?? Code2,
}));

const SkillPill = ({ skill, color, delay, parentVisible }: { skill: string; color: string; delay: number; parentVisible: boolean }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-full cursor-default select-none transition-all duration-700 ${parentVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}
      style={{
        transitionDelay: `${delay}ms`,
        border: `1px solid ${hovered ? color + '60' : 'rgba(128,128,128,0.2)'}`,
        color: hovered ? color : undefined,
        background: hovered ? color + '10' : 'transparent',
        transform: `${hovered ? 'translateY(-2px) scale(1.05)' : ''} ${parentVisible ? '' : 'translateY(16px) scale(0.95)'}`,
        boxShadow: hovered ? `0 8px 24px ${color}25` : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {skill}
    </span>
  );
};

const CategoryRow = ({ category, index }: { category: typeof skillCategories[0]; index: number }) => {
  const { ref, visible } = useScrollReveal(0.15);
  const [rowHovered, setRowHovered] = useState(false);
  const Icon = category.icon;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 pb-10 transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
      style={{ transitionDelay: `${index * 80}ms` }}
      onMouseEnter={() => setRowHovered(true)}
      onMouseLeave={() => setRowHovered(false)}
    >
      {/* Divider line with animated fill */}
      <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
        <div
          className="h-full transition-all duration-700"
          style={{
            background: `linear-gradient(90deg, ${category.color}60, transparent)`,
            width: visible ? '100%' : '0%',
            transitionDelay: `${index * 80 + 200}ms`,
          }}
        />
        <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800" style={{ zIndex: -1 }} />
      </div>

      {/* Category label */}
      <div
        className="flex items-center gap-3 sm:w-40 flex-shrink-0 pt-1 transition-all duration-300"
        style={{ transform: rowHovered ? 'translateX(4px)' : 'none' }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0"
          style={{
            background: rowHovered ? category.color + '20' : 'rgba(128,128,128,0.08)',
            border: `1px solid ${rowHovered ? category.color + '50' : 'transparent'}`,
            boxShadow: rowHovered ? `0 0 16px ${category.color}30` : 'none',
          }}
        >
          <Icon className="w-4 h-4 transition-colors duration-300" style={{ color: rowHovered ? category.color : undefined }} />
        </div>
        <span
          className="text-sm font-semibold tracking-wide uppercase transition-colors duration-300"
          style={{ color: rowHovered ? category.color : undefined }}
        >
          {category.title}
        </span>
      </div>

      {/* Skill pills */}
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, i) => (
          <SkillPill
            key={skill}
            skill={skill}
            color={category.color}
            delay={index * 80 + i * 60 + 150}
            parentVisible={visible}
          />
        ))}
      </div>
    </div>
  );
};

const SkillsFooter = () => {
  const { ref, visible } = useScrollReveal(0.2);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`mt-16 p-6 rounded-2xl relative overflow-hidden transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ border: '1px solid rgba(245,158,11,0.15)', background: 'rgba(245,158,11,0.03)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.5), transparent)' }} />
      <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed text-center max-w-2xl mx-auto">
        Currently deepening my expertise in <span className="text-amber-500 font-medium">React</span>, <span className="text-amber-500 font-medium">TypeScript</span>, and modern web development practices. Always eager to learn new tools and frameworks.
      </p>
    </div>
  );
};


const Skills = () => {
  const { ref: headRef, visible: headVisible } = useScrollReveal(0.1);

  return (
    <section id="skills" className="py-24 border-t border-neutral-200 dark:border-neutral-800 relative overflow-hidden">
      {/* Background orb */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={`transition-all duration-700 ${headVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="flex items-center gap-3 mb-12">
            <div className="h-px w-12 bg-amber-500" />
            <span className="text-amber-500 text-sm font-medium tracking-wider uppercase">Skills</span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-16 transition-all duration-700 ${headVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '100ms' }}
          >
            Tools &amp; technologies<span className="text-amber-500">.</span>
          </h2>
        </div>

        {/* Categories */}
        <div className="space-y-0">
          {skillCategories.map((cat, i) => (
            <CategoryRow key={cat.title} category={cat} index={i} />
          ))}
        </div>

        <SkillsFooter />

      </div>
    </section>
  );
};

export default Skills;
