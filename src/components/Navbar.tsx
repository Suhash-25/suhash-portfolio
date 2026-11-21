import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, FileText, Send, Volume2, VolumeX, Sun, Moon } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';

interface NavbarProps {
  activeSection: string;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenResume: () => void;
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  theme,
  onToggleTheme,
  onOpenResume,
  onOpenTerminal
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(sounds.enabled);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const newState = sounds.toggleSound();
    setSoundEnabled(newState);
  };

  const navLinks = [
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills & Stack', href: '#skills', id: 'skills' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Achievements', href: '#achievements', id: 'achievements' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = () => {
    sounds.playClick();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-white/95 dark:bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-300 dark:border-slate-800 shadow-md'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Monogram & Avatar Pill */}
          <a
            href="#hero"
            onClick={handleNavClick}
            className="group flex items-center gap-3 text-left focus:outline-none rounded-lg"
          >
            <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-slate-400 dark:border-slate-700 group-hover:border-slate-900 dark:group-hover:border-slate-400 transition-colors shadow-sm">
              <img
                src="/images/suhash-chibi.png"
                alt="Suhash G"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div>
              <div className="font-display font-bold text-slate-900 dark:text-white text-sm tracking-tight flex items-center gap-1.5">
                {personalInfo.name}
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="Available for roles" />
              </div>
              <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400 font-semibold">AI & ML Engineer</div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/90 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-800 px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={handleNavClick}
                  className={`px-3 py-1 text-xs rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800/60 font-semibold'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Theme Toggle (Dark / Light) */}
            <button
              onClick={onToggleTheme}
              className="p-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-amber-300 hover:border-slate-500 transition-all shadow-sm flex items-center gap-1 font-semibold"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode (Meteorite Shower)'}
              aria-label="Toggle Dark/Light Mode"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Sound Toggle Button */}
            <button
              onClick={toggleSound}
              className="p-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-500 transition-all shadow-sm"
              title={soundEnabled ? 'Mute audio feedback' : 'Enable audio feedback'}
              aria-label="Toggle UI Sounds"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-slate-800 dark:text-slate-300" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            {/* Interactive Terminal Quick Trigger */}
            <button
              onClick={() => {
                sounds.playPop();
                onOpenTerminal();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-300 hover:border-slate-500 transition-all shadow-sm font-semibold"
              title="Open Interactive Terminal"
            >
              <Terminal className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span>AI Console</span>
            </button>

            {/* Resume Button */}
            <button
              onClick={() => {
                sounds.playClick();
                onOpenResume();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all font-semibold"
            >
              <FileText className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span>Resume</span>
            </button>

            {/* Direct Connect CTA */}
            <a
              href="#contact"
              onClick={handleNavClick}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white transition-all shadow-sm"
            >
              <span>Connect</span>
              <Send className="w-3 h-3" />
            </a>
          </div>

          {/* Mobile Menu & Action Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onToggleTheme}
              className="p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-800 dark:text-amber-300"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-800" />}
            </button>
            <button
              onClick={toggleSound}
              className="p-2 text-slate-700 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg"
              title="Toggle UI Sounds"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                sounds.playPop();
                onOpenTerminal();
              }}
              className="p-2 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg"
              aria-label="Open Terminal"
            >
              <Terminal className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 dark:bg-[#0B0F19]/98 border-b border-slate-300 dark:border-slate-800 px-4 pt-3 pb-6 space-y-3 transition-all shadow-xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => {
                  sounds.playClick();
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activeSection === link.id
                    ? 'bg-slate-900 text-white dark:bg-slate-800 dark:text-white'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                sounds.playClick();
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold"
            >
              <FileText className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span>View Resume</span>
            </button>
            <a
              href="#contact"
              onClick={() => {
                sounds.playClick();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-bold"
            >
              <span>Get In Touch</span>
              <Send className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
