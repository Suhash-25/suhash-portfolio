import React from 'react';
import { Sparkles, Trophy, Award, Briefcase, GraduationCap, Users, Calendar, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface RoadmapItem {
  year: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  accent: string;
}

export const InteractiveRoadmap: React.FC = () => {
  const roadmapMilestones: RoadmapItem[] = [
    {
      year: "2023",
      badge: "ACADEMICS",
      title: "Joined MIT Mysuru",
      subtitle: "B.E. in CSE (AI & ML) · 9.2 CGPA",
      description: "Started core engineering in deep learning, algorithms, and systems architectures. Maintaining an outstanding 9.2 CGPA.",
      icon: GraduationCap,
      accent: "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
    },
    {
      year: "2024",
      badge: "LEADERSHIP",
      title: "General Secretary",
      subtitle: "InnovateX Club · Student Innovation",
      description: "Led executive teams to host 15+ technical hackathons and workshops, expanding active member participation by 40%.",
      icon: Users,
      accent: "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
    },
    {
      year: "2025",
      badge: "GOOGLE ECOSYSTEM",
      title: "Google Student Ambassador",
      subtitle: "Campus Tech Leadership",
      description: "Spearheaded hands-on workshops on Google Cloud Platform, Gemini developer APIs, and machine learning tools for 900+ students.",
      icon: Sparkles,
      accent: "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
    },
    {
      year: "2025",
      badge: "1ST PLACE CHAMPION",
      title: "Winner — DevHack 2025",
      subtitle: "Malnad College of Engineering, Hassan",
      description: "Won 1st prize in a competitive 36-hour hackathon for designing an innovative AI solution evaluated on model accuracy and feasibility.",
      icon: Trophy,
      accent: "border-amber-500/50 bg-amber-50/40 dark:bg-[#161c2e]"
    },
    {
      year: "2026",
      badge: "INDUSTRY ML",
      title: "ML Intern — Skillbit",
      subtitle: "Skillbit Technologies",
      description: "Developed and optimized predictive ML pipelines using Scikit-learn, automated feature engineering, and Bayesian hyperparameter tuning.",
      icon: Briefcase,
      accent: "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
    },
    {
      year: "2026",
      badge: "DOUBLE HONORS",
      title: "Discovery Day Winner",
      subtitle: "Winner Discovery Day & Runner SparkVerse",
      description: "Secured top honors for pitching autonomous robotics intelligence and energy-saving agent systems at MIT Mysuru.",
      icon: Award,
      accent: "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
    }
  ];

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-600 dark:text-slate-400 flex items-center gap-2 mb-1">
              <Calendar className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span>JOURNEY // ROADMAP</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white">
              Timeline: MIT Mysuru → Leadership → ML Intern → Hackathon Champion
            </h2>
          </div>

          <div className="font-handwriting text-xl text-slate-600 dark:text-slate-400 rotate-1 select-none">
            scroll to explore ➔
          </div>
        </div>

        {/* Horizontal Scrollable Timeline */}
        <div className="overflow-x-auto pb-6 scrollbar-thin">
          <div className="flex gap-5 min-w-[1050px]">
            {roadmapMilestones.map((milestone, idx) => {
              const Icon = milestone.icon;
              return (
                <div
                  key={idx}
                  onClick={() => sounds.playClick()}
                  className={`relative brutal-card p-5 rounded-2xl w-72 shrink-0 ${milestone.accent} flex flex-col justify-between cursor-pointer`}
                >
                  <div className="tape-strip" />

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-display font-black text-2xl text-slate-900 dark:text-white">
                        {milestone.year}
                      </span>
                      <span className="stamp-badge border-slate-400 dark:border-slate-600 text-slate-800 dark:text-slate-300 text-[9px] font-bold">
                        {milestone.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                      <h3 className="font-display font-bold text-slate-900 dark:text-white text-base">
                        {milestone.title}
                      </h3>
                    </div>

                    <div className="text-xs font-mono text-slate-600 dark:text-slate-400 mb-2.5">
                      {milestone.subtitle}
                    </div>

                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>Milestone 0{idx + 1}</span>
                    <ArrowRight className="w-3 h-3 text-slate-600 dark:text-slate-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
