import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Terminal, Github, Linkedin, Code, Mail, Download, CheckCircle2, Award, GraduationCap, Sparkles, RefreshCw } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';
import { sounds } from '../utils/soundEffects';

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
  const [isFlipped, setIsFlipped] = useState(false);

  // 3D Card Tilt State
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 6,
      y: (x / (rect.width / 2)) * 6,
    });
  };

  const handleCardMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleFlipCard = () => {
    sounds.playPop();
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const updateSpeed = isDeleting ? 30 : 60;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 2400);
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
    sounds.playPop();
    navigator.clipboard.writeText(personalInfo.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="hero" className="relative pt-32 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-14">
          
          {/* Left Column: Introductions & Scrapbook Tags */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Status & Scrapbook Stamp */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-200 text-xs font-mono font-semibold shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Open for AI/ML Roles & Research (2026)</span>
              </div>

              <span className="stamp-badge border-slate-500 dark:border-slate-700 text-slate-900 dark:text-slate-300 font-bold">
                MIT Mysuru '27 · 9.2 CGPA
              </span>
            </div>

            {/* Handwritten Greeting */}
            <div className="font-handwriting text-3xl text-amber-600 dark:text-amber-300 -rotate-2 mb-1 select-none">
              hey there! 👋
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-5">
              I'm <span className="underline decoration-slate-400 dark:decoration-slate-700 decoration-wavy decoration-2">{personalInfo.name}</span>
            </h1>

            {/* Dynamic Typing Title in Monospace Pill */}
            <div className="h-10 flex items-center mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900/90 border-2 border-slate-300 dark:border-slate-800 font-mono text-sm sm:text-base text-slate-900 dark:text-slate-100 shadow-brutal-sm">
                <span className="text-slate-600 dark:text-slate-400 font-bold">&gt; role:</span>
                <span className="font-extrabold text-slate-900 dark:text-white">{displayText}</span>
                <span className="w-1.5 h-4 bg-slate-900 dark:bg-slate-300 inline-block animate-pulse ml-0.5" />
              </div>
            </div>

            {/* Subtitle / Bio */}
            <p className="text-base sm:text-lg text-slate-800 dark:text-slate-300 leading-relaxed mb-8 max-w-xl font-normal">
              Undergraduate in Computer Science & Engineering (AI & ML) at <span className="text-slate-900 dark:text-white font-bold">Maharaja Institute of Technology Mysuru</span> (9.2 CGPA). Specializing in <span className="text-slate-900 dark:text-white font-bold">LLM tool-calling architectures</span>, <span className="text-slate-900 dark:text-white font-bold">Agentic AI systems</span>, and <span className="text-slate-900 dark:text-white font-bold">autonomous robotics</span>.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8 w-full sm:w-auto">
              <a
                href="#projects"
                onClick={() => sounds.playClick()}
                className="group flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold text-xs tracking-wide shadow-brutal border-2 border-slate-900 dark:border-slate-100 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0"
              >
                <span>View Selected Work</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => {
                  sounds.playPop();
                  onOpenTerminal();
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-400 dark:border-slate-700 hover:border-slate-600 dark:hover:border-slate-500 text-slate-900 dark:text-slate-200 font-mono text-xs shadow-brutal-sm transition-all"
              >
                <Terminal className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                <span>Launch AI CLI</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenResume();
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-xs transition-all"
              >
                <Download className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                <span>Resume (PDF)</span>
              </button>
            </div>

            {/* Social Links Bar */}
            <div className="flex flex-wrap items-center gap-2.5 py-2 px-3 rounded-xl bg-white dark:bg-slate-900/70 border border-slate-300 dark:border-slate-800 shadow-sm">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono text-slate-800 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-800 transition-all font-semibold"
                title="GitHub Profile"
              >
                <Github className="w-3.5 h-3.5 text-slate-700 dark:text-slate-400" />
                <span>GitHub</span>
              </a>

              <div className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-700" />

              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono text-slate-800 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-800 transition-all font-semibold"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#0077b5]" />
                <span>LinkedIn</span>
              </a>

              <div className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-700" />

              <a
                href={personalInfo.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono text-slate-800 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-800 transition-all font-semibold"
                title="LeetCode Profile"
              >
                <Code className="w-3.5 h-3.5 text-[#FFA116]" />
                <span>LeetCode</span>
              </a>

              <div className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-700" />

              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono text-slate-800 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-800 transition-all font-semibold"
                title="Copy Email to Clipboard"
              >
                {copiedEmail ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-3.5 h-3.5 text-slate-700 dark:text-slate-400" />
                    <span>{personalInfo.contact.email}</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Right Column: Interactive Scrapbook Polaroid Photo Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div
              ref={cardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="relative group max-w-sm sm:max-w-md w-full select-none"
            >
              
              {/* Handwritten Sticky Note Annotation */}
              <div className="absolute -top-7 right-4 z-30 font-handwriting text-2xl text-amber-700 dark:text-amber-300 rotate-6 select-none flex items-center gap-1">
                <span>yes, that's me!</span>
                <span className="text-sm font-sans">👋</span>
              </div>

              {/* Main Polaroid Card */}
              <div className="relative brutal-card p-4 rounded-3xl bg-white dark:bg-[#111827] border-2 border-slate-300 dark:border-[#1f293d] shadow-brutal-lg">
                <div className="tape-strip" />

                {/* Top Scrapbook Header */}
                <div className="flex items-center justify-between px-2 pt-1 pb-3 text-xs font-mono text-slate-600 dark:text-slate-400">
                  <span className="stamp-badge border-slate-400 dark:border-slate-700 text-slate-800 dark:text-slate-300">
                    SUHASH // 2026
                  </span>
                  
                  <button
                    onClick={handleFlipCard}
                    className="flex items-center gap-1 text-[11px] text-amber-700 dark:text-amber-300 hover:underline cursor-pointer font-semibold"
                    title="Toggle photo view"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>{isFlipped ? 'View Suit Photo' : 'Blueprint View'}</span>
                  </button>
                </div>

                {/* Photo Container */}
                <div
                  onClick={handleFlipCard}
                  className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 cursor-pointer group/img shadow-sm"
                >
                  <img
                    src={isFlipped ? '/images/suhash-avatar.jpg' : '/images/suhash.jpg'}
                    alt="Suhash G - AI & Machine Learning Engineer"
                    className={`w-full h-full object-cover object-top filter transition-all duration-500 ${
                      isFlipped
                        ? 'hue-rotate-180 invert brightness-90 contrast-125'
                        : 'brightness-[0.98] contrast-[1.02] group-hover/img:scale-[1.02]'
                    }`}
                  />

                  {/* Gradient bottom overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Top Left Verified Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-slate-100 text-xs font-mono shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Suhash G</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-300" />
                  </div>

                  {/* Hover Prompt */}
                  <div className="absolute top-3 right-3 font-handwriting text-xl text-amber-300 rotate-3 bg-black/60 px-2 py-0.5 rounded-md border border-amber-300/30">
                    {isFlipped ? 'neural sketch' : 'hover / click'}
                  </div>

                  {/* Floating Caption at bottom of photo */}
                  <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-slate-900/95 border border-slate-700/80 shadow-lg text-white">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-display font-bold text-white">
                        AI & Machine Learning Engineer
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                        9.2 CGPA
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      "Building intelligent systems with LLM tool-calling, computer vision, and autonomous reinforcement learning."
                    </p>
                  </div>
                </div>

                {/* Bottom Ribbon */}
                <div className="mt-3 px-2 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-950/70 border border-slate-300 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-800 dark:text-slate-300 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-800 dark:text-slate-300" />
                    <span>MIT Mysuru '27</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>DevHack Winner</span>
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full text-left pt-6 border-t border-slate-300 dark:border-slate-800">
          {personalInfo.metrics.map((metric, idx) => (
            <SpotlightCard
              key={idx}
              className="brutal-card p-5 rounded-2xl bg-white dark:bg-slate-900/80 border-2 border-slate-300 dark:border-slate-800 shadow-brutal-sm hover:-translate-y-0.5"
            >
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-700 dark:text-slate-400 mb-1 flex items-center justify-between font-bold">
                <span>{metric.label}</span>
                <Sparkles className="w-3 h-3 text-slate-500" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-display font-black text-slate-900 dark:text-white tracking-tight">
                  {metric.value}
                </span>
                {metric.suffix && (
                  <span className="text-xs font-mono text-slate-700 dark:text-slate-400 font-bold">{metric.suffix}</span>
                )}
              </div>
              <div className="text-[11px] text-slate-700 dark:text-slate-300 mt-1 font-sans font-medium">{metric.caption}</div>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </section>
  );
};
