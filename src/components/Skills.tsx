import React, { useState } from 'react';
import { Brain, Code2, Database, Layers, Sparkles, Check, Search } from 'lucide-react';
import { skillCategories } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Brain className="w-5 h-5 text-indigo-400" />;
      case 1:
        return <Code2 className="w-5 h-5 text-cyan-400" />;
      case 2:
        return <Database className="w-5 h-5 text-emerald-400" />;
      case 3:
        return <Layers className="w-5 h-5 text-purple-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-indigo-400" />;
    }
  };

  const currentCategory = skillCategories[selectedCategory];

  const filteredSkills = currentCategory.skills.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.highlight.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="skills" className="py-24 relative bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Skill Matrix & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Engineering Arsenal</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            A comprehensive overview of competencies across Machine Learning pipelines, agentic orchestration, robotics simulation, and high-concurrency backend services.
          </p>
        </div>

        {/* Category Tabs & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-white/[0.08] backdrop-blur-md">
            {skillCategories.map((cat, idx) => (
              <button
                key={cat.category}
                onClick={() => {
                  setSelectedCategory(idx);
                  setSearchTerm('');
                }}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                  selectedCategory === idx
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {getIcon(idx)}
                <span className="truncate">{cat.category}</span>
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search skills, libraries, tools..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="group p-5 rounded-2xl bg-gradient-to-b from-slate-900/70 to-slate-950/90 border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-display font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                  {skill.name}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
                  {skill.experienceYears}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 mb-3">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Proficiency</span>
                  <span className="text-cyan-300 font-semibold">{skill.level}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>

              {/* Highlight / Specialization */}
              <div className="flex items-start gap-2 pt-2 border-t border-white/5">
                <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {skill.highlight}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 text-slate-500 font-mono text-xs">
            No matching skills found for "{searchTerm}". Try another query or clear the filter.
          </div>
        )}

        {/* Bottom Highlight Badges */}
        <div className="mt-14 p-6 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-display font-semibold text-sm">Agentic Workflows & Tool-Calling Integration</div>
              <div className="text-slate-400 text-xs">Specialized in autonomous multi-agent systems, ReAct loop execution, and LLM APIs.</div>
            </div>
          </div>

          <a
            href="#projects"
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors"
          >
            See Real Projects in Action
          </a>
        </div>

      </div>
    </section>
  );
};
