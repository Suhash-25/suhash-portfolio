import React, { useState } from 'react';
import { Brain, Code2, Database, Layers, Sparkles, Search } from 'lucide-react';
import { skillCategories } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';
import { sounds } from '../utils/soundEffects';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Brain className="w-4 h-4 text-slate-800 dark:text-slate-300" />;
      case 1:
        return <Code2 className="w-4 h-4 text-slate-800 dark:text-slate-300" />;
      case 2:
        return <Database className="w-4 h-4 text-slate-800 dark:text-slate-300" />;
      case 3:
        return <Layers className="w-4 h-4 text-slate-800 dark:text-slate-300" />;
      default:
        return <Sparkles className="w-4 h-4 text-slate-800 dark:text-slate-300" />;
    }
  };

  const handleCategoryChange = (idx: number) => {
    sounds.playClick();
    setSelectedCategory(idx);
    setSearchTerm('');
  };

  const currentCategory = skillCategories[selectedCategory];

  const filteredSkills = currentCategory.skills.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.highlight.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="skills" className="py-24 relative bg-slate-100/60 dark:bg-slate-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-300 text-xs font-mono mb-3 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            Skill Matrix & <span className="text-slate-700 dark:text-slate-300">Engineering Arsenal</span>
          </h2>
          <p className="text-slate-800 dark:text-slate-300 text-sm sm:text-base mt-2 font-normal leading-relaxed">
            A comprehensive overview of competencies across Machine Learning pipelines, agentic orchestration, robotics simulation, and high-concurrency backend services.
          </p>
        </div>

        {/* Category Tabs & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 shadow-sm">
            {skillCategories.map((cat, idx) => (
              <button
                key={cat.category}
                onClick={() => handleCategoryChange(idx)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs transition-all text-left font-bold ${
                  selectedCategory === idx
                    ? 'bg-slate-900 text-white dark:bg-slate-800 dark:text-white shadow-sm border border-slate-900 dark:border-slate-700'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                {getIcon(idx)}
                <span className="truncate">{cat.category}</span>
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search skills, tools, frameworks..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:border-slate-500 transition-colors shadow-sm font-medium"
            />
          </div>
        </div>

        {/* Skills Cards Grid with SpotlightCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill) => (
            <SpotlightCard
              key={skill.name}
              className="brutal-card p-5 rounded-2xl bg-white dark:bg-slate-900/70 border-2 border-slate-300 dark:border-slate-800 hover:border-slate-500 dark:hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-display font-bold text-slate-900 dark:text-white text-base">
                  {skill.name}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mb-3">
                <div
                  className="bg-slate-900 dark:bg-slate-300 h-full rounded-full transition-all duration-500"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                {skill.highlight}
              </p>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </section>
  );
};
