import React, { useState, useEffect } from 'react';
import { ArrowRight, Terminal, Github, Linkedin, Code, Mail, Sparkles, Download, CheckCircle2, Bot } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onOpenTerminal }) => {
  const roles = [
    "AI & Machine Learning Engineer",
    "Agentic AI & LLM Architect",
    "Autonomous Robotics & Meta-RL Researcher",
    "Intelligent Systems & Automation Specialist"
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const updateSpeed = isDeleting ? 30 : 60;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, updateSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-medium mb-8 backdrop-blur-md shadow-lg shadow-indigo-950/50 hover:border-indigo-400/50 transition-all cursor-default animate-float">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="font-mono tracking-wide">{personalInfo.contact.availability}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 font-black">{personalInfo.name}</span>
          </h1>

          {/* Dynamic Typing Title */}
          <div className="h-10 sm:h-12 flex items-center justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 font-mono text-base sm:text-xl text-cyan-300 shadow-inner">
              <Bot className="w-4 h-4 text-indigo-400 animate-spin-slow" />
              <span>{displayText}</span>
              <span className="w-2 h-5 bg-cyan-400 inline-block animate-pulse ml-0.5" />
            </div>
          </div>

          {/* Subtitle / Bio */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed mb-10 font-normal">
            Specializing in <span className="text-white font-medium">LLM tool-calling</span>, <span className="text-white font-medium">Agentic AI architectures</span>, and <span className="text-white font-medium">autonomous robotics</span>. Undergraduate at <span className="text-indigo-300 font-semibold">MIT Mysore</span> (9.2 CGPA) building intelligent, production-ready AI systems.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12 w-full sm:w-auto">
            <a
              href="#projects"
              className="group flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Explore Featured Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              onClick={onOpenTerminal}
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-cyan-400/50 text-slate-200 hover:text-cyan-300 font-mono text-xs shadow-lg transition-all hover:bg-slate-800/80"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Launch AI Console</span>
            </button>

            <button
              onClick={onOpenResume}
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.05] border border-white/10 hover:border-white/20 text-slate-200 hover:text-white font-medium text-xs backdrop-blur-md transition-all hover:bg-white/[0.08]"
            >
              <Download className="w-4 h-4 text-indigo-400" />
              <span>View Resume</span>
            </button>
          </div>

          {/* Social Links & Quick Contact Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 py-3 px-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md mb-16">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white hover:bg-white/10 transition-all"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4 text-slate-400" />
              <span>GitHub</span>
            </a>

            <div className="w-1 h-1 rounded-full bg-slate-700" />

            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white hover:bg-white/10 transition-all"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4 text-[#0077b5]" />
              <span>LinkedIn</span>
            </a>

            <div className="w-1 h-1 rounded-full bg-slate-700" />

            <a
              href={personalInfo.socials.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white hover:bg-white/10 transition-all"
              title="LeetCode Profile"
            >
              <Code className="w-4 h-4 text-[#FFA116]" />
              <span>LeetCode</span>
            </a>

            <div className="w-1 h-1 rounded-full bg-slate-700" />

            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white hover:bg-white/10 transition-all"
              title="Copy Email to Clipboard"
            >
              {copiedEmail ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 text-indigo-400" />
                  <span>{personalInfo.contact.email}</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Stats Grid HUD */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full text-left">
            {personalInfo.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="relative group p-5 rounded-2xl bg-gradient-to-b from-slate-900/70 to-slate-950/90 border border-white/[0.08] hover:border-indigo-500/40 transition-all duration-300 backdrop-blur-xl shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1"
              >
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
                  <span>{metric.label}</span>
                  <Sparkles className="w-3 h-3 text-indigo-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                    {metric.value}
                  </span>
                  {metric.suffix && (
                    <span className="text-xs font-mono text-indigo-300 font-semibold">{metric.suffix}</span>
                  )}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 font-sans">{metric.caption}</div>
                <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
