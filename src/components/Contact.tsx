import React, { useState, useEffect } from 'react';
import { Mail, Phone, Send, CheckCircle2, Copy, Github, Linkedin, Code, Clock, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

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
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending message + prepare mailto fallback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      const mailtoUrl = `mailto:${personalInfo.contact.email}?subject=${encodeURIComponent(
        formData.subject || `Portfolio Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
    }, 800);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-3">
            <Send className="w-3.5 h-3.5" />
            <span>COMMUNICATION PORTAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Extraordinary</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Interested in collaborating on AI agents, machine learning research, or full-time opportunities? Send a message or connect directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Info & Status Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Live Availability Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-slate-950/90 border border-indigo-500/30 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-indigo-300 uppercase tracking-wider font-semibold">
                  Status & Availability
                </span>
                <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Active
                </span>
              </div>

              <p className="text-white font-display font-bold text-lg mb-1">
                Open for AI/ML Roles & Research
              </p>
              <p className="text-slate-300 text-xs leading-relaxed mb-4">
                Available for internships, full-time positions, and high-impact Agentic AI engineering projects.
              </p>

              {/* Timezone Clock */}
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 pt-3 border-t border-white/5">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Mysore, India (IST):</span>
                <span className="text-cyan-300 font-bold">{currentTime || 'Loading...'}</span>
              </div>
            </div>

            {/* Direct Copyable Contact Cards */}
            <div className="grid grid-cols-1 gap-3">
              
              {/* Email Card */}
              <div
                onClick={() => handleCopy(personalInfo.contact.email, 'email')}
                className="group p-4 rounded-xl bg-slate-900/80 border border-white/[0.08] hover:border-indigo-500/40 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-slate-400">Direct Email</div>
                    <div className="text-xs sm:text-sm font-mono text-white group-hover:text-indigo-300 transition-colors">
                      {personalInfo.contact.email}
                    </div>
                  </div>
                </div>

                <div className="text-xs font-mono text-indigo-400 flex items-center gap-1">
                  {copiedField === 'email' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </div>
              </div>

              {/* Phone Card */}
              <div
                onClick={() => handleCopy(personalInfo.contact.phone, 'phone')}
                className="group p-4 rounded-xl bg-slate-900/80 border border-white/[0.08] hover:border-cyan-500/40 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-slate-400">Direct Contact</div>
                    <div className="text-xs sm:text-sm font-mono text-white group-hover:text-cyan-300 transition-colors">
                      {personalInfo.contact.phone}
                    </div>
                  </div>
                </div>

                <div className="text-xs font-mono text-cyan-400 flex items-center gap-1">
                  {copiedField === 'phone' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </div>
              </div>

            </div>

            {/* Social Grid */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-900/80 border border-white/[0.08] hover:border-slate-600 text-center flex flex-col items-center justify-center gap-1 transition-all group"
              >
                <Github className="w-5 h-5 text-slate-400 group-hover:text-white" />
                <span className="text-[11px] font-mono text-slate-300">GitHub</span>
              </a>

              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-900/80 border border-white/[0.08] hover:border-[#0077b5]/50 text-center flex flex-col items-center justify-center gap-1 transition-all group"
              >
                <Linkedin className="w-5 h-5 text-slate-400 group-hover:text-[#0077b5]" />
                <span className="text-[11px] font-mono text-slate-300">LinkedIn</span>
              </a>

              <a
                href={personalInfo.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-900/80 border border-white/[0.08] hover:border-[#FFA116]/50 text-center flex flex-col items-center justify-center gap-1 transition-all group"
              >
                <Code className="w-5 h-5 text-slate-400 group-hover:text-[#FFA116]" />
                <span className="text-[11px] font-mono text-slate-300">LeetCode</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/90 border border-white/[0.08] backdrop-blur-xl shadow-2xl">
              <h3 className="text-xl font-display font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Send a Direct Message</span>
              </h3>
              <p className="text-slate-400 text-xs mb-6">
                Fill out the form below. It initiates a verified conversation dispatch directly to Suhash's inbox.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/[0.08] text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/[0.08] text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="AI/ML Opportunity / Agentic AI Collaboration"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/[0.08] text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, team, or opportunity..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/[0.08] text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-semibold text-xs transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Opening mail client...</span>
                  ) : submitted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>Message Dispatched!</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
