import React, { useState } from 'react';
import { ExternalLink, Github, Sparkles, ArrowUpRight, Cpu, CheckCircle2 } from 'lucide-react';
import { projects } from '../data/portfolioData';
import { Project } from '../types';
import { SpotlightCard } from './SpotlightCard';
import { sounds } from '../utils/soundEffects';

interface ProjectsProps {
  onOpenModal: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenModal }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Agentic AI & LLMs',
    'Voice & NLP',
    'Autonomous & Robotics',
    'IoT & Security'
  ];

  const handleCategoryChange = (cat: string) => {
    sounds.playClick();
    setActiveCategory(cat);
  };

  const handleOpenArchitecture = (p: Project) => {
    sounds.playPop();
    onOpenModal(p);
  };

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-300 text-xs font-mono mb-3 font-bold">
              <Cpu className="w-3.5 h-3.5 text-blue-600 dark:text-slate-400" />
              <span>PORTFOLIO SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Systems & <span className="text-slate-700 dark:text-slate-300">Architectures</span>
            </h2>
            <p className="text-slate-800 dark:text-slate-300 text-sm sm:text-base mt-2 font-normal leading-relaxed">
              Autonomous agents, transformer models, planetary reinforcement learning, and edge intelligence engineered for high accuracy and minimal latency.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 self-start md:self-auto shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white dark:bg-slate-800 dark:text-white shadow-sm border border-slate-900 dark:border-slate-700'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid with Spotlight Card Tracking */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <SpotlightCard
              key={project.id}
              className="brutal-card group relative rounded-2xl bg-white dark:bg-slate-900/70 border-2 border-slate-300 dark:border-slate-800 hover:border-slate-500 dark:hover:border-slate-700 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div>
                {/* Top Pill & Year */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600 dark:text-slate-400 font-bold">
                    <span>{project.year}</span>
                    {project.liveUrl && (
                      <span className="flex h-2 w-2 relative" title="Live Deployment Active">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-slate-200 transition-colors mb-2">
                  {project.title}
                </h3>

                {/* Tagline */}
                <p className="text-xs font-mono text-slate-800 dark:text-slate-200 mb-3 font-bold">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed font-normal">
                  {project.description}
                </p>

                {/* Metrics Highlights */}
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-950/70 border border-slate-300 dark:border-slate-800">
                      <div className="text-[10px] font-mono text-slate-600 dark:text-slate-400 uppercase font-bold">{m.label}</div>
                      <div className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Key Bullet Highlights */}
                <ul className="space-y-1.5 mb-5 text-[11px] text-slate-800 dark:text-slate-300 font-medium">
                  {project.highlights.slice(0, 2).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-5 pt-2 border-t border-slate-200 dark:border-slate-800">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700 font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-600 dark:text-slate-400 font-semibold">
                      +{project.technologies.length - 5}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-2 pt-2">
                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sounds.playClick()}
                      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-700 transition-colors shadow-sm"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sounds.playSuccess()}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 hover:bg-emerald-200 dark:hover:bg-emerald-900/60 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-bold transition-colors shadow-sm"
                        title="Live Production Deployment"
                      >
                        <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        <span>Live Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => handleOpenArchitecture(project)}
                    className="flex items-center gap-1 text-xs font-mono text-slate-900 dark:text-slate-200 hover:underline font-bold group/btn"
                  >
                    <span>Architecture</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </section>
  );
};
