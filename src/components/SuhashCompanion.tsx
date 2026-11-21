import React, { useState, useEffect } from 'react';
import { X, Sparkles, Send, ArrowRight, Compass, Phone, Trophy, Code2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface SuhashCompanionProps {
  activeSection: string;
}

interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
}

export const SuhashCompanion: React.FC<SuhashCompanionProps> = ({ activeSection }) => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'assistant',
      text: "Hi! I'm Mini Suhash ⚡ I'm here to guide you through my projects, machine learning research, and background. Tap any topic below or ask me anything!"
    }
  ]);
  const [bounceKey, setBounceKey] = useState(0);

  // Position offsets for roaming across different fields
  const getRoamingStyle = (section: string) => {
    switch (section) {
      case 'hero':
        return 'bottom-6 right-6 scale-100';
      case 'field-notes':
        return 'bottom-10 right-6 scale-105';
      case 'flagship':
        return 'bottom-14 right-8 scale-105';
      case 'roadmap':
        return 'bottom-8 right-6 scale-100';
      case 'projects':
        return 'bottom-12 right-6 scale-105';
      case 'skills':
        return 'bottom-10 right-8 scale-100';
      case 'experience':
        return 'bottom-12 right-6 scale-105';
      case 'achievements':
        return 'bottom-14 right-8 scale-110';
      case 'contact':
        return 'bottom-8 right-6 scale-105';
      default:
        return 'bottom-6 right-6 scale-100';
    }
  };

  const getSectionBubble = (section: string) => {
    switch (section) {
      case 'hero':
        return 'Hey! 👋 Tap me';
      case 'field-notes':
        return 'Reading & Building 📝';
      case 'flagship':
        return 'Railway Live ⚡';
      case 'roadmap':
        return 'Explore my roadmap 🗺️';
      case 'projects':
        return '5+ AI Architectures 🚀';
      case 'skills':
        return 'Python & PyTorch 🛠️';
      case 'experience':
        return 'Skillbit & Google 🌟';
      case 'achievements':
        return 'DevHack Winner 🏆';
      case 'contact':
        return "Let's connect! ✉️";
      default:
        return 'Tap for help! ⚡';
    }
  };

  // Section transition bounce
  useEffect(() => {
    setBounceKey((prev) => prev + 1);
  }, [activeSection]);

  const handleCompanionTap = () => {
    sounds.playPop();
    setIsAssistantOpen(true);
  };

  const handleQuickQuestion = (question: string, answer: string) => {
    sounds.playClick();
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: question },
      { sender: 'assistant', text: answer }
    ]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    sounds.playClick();
    const query = userQuery.trim();
    setUserQuery('');

    // Generate intelligent response based on Suhash's knowledge base
    let reply = "I'm specializing in Agentic AI, PyTorch, and LLM applications. You can explore my live deployments in the Projects section or reach me at suhasacharya0525@gmail.com!";
    const qLower = query.toLowerCase();

    if (qLower.includes('cgpa') || qLower.includes('college') || qLower.includes('mit') || qLower.includes('study')) {
      reply = "Suhash holds an impressive 9.2 CGPA at Maharaja Institute of Technology Mysuru in Computer Science & Engineering (AI & ML), graduating in 2027!";
    } else if (qLower.includes('energy') || qLower.includes('eia') || qLower.includes('agent') || qLower.includes('railway')) {
      reply = "The Energy Intelligent Agent is an LLM-powered autonomous tool-calling system integrating 3+ APIs to evaluate hardware efficiency. It is deployed live on Railway at https://eia-production-5e54de99.up.railway.app/!";
    } else if (qLower.includes('maya') || qLower.includes('voice') || qLower.includes('chatbot')) {
      reply = "Maya AI is a voice-enabled conversational assistant built with Hugging Face Transformers, SpeechRecognition, and FastAPI, achieving 85% voice command accuracy with RAG retrieval.";
    } else if (qLower.includes('hackathon') || qLower.includes('devhack') || qLower.includes('award') || qLower.includes('win')) {
      reply = "Suhash won 1st Place at DevHack 2025 (Malnad College of Engineering), 1st Place at Discovery Day 2026 Ideathon, and Runner-Up at SparkVerse 2026!";
    } else if (qLower.includes('contact') || qLower.includes('email') || qLower.includes('phone') || qLower.includes('hire')) {
      reply = "You can contact Suhash directly via email at suhasacharya0525@gmail.com or phone at +91 8217536806. He is currently available for AI/ML roles and research!";
    } else if (qLower.includes('skillbit') || qLower.includes('intern') || qLower.includes('work')) {
      reply = "Suhash was a Machine Learning Intern at Skillbit Technologies (Feb - Apr 2026), building predictive ML pipelines, feature engineering, and hyperparameter tuning.";
    } else if (qLower.includes('google') || qLower.includes('ambassador') || qLower.includes('gsa')) {
      reply = "As a Google Student Ambassador, Suhash has conducted hands-on technical workshops on Google Cloud and Gemini developer tools for 900+ students.";
    } else if (qLower.includes('resume') || qLower.includes('cv')) {
      reply = "You can open and print the full Curriculum Vitae anytime using the 'Resume' button in the navigation header!";
    }

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: query },
      { sender: 'assistant', text: reply }
    ]);
  };

  const handleTeleport = (sectionId: string) => {
    sounds.playClick();
    setIsAssistantOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Animated Cute Roaming Companion Widget */}
      <div
        className={`fixed z-40 transition-all duration-700 ease-out select-none ${getRoamingStyle(activeSection)}`}
      >
        <div
          key={bounceKey}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleCompanionTap}
          className="relative cursor-pointer group flex flex-col items-center animate-float-gentle"
          title="Tap on Mini Suhash for help!"
        >
          {/* Section Speech Bubble */}
          <div
            className={`mb-2 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-mono font-bold shadow-brutal-sm flex items-center gap-1.5 transition-all duration-300 ${
              isHovered ? 'scale-110 -translate-y-1' : ''
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>{getSectionBubble(activeSection)}</span>
          </div>

          {/* Cute Avatar Body with Jetpack/Orbital Sparkles */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-slate-100 to-cyan-400 shadow-brutal border-2 border-slate-900 group-hover:scale-110 transition-transform duration-300">
            {/* Circular cut-out photo */}
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src="/images/suhash-chibi.png"
                alt="Mini Suhash Companion"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Glowing online dot */}
            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 shadow-sm" />

            {/* Cute halo/sparkle icon */}
            <div className="absolute -top-1.5 -right-1 text-amber-500 animate-pulse">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>

          {/* Cute handwritten tap prompt */}
          <span className="font-handwriting text-amber-700 dark:text-amber-300 font-bold text-sm mt-1 drop-shadow -rotate-3 group-hover:scale-105 transition-transform">
            tap to assist ✨
          </span>
        </div>
      </div>

      {/* Interactive AI Assistant & Help Modal Drawer */}
      {isAssistantOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#0f172a] border-2 border-slate-300 dark:border-slate-700 rounded-3xl shadow-brutal-lg flex flex-col max-h-[85vh] overflow-hidden">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-amber-500 shadow-sm">
                  <img
                    src="/images/suhash-chibi.png"
                    alt="Mini Suhash"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-display font-bold text-slate-900 dark:text-white text-base">
                    <span>Mini Suhash</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-400 dark:border-emerald-600 text-emerald-800 dark:text-emerald-400 font-bold">
                      AI Guide
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400">
                    Always with you across the portfolio
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  sounds.playClick();
                  setIsAssistantOpen(false);
                }}
                className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                title="Close Assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Teleport Section Jumpers */}
            <div className="px-5 py-2.5 bg-slate-100/90 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono scrollbar-none">
              <span className="text-slate-600 dark:text-slate-400 shrink-0 flex items-center gap-1 font-bold">
                <Compass className="w-3 h-3" /> Fly to:
              </span>
              {[
                { label: 'Projects', id: 'projects' },
                { label: 'Skills', id: 'skills' },
                { label: 'Roadmap', id: 'roadmap' },
                { label: 'Hackathons', id: 'achievements' },
                { label: 'Contact', id: 'contact' },
              ].map((jump) => (
                <button
                  key={jump.id}
                  onClick={() => handleTeleport(jump.id)}
                  className="px-2.5 py-0.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white shrink-0 border border-slate-300 dark:border-slate-700 transition-colors font-semibold shadow-sm"
                >
                  {jump.label}
                </button>
              ))}
            </div>

            {/* Chat & Assistant Message Flow */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3.5 bg-white dark:bg-[#0f172a]">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-semibold rounded-br-none shadow-sm'
                        : 'bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-bl-none shadow-sm'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {/* Quick FAQ Prompts */}
              <div className="pt-2">
                <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-1 font-bold">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Suggested questions to ask:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() =>
                      handleQuickQuestion(
                        "Tell me about the Energy Intelligent Agent live demo",
                        "The Energy Intelligent Agent is Suhash's flagship LLM tool-calling system running live in production on Railway! It integrates 3+ APIs and speeds up device evaluation by 30%."
                      )
                    }
                    className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-left text-slate-800 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <ArrowRight className="w-3 h-3 text-amber-500 shrink-0" />
                    <span>Energy Intelligent Agent demo?</span>
                  </button>

                  <button
                    onClick={() =>
                      handleQuickQuestion(
                        "What are Suhash's hackathon achievements?",
                        "Suhash won 1st Place at DevHack 2025 (Malnad College of Engineering), 1st Place at Discovery Day 2026 Ideathon, and Runner-Up at SparkVerse 2026 at MIT Mysuru!"
                      )
                    }
                    className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-left text-slate-800 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Trophy className="w-3 h-3 text-amber-500 shrink-0" />
                    <span>Hackathon wins & awards?</span>
                  </button>

                  <button
                    onClick={() =>
                      handleQuickQuestion(
                        "What is his core technical skill stack?",
                        "Python (Expert), PyTorch, TensorFlow, LLMs & Agentic AI, FastAPI, ROS 2, OpenCV, and modern TypeScript & React development."
                      )
                    }
                    className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-left text-slate-800 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Code2 className="w-3 h-3 text-blue-600 dark:text-cyan-400 shrink-0" />
                    <span>Core tech stack & libraries?</span>
                  </button>

                  <button
                    onClick={() =>
                      handleQuickQuestion(
                        "How can I contact or hire Suhash?",
                        "You can reach Suhash directly at suhasacharya0525@gmail.com or call +91 8217536806. He is available for AI/ML roles and research collaborations!"
                      )
                    }
                    className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-left text-slate-800 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Phone className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>How to contact or hire him?</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="Ask Mini Suhash about projects, CGPA, research..."
                className="flex-1 px-4 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:border-slate-500 transition-colors shadow-sm"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-800 dark:hover:bg-white transition-colors shadow-sm"
              >
                <span>Ask</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>
        </div>
      )}
    </>
  );
};
