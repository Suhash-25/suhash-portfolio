import React, { useState, useEffect } from 'react';
import { Clock, BookOpen, Headphones, Hammer, MapPin, CheckCircle2, Volume2, VolumeX } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const FieldNotes: React.FC = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [isPlayingLofi, setIsPlayingLofi] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setCurrentTime(new Intl.DateTimeFormat('en-IN', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleLofi = () => {
    sounds.playPop();
    setIsPlayingLofi(!isPlayingLofi);
  };

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-800 dark:text-slate-300 flex items-center gap-2 mb-1 font-bold">
              <span>FIELD NOTES // SUHASH G</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white">
              Current Radar & Daily Practice
            </h2>
          </div>

          <div className="font-handwriting text-2xl text-amber-700 dark:text-amber-300 -rotate-2 select-none font-bold">
            written from the desk ✍️
          </div>
        </div>

        {/* 4-Card Scrapbook Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Currently Building */}
          <div className="relative brutal-card p-5 rounded-2xl bg-white dark:bg-[#111827] flex flex-col justify-between">
            <div className="tape-strip" />
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono uppercase text-slate-800 dark:text-slate-300 tracking-wider flex items-center gap-1.5 font-bold">
                  <Hammer className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Building</span>
                </span>
                <span className="stamp-badge border-amber-600 dark:border-amber-500/40 text-amber-800 dark:text-amber-300 font-bold bg-amber-50 dark:bg-amber-950/40">
                  Active
                </span>
              </div>
              <h3 className="font-display font-bold text-slate-900 dark:text-white text-base mb-1.5">
                Energy Intelligent Agent & Maya AI
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                Autonomous LLM tool-calling microservices deployed on Railway and multi-modal speech RAG pipelines.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 flex items-center gap-1 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Production live on Railway</span>
            </div>
          </div>

          {/* Card 2: Currently Reading */}
          <div className="relative brutal-card p-5 rounded-2xl bg-white dark:bg-[#111827] flex flex-col justify-between">
            <div className="tape-strip" />
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono uppercase text-slate-800 dark:text-slate-300 tracking-wider flex items-center gap-1.5 font-bold">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-slate-300" />
                  <span>Reading</span>
                </span>
                <span className="stamp-badge border-slate-500 dark:border-slate-600 text-slate-900 dark:text-slate-300 font-bold bg-slate-50 dark:bg-slate-800/40">
                  Paper & Book
                </span>
              </div>
              <h3 className="font-display font-bold text-slate-900 dark:text-white text-base mb-1.5">
                Reinforcement Learning: An Introduction
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                By Richard S. Sutton and Andrew G. Barto · Grounding our Meta-RL rover terrain policies.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-800 dark:text-slate-300 font-semibold">
              ORION Rover Research
            </div>
          </div>

          {/* Card 3: Listening To */}
          <div className="relative brutal-card p-5 rounded-2xl bg-white dark:bg-[#111827] flex flex-col justify-between">
            <div className="tape-strip" />
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono uppercase text-slate-800 dark:text-slate-300 tracking-wider flex items-center gap-1.5 font-bold">
                  <Headphones className="w-3.5 h-3.5 text-purple-600 dark:text-slate-300" />
                  <span>Listening to</span>
                </span>
                <button
                  onClick={toggleLofi}
                  className="p-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300 transition-colors shadow-sm"
                  title="Toggle Ambient Audio State"
                >
                  {isPlayingLofi ? <Volume2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
                </button>
              </div>
              <h3 className="font-display font-bold text-slate-900 dark:text-white text-base mb-1.5">
                Synthwave & Deep Focus Lo-Fi
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                Instrumental synth loops and night coding mixes keeping latency low and flow-state high.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-800 dark:text-slate-300 flex items-center justify-between font-semibold">
              <span>{isPlayingLofi ? 'Loop Active 🎧' : 'Ambient focus playlist'}</span>
              <span className="text-slate-600 dark:text-slate-400 font-handwriting text-base">focus mode</span>
            </div>
          </div>

          {/* Card 4: Location */}
          <div className="relative brutal-card p-5 rounded-2xl bg-white dark:bg-[#111827] flex flex-col justify-between">
            <div className="tape-strip" />
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono uppercase text-slate-800 dark:text-slate-300 tracking-wider flex items-center gap-1.5 font-bold">
                  <MapPin className="w-3.5 h-3.5 text-rose-600 dark:text-slate-300" />
                  <span>Location</span>
                </span>
                <span className="stamp-badge border-slate-500 dark:border-slate-600 text-slate-900 dark:text-slate-300 font-bold bg-slate-50 dark:bg-slate-800/40">
                  IST (UTC+5:30)
                </span>
              </div>
              <h3 className="font-display font-bold text-slate-900 dark:text-white text-base mb-1.5">
                Mysuru, Karnataka 📍
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                Maharaja Institute of Technology Mysuru · Department of CSE (Artificial Intelligence & Machine Learning).
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-700 dark:text-slate-400 flex items-center gap-1 font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>Time:</span>
              </span>
              <span className="text-slate-900 dark:text-slate-100 font-bold">{currentTime || 'Loading...'}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
