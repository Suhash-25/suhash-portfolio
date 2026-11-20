import React, { useState } from 'react';
import { ExternalLink, Github, Sparkles, ArrowUpRight, Cpu, CheckCircle2 } from 'lucide-react';
import { projects } from '../data/portfolioData';
import { Project } from '../types';

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

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>PORTFOLIO SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
              Featured Systems & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Architectures</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Autonomous agents, transformer models, planetary reinforcement learning, and edge intelligence engineered for high accuracy and minimal latency.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`group relative rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/90 border border-white/[0.08] hover:border-indigo-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-500/10 ${
                project.featured ? 'md:col-span-1 lg:col-span-1' : ''
              }`}
            >
              <div>
                {/* Top Pill & Year */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-indigo-500/15 text-indigo-300 border border-indigo-500/25">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
                    <span>{project.year}</span>
                    {project.liveUrl && (
                      <span className="flex h-2 w-2 relative" title="Live Deployment Active">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-display font-bold text-white group-hover:text-indigo-300 transition-colors mb-2">
                  {project.title}
                </h3>

                {/* Tagline */}
                <p className="text-xs font-mono text-cyan-300/90 mb-3">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-slate-400 text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Metrics Highlights */}
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-black/30 border border-white/5">
                      <div className="text-[10px] font-mono text-slate-400 uppercase">{m.label}</div>
                      <div className="text-xs font-bold text-white mt-0.5">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Key Bullet Highlights */}
                <ul className="space-y-1.5 mb-5 text-[11px] text-slate-300">
                  {project.highlights.slice(0, 2).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6 pt-2 border-t border-white/5">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-slate-400 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-500">
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
                      className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition-colors"
                        title="Live Production Deployment"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => onOpenModal(project)}
                    className="flex items-center gap-1 text-xs font-mono text-indigo-400 hover:text-indigo-300 group/btn"
                  >
                    <span>Architecture</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
