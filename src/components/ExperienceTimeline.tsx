import React, { useState } from 'react';
import { Briefcase, Users, GraduationCap, Calendar, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { experiences } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';
import { sounds } from '../utils/soundEffects';

export const ExperienceTimeline: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'work' | 'leadership' | 'education'>('all');

  const filteredExperiences = filter === 'all'
    ? experiences
    : experiences.filter((e) => e.type === filter);

  const handleFilterChange = (tabId: string) => {
    sounds.playClick();
    setFilter(tabId as any);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'work':
        return <Briefcase className="w-4 h-4 text-blue-600 dark:text-slate-300" />;
      case 'leadership':
        return <Users className="w-4 h-4 text-purple-600 dark:text-slate-300" />;
      case 'education':
        return <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-slate-300" />;
      default:
        return <Sparkles className="w-4 h-4 text-amber-500 dark:text-slate-300" />;
    }
  };

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-300 text-xs font-mono mb-3 font-bold">
            <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-slate-400" />
            <span>CAREER TRAJECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            Experience & <span className="text-slate-700 dark:text-slate-300">Leadership</span>
          </h2>
          <p className="text-slate-800 dark:text-slate-300 text-sm sm:text-base mt-2 font-normal leading-relaxed">
            Proven track record spanning machine learning internships, global tech ambassador roles, student club leadership, and academic excellence.
          </p>

          {/* Filter Toggle */}
          <div className="flex justify-center mt-8">
            <div className="inline-flex p-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 gap-1 shadow-sm">
              {[
                { id: 'all', label: 'All Milestones' },
                { id: 'work', label: 'Industry ML' },
                { id: 'leadership', label: 'Leadership' },
                { id: 'education', label: 'Education' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleFilterChange(tab.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    filter === tab.id
                      ? 'bg-slate-900 text-white dark:bg-slate-800 dark:text-white shadow-sm border border-slate-900 dark:border-slate-700'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Personal Leadership Spotlight Card With Suhash's Image */}
        <SpotlightCard className="brutal-card mb-14 p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/80 border-2 border-slate-300 dark:border-slate-800 flex flex-col md:flex-row items-center gap-6 shadow-xl">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-slate-400 dark:border-slate-700 shrink-0 shadow-md">
            <img
              src="/images/suhash-avatar.jpg"
              alt="Suhash G - Google Student Ambassador"
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 text-[11px] font-mono mb-2 border border-slate-300 dark:border-slate-700 font-bold">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Leadership Highlight</span>
            </div>
            <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-1.5">
              Empowering Over 900+ Engineers Through Practical AI & Cloud Workshops
            </h3>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
              "As Google Student Ambassador and General Secretary of InnovateX Club, I lead technical workshops on generative AI, cloud computing, and machine learning architectures, fostering high-participation hackathons and peer mentoring."
            </p>
          </div>
        </SpotlightCard>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-slate-300 dark:border-slate-800 ml-4 sm:ml-32 space-y-10">
          {filteredExperiences.map((item) => (
            <div key={item.id} className="relative pl-6 sm:pl-8 group">
              
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-white dark:bg-[#0B0F19] border-2 border-slate-400 dark:border-slate-700 group-hover:border-slate-900 dark:group-hover:border-slate-400 flex items-center justify-center transition-colors shadow-md">
                {getIcon(item.type)}
              </div>

              {/* Date callout */}
              <div className="hidden sm:block absolute -left-36 top-2 text-right w-28">
                <span className="text-xs font-mono text-slate-800 dark:text-slate-300 font-bold">{item.period}</span>
              </div>

              {/* Main Spotlight Card */}
              <SpotlightCard className="brutal-card p-6 rounded-2xl bg-white dark:bg-slate-900/70 border-2 border-slate-300 dark:border-slate-800 hover:border-slate-500 dark:hover:border-slate-700 transition-all duration-300 shadow-md">
                
                {/* Mobile Date & Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="sm:hidden text-xs font-mono text-slate-800 dark:text-slate-300 font-bold">
                    {item.period}
                  </div>
                  {item.badge && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700 font-bold">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Role and Organization */}
                <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-slate-100 transition-colors">
                  {item.role}
                </h3>
                
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-700 dark:text-slate-400 font-mono mt-1 mb-4 font-semibold">
                  <span className="text-slate-900 dark:text-slate-200 font-bold">{item.organization}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-700 dark:text-slate-400">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </span>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-2 mb-4">
                  {item.highlights.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-300 leading-relaxed font-normal">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Impact Metric Pill */}
                {item.metrics && (
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-xs font-mono text-slate-900 dark:text-slate-200 font-bold">
                      Impact: {item.metrics}
                    </span>
                  </div>
                )}
              </SpotlightCard>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
