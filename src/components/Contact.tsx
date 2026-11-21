import React, { useState, useEffect } from 'react';
import { Mail, Phone, Send, CheckCircle2, Copy, Github, Linkedin, Code, Clock, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';
import { sounds } from '../utils/soundEffects';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

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

  const handleCopy = (text: string, field: 'email' | 'phone') => {
    sounds.playPop();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playSuccess();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      const mailtoUrl = `mailto:${personalInfo.contact.email}?subject=${encodeURIComponent(
        formData.subject || `Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
    }, 700);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-300 text-xs font-mono mb-3 font-bold">
            <Send className="w-3.5 h-3.5 text-blue-600 dark:text-slate-400" />
            <span>COMMUNICATION PORTAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            Let's Connect & <span className="text-slate-700 dark:text-slate-300">Collaborate</span>
          </h2>
          <p className="text-slate-800 dark:text-slate-300 text-sm sm:text-base mt-2 font-normal leading-relaxed">
            Interested in collaborating on AI agents, machine learning research, or full-time opportunities? Send a message or connect directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Info & Status Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Live Availability Card */}
            <SpotlightCard className="brutal-card p-6 rounded-2xl bg-white dark:bg-slate-900/80 border-2 border-slate-300 dark:border-slate-800 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-slate-800 dark:text-slate-300 uppercase tracking-wider font-bold">
                  Status & Availability
                </span>
                <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Active
                </span>
              </div>

              <p className="text-slate-900 dark:text-white font-display font-bold text-lg mb-1">
                Open for AI/ML Roles & Research
              </p>
              <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed mb-4 font-normal">
                Available for internships, full-time positions, and high-impact Agentic AI engineering projects.
              </p>

              {/* Timezone Clock */}
              <div className="flex items-center gap-2 text-xs font-mono text-slate-700 dark:text-slate-400 pt-3 border-t border-slate-200 dark:border-slate-800 font-semibold">
                <Clock className="w-4 h-4 text-blue-600 dark:text-slate-400" />
                <span>Mysore, India (IST):</span>
                <span className="text-slate-900 dark:text-slate-200 font-bold">{currentTime || 'Loading...'}</span>
              </div>
            </SpotlightCard>

            {/* Direct Copyable Contact Cards */}
            <div className="grid grid-cols-1 gap-3">
              
              {/* Email Card */}
              <SpotlightCard
                onClick={() => handleCopy(personalInfo.contact.email, 'email')}
                className="brutal-card group p-4 rounded-xl bg-white dark:bg-slate-900/70 border-2 border-slate-300 dark:border-slate-800 hover:border-slate-500 dark:hover:border-slate-700 transition-all cursor-pointer flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-800 dark:text-slate-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-slate-600 dark:text-slate-400 font-bold">Direct Email</div>
                    <div className="text-xs sm:text-sm font-mono text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-slate-200 transition-colors font-bold">
                      {personalInfo.contact.email}
                    </div>
                  </div>
                </div>

                <div className="text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center gap-1 font-bold">
                  {copiedField === 'email' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </div>
              </SpotlightCard>

              {/* Phone Card */}
              <SpotlightCard
                onClick={() => handleCopy(personalInfo.contact.phone, 'phone')}
                className="brutal-card group p-4 rounded-xl bg-white dark:bg-slate-900/70 border-2 border-slate-300 dark:border-slate-800 hover:border-slate-500 dark:hover:border-slate-700 transition-all cursor-pointer flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-800 dark:text-slate-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-slate-600 dark:text-slate-400 font-bold">Direct Phone</div>
                    <div className="text-xs sm:text-sm font-mono text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-slate-200 transition-colors font-bold">
                      {personalInfo.contact.phone}
                    </div>
                  </div>
                </div>

                <div className="text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center gap-1 font-bold">
                  {copiedField === 'phone' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </div>
              </SpotlightCard>

            </div>

            {/* Social Grid */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="p-3 rounded-xl bg-white dark:bg-slate-900/70 border-2 border-slate-300 dark:border-slate-800 hover:border-slate-500 text-center flex flex-col items-center justify-center gap-1 transition-all group shadow-sm"
              >
                <Github className="w-5 h-5 text-slate-700 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" />
                <span className="text-[11px] font-mono text-slate-900 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white font-bold">GitHub</span>
              </a>

              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="p-3 rounded-xl bg-white dark:bg-slate-900/70 border-2 border-slate-300 dark:border-slate-800 hover:border-slate-500 text-center flex flex-col items-center justify-center gap-1 transition-all group shadow-sm"
              >
                <Linkedin className="w-5 h-5 text-slate-700 dark:text-slate-400 group-hover:text-[#0077b5]" />
                <span className="text-[11px] font-mono text-slate-900 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white font-bold">LinkedIn</span>
              </a>

              <a
                href={personalInfo.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="p-3 rounded-xl bg-white dark:bg-slate-900/70 border-2 border-slate-300 dark:border-slate-800 hover:border-slate-500 text-center flex flex-col items-center justify-center gap-1 transition-all group shadow-sm"
              >
                <Code className="w-5 h-5 text-slate-700 dark:text-slate-400 group-hover:text-[#FFA116]" />
                <span className="text-[11px] font-mono text-slate-900 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white font-bold">LeetCode</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <SpotlightCard className="brutal-card p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/80 border-2 border-slate-300 dark:border-slate-800 shadow-xl">
              <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Send a Direct Message</span>
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-xs mb-6 font-normal">
                Fill out the form below to initiate communication directly with Suhash.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-slate-800 dark:text-slate-300 mb-1.5 font-bold">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Dr. Andrew Ng"
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-slate-600 transition-colors shadow-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-slate-800 dark:text-slate-300 mb-1.5 font-bold">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="andrew@deeplearning.ai"
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-slate-600 transition-colors shadow-sm font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-800 dark:text-slate-300 mb-1.5 font-bold">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="AI Research / Agentic Engineering Opportunity"
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-slate-600 transition-colors shadow-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-800 dark:text-slate-300 mb-1.5 font-bold">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hi Suhash, I came across your Energy Intelligent Agent and ORION Rover work..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-slate-600 transition-colors shadow-sm font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 hover:bg-slate-800 dark:hover:bg-white"
                >
                  {isSubmitting ? (
                    <span>Opening Mail Client...</span>
                  ) : submitted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Message Dispatched!</span>
                    </>
                  ) : (
                    <>
                      <span>Dispatch Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </SpotlightCard>
          </div>

        </div>

      </div>
    </section>
  );
};
