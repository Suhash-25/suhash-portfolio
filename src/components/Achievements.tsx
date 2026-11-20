import React, { useState } from 'react';
import { Trophy, Award, Medal, ShieldCheck, Sparkles, GitPullRequest, Lock, Cloud } from 'lucide-react';
import confetti from 'canvas-confetti';
import { achievements, certifications } from '../data/portfolioData';

export const Achievements: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'awards' | 'certifications'>('all');

  const triggerConfetti = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      origin: { x, y },
      particleCount: 50,
      spread: 60,
      colors: ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899']
    });
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trophy':
        return <Trophy className="w-5 h-5 text-amber-400" />;
      case 'Award':
        return <Award className="w-5 h-5 text-indigo-400" />;
      case 'Medal':
        return <Medal className="w-5 h-5 text-cyan-400" />;
      case 'GitPullRequest':
        return <GitPullRequest className="w-5 h-5 text-emerald-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-blue-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'Lock':
        return <Lock className="w-5 h-5 text-green-400" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-cyan-400" />;
      default:
        return <Award className="w-5 h-5 text-amber-400" />;
    }
  };

  const showAwards = activeTab === 'all' || activeTab === 'awards';
  const showCerts = activeTab === 'all' || activeTab === 'certifications';

  return (
    <section id="achievements" className="py-24 relative bg-slate-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-3">
              <Trophy className="w-3.5 h-3.5" />
              <span>HONORS & CREDENTIALS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
              Awards, Wins & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-indigo-400">Certifications</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Recognized in competitive hackathons and verified by global technology institutions including IBM, Google, Duke, and Microsoft.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-white/10 gap-1 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'all' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Credentials
            </button>
            <button
              onClick={() => setActiveTab('awards')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'awards' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Hackathons & Awards
            </button>
            <button
              onClick={() => setActiveTab('certifications')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'certifications' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Industry Certs
            </button>
          </div>
        </div>

        {/* Hackathon & Awards Section */}
        {showAwards && (
          <div className="mb-14">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-6">
              <Trophy className="w-4 h-4" />
              <span>Hackathon Championships & Competitions (Click cards for celebration)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((item) => (
                <div
                  key={item.id}
                  onClick={triggerConfetti}
                  className="group relative p-6 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/90 border border-white/[0.08] hover:border-amber-400/40 transition-all duration-300 backdrop-blur-xl shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {getIcon(item.icon)}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/20 uppercase font-semibold">
                          {item.badgeText}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-500">{item.date}</span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-white group-hover:text-amber-300 transition-colors mb-1.5">
                    {item.title}
                  </h3>

                  <div className="text-xs font-mono text-cyan-400 mb-3">
                    {item.issuer}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="group-hover:text-amber-300 transition-colors flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>Click to celebrate</span>
                    </span>
                    <span className="text-indigo-400 font-semibold">{item.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications Section */}
        {showCerts && (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-6">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Global Certifications</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  onClick={triggerConfetti}
                  className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/70 to-slate-950/90 border border-white/[0.08] hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/10 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                      {getIcon(cert.icon)}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 font-medium">
                      Verified
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-white text-sm mb-1 line-clamp-2">
                    {cert.title}
                  </h3>

                  <div className="text-xs font-mono text-indigo-300 mb-2 font-medium">
                    {cert.issuer}
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
