import React from 'react';
import { ArrowUp, Github, Linkedin, Code, Mail, Phone } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface FooterProps {
  onOpenResume: () => void;
  onOpenTerminal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume, onOpenTerminal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-300 dark:border-slate-800 bg-white dark:bg-[#070A12] relative z-10 pt-16 pb-12 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800">
          
          {/* Brand & Summary */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-slate-300 dark:border-slate-600 shadow-sm">
                <img
                  src="/images/suhash-chibi.png"
                  alt="Suhash G"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <span className="font-display font-bold text-slate-900 dark:text-white text-lg">
                {personalInfo.name}
              </span>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Engineering autonomous agentic pipelines, planetary rover reinforcement learning, and high-performance machine learning microservices.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 pt-1 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Available for high-impact AI/ML roles (2026)</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-800 dark:text-slate-300 font-bold">
              Navigation
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a href="#hero" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Home</a>
              <a href="#projects" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Projects</a>
              <a href="#skills" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Skill Matrix</a>
              <a href="#experience" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Experience</a>
              <a href="#achievements" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Awards & Certs</a>
              <a href="#contact" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Contact</a>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={onOpenTerminal}
                className="text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:underline font-semibold"
              >
                Launch AI CLI
              </button>
              <span className="text-slate-400 dark:text-slate-600">•</span>
              <button
                onClick={onOpenResume}
                className="text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:underline font-semibold"
              >
                View Full CV
              </button>
            </div>
          </div>

          {/* Social Presence */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-800 dark:text-slate-300 font-bold">
              Connect
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:border-slate-500 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:border-slate-500 text-slate-600 dark:text-slate-400 hover:text-[#0077b5] transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.leetcode}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:border-slate-500 text-slate-600 dark:text-slate-400 hover:text-[#FFA116] transition-colors"
                title="LeetCode"
              >
                <Code className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personalInfo.contact.email}`}
                className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:border-slate-500 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={`tel:${personalInfo.contact.phone}`}
                className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:border-slate-500 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                title="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[11px] font-mono text-slate-500 pt-1">
              Mysuru, Karnataka, India
            </p>
          </div>

        </div>

        {/* Bottom Credits & Scroll Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} {personalInfo.name}. Designed & Built with Next-Gen UI/UX.
          </div>

          <div className="flex items-center gap-6">
            <span>React, TypeScript & Tailwind</span>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:border-slate-500 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
