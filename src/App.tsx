import React, { useState, useEffect } from 'react';
import { BackgroundEffects } from './components/BackgroundEffects';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FieldNotes } from './components/FieldNotes';
import { FlagshipBlueprint } from './components/FlagshipBlueprint';
import { InteractiveRoadmap } from './components/InteractiveRoadmap';
import { Projects } from './components/Projects';
import { ProjectModal } from './components/ProjectModal';
import { Skills } from './components/Skills';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { TerminalPlayground } from './components/TerminalPlayground';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';
import { SuhashCompanion } from './components/SuhashCompanion';
import { Project } from './types';
import { projects } from './data/portfolioData';
import { sounds } from './utils/soundEffects';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isMeteorShowerActive, setIsMeteorShowerActive] = useState(false);
  const [meteorToast, setMeteorToast] = useState<{ active: boolean; message: string }>({
    active: false,
    message: ''
  });

  const flagshipProject = projects[0]; // Energy Intelligent Agent System

  // Initialize theme from storage
  useEffect(() => {
    const savedTheme = localStorage.getItem('suhash_portfolio_theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleToggleTheme = () => {
    sounds.playPop();
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('suhash_portfolio_theme', nextTheme);

    // Trigger celestial shower for 5.5 seconds upon switching
    setIsMeteorShowerActive(true);
    sounds.playSuccess();

    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setMeteorToast({
        active: true,
        message: '🌠 Meteorite Shower Active! (Falling for 5 seconds)'
      });
    } else {
      document.documentElement.classList.remove('dark');
      setMeteorToast({
        active: true,
        message: '☀️ Solar Flare & Daytime Celestial Shower Active!'
      });
    }

    setTimeout(() => {
      setIsMeteorShowerActive(false);
    }, 5500);

    setTimeout(() => {
      setMeteorToast({ active: false, message: '' });
    }, 4500);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'field-notes', 'flagship', 'roadmap', 'projects', 'skills', 'experience', 'achievements', 'contact'];
      const scrollPos = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenProjectModal = (proj: Project) => {
    setSelectedProject(proj);
  };

  const handleSelectProjectById = (id: string) => {
    const found = projects.find((p) => p.id === id);
    if (found) {
      setSelectedProject(found);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0B0F19] text-slate-100' : 'bg-[#F8FAFC] text-slate-900'} relative selection:bg-slate-700 selection:text-white transition-colors duration-500`}>
      {/* Background Starfield, Constellations, and Falling Meteorite / Solar Shower Canvas */}
      <BackgroundEffects theme={theme} isMeteorShowerActive={isMeteorShowerActive} />

      {/* Meteorite / Solar Shower Notification Toast */}
      {meteorToast.active && (
        <div className="fixed top-20 right-6 z-50 px-4 py-2 rounded-xl bg-white dark:bg-slate-900/95 border-2 border-amber-500 dark:border-amber-400 text-slate-900 dark:text-amber-300 text-xs font-mono shadow-brutal flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-amber-500 dark:bg-amber-400 animate-ping" />
          <span className="font-bold">{meteorToast.message}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        activeSection={activeSection}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Main Content Flow */}
      <main className="relative z-10">
        {/* 1. Hero with Interactive Polaroid & 3D Tilt */}
        <Hero
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        {/* 2. Field Notes & Current Radar */}
        <div id="field-notes">
          <FieldNotes />
        </div>

        {/* 3. Algorithmic Engine // Flagship Blueprint */}
        <div id="flagship">
          <FlagshipBlueprint
            project={flagshipProject}
            onOpenModal={handleOpenProjectModal}
          />
        </div>

        {/* 4. Journey // Horizontal Interactive Roadmap */}
        <div id="roadmap">
          <InteractiveRoadmap />
        </div>

        {/* 5. Projects Showcase */}
        <Projects onOpenModal={handleOpenProjectModal} />

        {/* 6. Skills & Technical Matrix */}
        <Skills />

        {/* 7. Experience & Leadership Timeline */}
        <ExperienceTimeline />

        {/* 8. Honors, Hackathons & Verified Certifications */}
        <Achievements />

        {/* 9. Communication & Dispatch Portal */}
        <Contact />
      </main>

      {/* Animated Cute Roaming Companion ("Mini Suhash") */}
      <SuhashCompanion activeSection={activeSection} />

      {/* Footer */}
      <Footer
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <TerminalPlayground
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onSelectProject={handleSelectProjectById}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
};

export default App;
