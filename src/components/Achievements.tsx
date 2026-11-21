import React, { useState } from 'react';
import { Trophy, Award, Medal, ShieldCheck, Sparkles, GitPullRequest, Lock, Cloud } from 'lucide-react';
import confetti from 'canvas-confetti';
import { achievements, certifications } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';
import { sounds } from '../utils/soundEffects';

export const Achievements: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'awards' | 'certifications'>('all');

  const triggerConfetti = (e: React.MouseEvent) => {
    sounds.playSuccess();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      origin: { x, y },
      particleCount: 50,
      spread: 65,
      colors: ['#D4AF37', '#CBD5E1', '#94A3B8', '#38BDF8', '#64748B']
    });
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trophy':
        return <Trophy className="w-5 h-5 text-amber-500" />;
      case 'Award':
        return <Award className="w-5 h-5 text-blue-600 dark:text-slate-300" />;
      case 'Medal':
        return <Medal className="w-5 h-5 text-purple-600 dark:text-slate-300" />;
      case 'GitPullRequest':
        return <GitPullRequest className="w-5 h-5 text-emerald-600 dark:text-slate-300" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-slate-300" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'Lock':
        return <Lock className="w-5 h-5 text-rose-600 dark:text-slate-300" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-blue-500 dark:text-slate-300" />;
      default:
        return <Award className="w-5 h-5 text-amber-500" />;
    }
  };

  const showAwards = activeTab === 'all' || activeTab === 'awards';
  const showCerts = activeTab === 'all' || activeTab === 'certifications';

  return (
    <section id="achievements" className="py-24 relative bg-slate-100/50 dark:bg-slate-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-300 text-xs font-mono mb-3 font-bold">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>HONORS & CREDENTIALS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
              Awards, Wins & <span className="text-slate-700 dark:text-slate-300">Certifications</span>
            </h2>
            <p className="text-slate-800 dark:text-slate-300 text-sm sm:text-base mt-2 font-normal leading-relaxed">
              Recognized in competitive hackathons and verified by global technology institutions including IBM, Google, Duke, and Microsoft.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="inline-flex p-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 gap-1 self-start md:self-auto shadow-sm">
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('all');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'all' ? 'bg-slate-900 text-white dark:bg-slate-800 dark:text-white shadow-sm border border-slate-900 dark:border-slate-700' : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Credentials
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('awards');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'awards' ? 'bg-slate-900 text-white dark:bg-slate-800 dark:text-white shadow-sm border border-slate-900 dark:border-slate-700' : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Hackathons & Awards
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('certifications');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'certifications' ? 'bg-slate-900 text-white dark:bg-slate-800 dark:text-white shadow-sm border border-slate-900 dark:border-slate-700' : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Industry Certs
            </button>
          </div>
        </div>

        {/* Hackathon & Awards Section */}
        {showAwards && (
          <div className="mb-14">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-800 dark:text-slate-300 uppercase tracking-wider mb-6 font-bold">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Hackathon Championships & Competitions (Click for celebration)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((item) => (
                <SpotlightCard
                  key={item.id}
                  onClick={triggerConfetti}
                  className="brutal-card group relative p-6 rounded-2xl bg-white dark:bg-slate-900/70 border-2 border-slate-300 dark:border-slate-800 hover:border-slate-500 dark:hover:border-slate-700 transition-all duration-300 shadow-md hover:-translate-y-1 cursor-pointer overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center">
                        {getIcon(item.icon)}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 border border-slate-300 dark:border-slate-700 uppercase font-bold">
                          {item.badgeText}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-700 dark:text-slate-400 font-bold">{item.date}</span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-slate-100 transition-colors mb-1.5">
                    {item.title}
                  </h3>

                  <div className="text-xs font-mono text-slate-700 dark:text-slate-400 mb-3 font-semibold">
                    {item.issuer}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-300 leading-relaxed font-normal">
                    {item.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-600 dark:text-slate-400">
                    <span className="group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors flex items-center gap-1 font-bold">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span>Click to celebrate</span>
                    </span>
                    <span className="text-slate-900 dark:text-slate-300 font-bold">{item.type}</span>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        )}

        {/* Certifications Section */}
        {showCerts && (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-800 dark:text-slate-300 uppercase tracking-wider mb-6 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-slate-400" />
              <span>Verified Global Certifications</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {certifications.map((cert) => (
                <SpotlightCard
                  key={cert.id}
                  onClick={triggerConfetti}
                  className="brutal-card p-5 rounded-2xl bg-white dark:bg-slate-900/70 border-2 border-slate-300 dark:border-slate-800 hover:border-slate-500 dark:hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 shadow-md cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-800 dark:text-slate-300">
                      {getIcon(cert.icon)}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-slate-800 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-slate-700 font-bold">
                      Verified
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-slate-900 dark:text-white text-sm mb-1 line-clamp-2">
                    {cert.title}
                  </h3>

                  <div className="text-xs font-mono text-slate-700 dark:text-slate-400 mb-2 font-semibold">
                    {cert.issuer}
                  </div>

                  <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                    {cert.description}
                  </p>
                </SpotlightCard>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
