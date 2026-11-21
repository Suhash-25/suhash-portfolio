import React from 'react';
import { Sparkles, ExternalLink, Github, ArrowRight, AlertCircle, Cpu, Zap } from 'lucide-react';
import { Project } from '../types';
import { sounds } from '../utils/soundEffects';

interface FlagshipBlueprintProps {
  onOpenModal: (project: Project) => void;
  project: Project;
}

export const FlagshipBlueprint: React.FC<FlagshipBlueprintProps> = ({ onOpenModal, project }) => {
  return (
    <section className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Flagship Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="stamp-badge border-amber-600 dark:border-amber-500/50 bg-amber-500/10 text-amber-800 dark:text-amber-300 font-bold">
              FLAGSHIP ARCHITECTURE // 2026
            </span>
            <span className="text-xs font-mono text-slate-800 dark:text-slate-300 hidden sm:inline font-bold">
              PROD VERIFIED · RAILWAY HOSTED
            </span>
          </div>

          <div className="font-handwriting text-xl text-slate-700 dark:text-slate-400 rotate-1 select-none font-bold">
            real code & live API ↘
          </div>
        </div>

        {/* Blueprint Container */}
        <div className="relative brutal-card p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f172a] border-2 border-slate-300 dark:border-[#1e293b]">
          <div className="tape-strip" />

          {/* Top Row: Title, Tagline & Live Badge */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 dark:text-white tracking-tight">
                  {project.title}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-400 dark:border-emerald-700 text-emerald-800 dark:text-emerald-400 flex items-center gap-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>Production Live</span>
                </span>
              </div>
              <p className="text-sm font-mono text-slate-800 dark:text-slate-200 font-semibold">
                {project.tagline}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start lg:self-auto">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.playSuccess()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold text-xs transition-all shadow-md hover:bg-slate-800 dark:hover:bg-white"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-700 transition-colors shadow-sm"
                title="View Source on GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 3-Box Engineering Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            
            {/* Box 1: Problem */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-rose-700 dark:text-rose-400 mb-2 font-bold">
                  <AlertCircle className="w-4 h-4" />
                  <span>The Challenge</span>
                </div>
                <p className="text-xs text-slate-800 dark:text-slate-300 leading-relaxed font-normal">
                  Traditional hardware audit systems rely on static lookups, leading to slow response cycles, outdated price telemetry, and lack of personalized energy trade-off analysis.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-900 text-[11px] font-mono text-slate-600 dark:text-slate-400 font-semibold">
                Latency bottleneck
              </div>
            </div>

            {/* Box 2: Built */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-amber-800 dark:text-amber-400 mb-2 font-bold">
                  <Cpu className="w-4 h-4" />
                  <span>What I Architected</span>
                </div>
                <p className="text-xs text-slate-800 dark:text-slate-300 leading-relaxed font-normal">
                  Constructed an autonomous Agentic AI framework with dynamic tool-calling. Orchestrates 3+ live APIs, parses unstructured consumer parameters, and runs Pareto optimization.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-900 text-[11px] font-mono text-amber-800 dark:text-amber-300 font-bold">
                Python · FastAPI · LLM Tools · Railway
              </div>
            </div>

            {/* Box 3: Result */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-2 font-bold">
                  <Zap className="w-4 h-4" />
                  <span>Measurable Outcome</span>
                </div>
                <p className="text-xs text-slate-800 dark:text-slate-300 leading-relaxed font-normal">
                  Delivered 30% faster response times with verified structured JSON recommendations, zero hallucinations on device wattage, and live cloud deployment on Railway.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-900 text-[11px] font-mono text-emerald-800 dark:text-emerald-400 font-bold">
                +30% Speedup · Production Live
              </div>
            </div>

          </div>

          {/* Bottom Spec Strip */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono text-slate-800 dark:text-slate-300 font-bold">Tech Stack:</span>
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-bold"
                >
                  {t}
                </span>
              ))}
            </div>

            <button
              onClick={() => {
                sounds.playPop();
                onOpenModal(project);
              }}
              className="flex items-center gap-1.5 text-xs font-mono text-slate-900 dark:text-slate-200 hover:underline font-bold group/btn self-start sm:self-auto"
            >
              <span>View Full Architecture Blueprint</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
