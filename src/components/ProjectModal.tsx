import React from 'react';
import { X, ExternalLink, Github, Sparkles, CheckCircle2, Cpu, Activity, Workflow } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#0b101f] border border-indigo-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="relative p-6 sm:p-8 border-b border-white/10 bg-gradient-to-r from-indigo-950/40 to-slate-900/60">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {project.category}
              </span>
              <span className="text-xs font-mono text-slate-400">Released {project.year}</span>
            </div>
            
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mb-2">
            {project.title}
          </h3>
          <p className="text-indigo-200 text-sm sm:text-base font-normal">
            {project.tagline}
          </p>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Key Metrics HUD */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-900/90 border border-white/5 text-center">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">{m.label}</div>
                <div className="text-lg font-display font-bold text-cyan-300 mt-0.5">{m.value}</div>
              </div>
            ))}
          </div>

          {/* Architecture Pipeline Flow */}
          {project.architectureDetails && (
            <div className="p-4 rounded-xl bg-slate-950/80 border border-indigo-500/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-wider">
                <Workflow className="w-4 h-4" />
                <span>System Architecture Flow</span>
              </div>
              <p className="font-mono text-xs text-slate-300 bg-slate-900/90 p-3 rounded-lg border border-white/5 leading-relaxed">
                {project.architectureDetails}
              </p>
            </div>
          )}

          {/* Detailed Overview */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-400" />
              <span>Project Overview & Engineering Highlights</span>
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              {project.description}
            </p>
            <ul className="space-y-2.5 pt-2">
              {project.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Stack */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Core Technologies & Frameworks</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono rounded-lg bg-white/[0.04] border border-white/10 text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 sm:p-6 bg-[#0d1424] border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs transition-colors border border-slate-700"
            >
              <Github className="w-4 h-4" />
              <span>View Source on GitHub</span>
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-medium text-xs transition-all shadow-md shadow-emerald-600/30"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch Live Deployment</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
