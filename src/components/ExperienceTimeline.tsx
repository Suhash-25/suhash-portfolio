import React, { useState } from 'react';
import { Briefcase, Users, GraduationCap, Calendar, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { experiences } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'work' | 'leadership' | 'education'>('all');

  const filteredExperiences = filter === 'all'
    ? experiences
    : experiences.filter((e) => e.type === filter);

  const getIcon = (type: string) => {
    switch (type) {
      case 'work':
        return <Briefcase className="w-4 h-4 text-cyan-400" />;
      case 'leadership':
        return <Users className="w-4 h-4 text-indigo-400" />;
      case 'education':
        return <GraduationCap className="w-4 h-4 text-amber-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>CAREER TRAJECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Experience & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Leadership</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Proven track record spanning machine learning internships, global tech ambassador roles, student club leadership, and stellar academic performance.
          </p>

          {/* Filter Toggle */}
          <div className="flex justify-center mt-8">
            <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-white/10 gap-1">
              {[
                { id: 'all', label: 'All Milestones' },
                { id: 'work', label: 'Industry ML' },
                { id: 'leadership', label: 'Leadership' },
                { id: 'education', label: 'Education' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    filter === tab.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-indigo-500/20 ml-4 sm:ml-32 space-y-12">
          {filteredExperiences.map((item) => (
            <div key={item.id} className="relative pl-6 sm:pl-8 group">
              
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#07090e] border-2 border-indigo-500/60 group-hover:border-cyan-400 flex items-center justify-center transition-colors shadow-lg shadow-indigo-500/20">
                {getIcon(item.type)}
              </div>

              {/* Date callout (desktop positioned left) */}
              <div className="hidden sm:block absolute -left-36 top-2 text-right w-28">
                <span className="text-xs font-mono text-slate-400 font-semibold">{item.period}</span>
              </div>

              {/* Main Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/90 border border-white/[0.08] group-hover:border-indigo-500/40 transition-all duration-300 backdrop-blur-xl shadow-xl hover:-translate-y-1">
                
                {/* Mobile Date & Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="sm:hidden text-xs font-mono text-indigo-400 font-semibold">
                    {item.period}
                  </div>
                  {item.badge && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-indigo-500/15 text-indigo-300 border border-indigo-500/20">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Role and Organization */}
                <h3 className="text-xl font-display font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {item.role}
                </h3>
                
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono mt-1 mb-4">
                  <span className="text-cyan-300 font-medium">{item.organization}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </span>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-2 mb-4">
                  {item.highlights.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Impact Metric Pill */}
                {item.metrics && (
                  <div className="pt-3 border-t border-white/5 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xs font-mono text-amber-300 font-medium">
                      Impact: {item.metrics}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
