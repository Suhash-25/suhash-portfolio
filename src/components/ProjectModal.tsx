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
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#0F172A] border-2 border-slate-300 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="relative p-6 sm:p-7 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                {project.category}
              </span>
              <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-semibold">Released {project.year}</span>
            </div>
            
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white mb-2">
            {project.title}
          </h3>
          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base font-medium">
            {project.tagline}
          </p>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-6 bg-white dark:bg-[#0F172A]">
          
          {/* Key Metrics HUD */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800 text-center">
                <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider font-semibold">{m.label}</div>
                <div className="text-lg font-display font-bold text-slate-900 dark:text-white mt-0.5">{m.value}</div>
              </div>
            ))}
          </div>

          {/* Architecture Pipeline Flow */}
          {project.architectureDetails && (
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-700 dark:text-slate-400 uppercase tracking-wider font-bold">
                <Workflow className="w-4 h-4 text-blue-600 dark:text-slate-400" />
                <span>System Architecture Flow</span>
              </div>
              <p className="font-mono text-xs text-slate-800 dark:text-slate-300 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-300 dark:border-slate-800 leading-relaxed font-semibold">
                {project.architectureDetails}
              </p>
            </div>
          )}

          {/* Detailed Overview */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-300 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600 dark:text-slate-400" />
              <span>Project Overview & Engineering Highlights</span>
            </h4>
            <p className="text-slate-800 dark:text-slate-300 text-sm leading-relaxed">
              {project.description}
            </p>
            <ul className="space-y-2.5 pt-2">
              {project.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-slate-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Stack */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-300 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-600 dark:text-slate-400" />
              <span>Core Technologies & Frameworks</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer Links */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between gap-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-mono font-bold text-slate-800 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>View Source Repository</span>
          </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-white transition-colors shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Launch Live Deployment</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

      </div>
    </div>
  );
};
