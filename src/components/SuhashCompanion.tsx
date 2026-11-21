import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Send, ArrowRight, Compass, Phone, Trophy, Code2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface SuhashCompanionProps {
  activeSection: string;
}

interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
}

interface DustParticle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  size: number;
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

  // Physics & Animation State
  const [isScrolling, setIsScrolling] = useState(false);
  const [charState, setCharState] = useState<'standing' | 'running'>('standing');
  const [facingRight, setFacingRight] = useState(false); // Default faces inward toward content
  const [dustParticles, setDustParticles] = useState<DustParticle[]>([]);

  // Physics coordinates in viewport pixels
  const posRef = useRef({ x: window.innerWidth - 110, y: window.innerHeight - 150 });
  const velRef = useRef({ vx: 0, vy: 0 });
  const targetRef = useRef({ x: window.innerWidth - 110, y: window.innerHeight - 150 });
  const tiltRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(window.scrollY);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stepPhaseRef = useRef(0);
  const idlePhaseRef = useRef(0);
  const particleIdRef = useRef(0);

  // Dragging support
  const isDraggingRef = useRef(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });

  // DOM node reference for direct transform manipulation (60fps performance)
  const companionNodeRef = useRef<HTMLDivElement | null>(null);
  const shadowNodeRef = useRef<HTMLDivElement | null>(null);

  // Speech bubble per section
  const getSectionBubble = (section: string) => {
    switch (section) {
      case 'hero':
        return 'Hey! I\'m Mini Suhash 👋';
      case 'field-notes':
        return 'Reading & Building 📝';
      case 'flagship':
        return 'Railway Live Demo ⚡';
      case 'roadmap':
        return 'Explore my roadmap 🗺️';
      case 'projects':
        return '5+ AI Architectures 🚀';
      case 'skills':
        return 'Python & PyTorch 🧠';
      case 'experience':
        return 'Skillbit & Google 🌟';
      case 'achievements':
        return 'DevHack Winner 🏆';
      case 'contact':
        return "Let's connect! ✉️";
      default:
        return 'Tap for assistance ✨';
    }
  };

  // Target perch position calculation based on viewport and current section
  const updateTargetForSection = (section: string) => {
    if (isDraggingRef.current) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const isMobile = vw < 640;

    // Default ground level
    const groundOffset = isMobile ? 100 : 135;
    let targetX = vw - (isMobile ? 85 : 125);
    let targetY = vh - groundOffset;

    // Dynamic roaming positions per section
    switch (section) {
      case 'hero':
        targetX = vw - (isMobile ? 80 : 130);
        targetY = vh - groundOffset;
        break;
      case 'field-notes':
        targetX = vw - (isMobile ? 85 : 160);
        targetY = vh - groundOffset;
        break;
      case 'flagship':
        targetX = vw - (isMobile ? 80 : 140);
        targetY = vh - groundOffset;
        break;
      case 'roadmap':
        targetX = vw - (isMobile ? 85 : 175);
        targetY = vh - groundOffset;
        break;
      case 'projects':
        targetX = vw - (isMobile ? 80 : 135);
        targetY = vh - groundOffset;
        break;
      case 'skills':
        targetX = vw - (isMobile ? 85 : 165);
        targetY = vh - groundOffset;
        break;
      case 'experience':
        targetX = vw - (isMobile ? 80 : 140);
        targetY = vh - groundOffset;
        break;
      case 'achievements':
        targetX = vw - (isMobile ? 85 : 170);
        targetY = vh - groundOffset;
        break;
      case 'contact':
        targetX = vw - (isMobile ? 80 : 150);
        targetY = vh - groundOffset;
        break;
      default:
        targetX = vw - (isMobile ? 85 : 130);
        targetY = vh - groundOffset;
    }

    // Keep within viewport boundaries
    targetX = Math.max(15, Math.min(vw - (isMobile ? 85 : 115), targetX));
    targetY = Math.max(80, Math.min(vh - groundOffset, targetY));

    targetRef.current = { x: targetX, y: targetY };
  };

  // Re-calculate target on section change or window resize
  useEffect(() => {
    updateTargetForSection(activeSection);
  }, [activeSection]);

  useEffect(() => {
    const handleResize = () => {
      updateTargetForSection(activeSection);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSection]);

  // Scroll listener: detects active scrolling and updates physics
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      setIsScrolling(true);

      // Give a tiny impulse in direction of scroll
      if (Math.abs(scrollDelta) > 1.5) {
        // Subtle vertical/horizontal reactive trot
        const impulse = Math.max(-10, Math.min(10, scrollDelta * 0.15));
        velRef.current.vy += impulse * 0.3;
        // Run slightly forward
        velRef.current.vx += (scrollDelta > 0 ? -1.5 : 1.5);
      }

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 260);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Main 60fps Physics & Animation Loop
  useEffect(() => {
    let prevTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - prevTime) / 1000, 0.1);
      prevTime = time;

      const pos = posRef.current;
      const vel = velRef.current;
      const target = targetRef.current;

      if (!isDraggingRef.current) {
        // Spring physics towards target
        const dx = target.x - pos.x;
        const dy = target.y - pos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const springStiffness = isScrolling ? 14 : 9;
        const damping = 0.82;

        vel.vx = (vel.vx + dx * springStiffness * dt) * damping;
        vel.vy = (vel.vy + dy * springStiffness * dt) * damping;

        pos.x += vel.vx;
        pos.y += vel.vy;

        // Facing direction based on horizontal movement
        if (vel.vx > 0.4) {
          setFacingRight(true);
        } else if (vel.vx < -0.4) {
          setFacingRight(false);
        }

        const speed = Math.sqrt(vel.vx * vel.vx + vel.vy * vel.vy);

        if (isScrolling || speed > 1.2 || dist > 8) {
          // Running State
          setCharState('running');
          stepPhaseRef.current += Math.max(speed, 6) * dt * 8;
          const runBounce = Math.abs(Math.sin(stepPhaseRef.current)) * 8;

          // Running forward lean angle
          const targetTilt = Math.max(-16, Math.min(16, vel.vx * 2.4));
          tiltRef.current += (targetTilt - tiltRef.current) * 0.2;

          // Spawn running dust/spark particles when foot touches down
          if (runBounce < 1.8 && Math.random() < 0.3) {
            particleIdRef.current += 1;
            const newParticle: DustParticle = {
              id: particleIdRef.current,
              x: pos.x + (facingRight ? -10 : 10) + (Math.random() * 8 - 4),
              y: pos.y + 75,
              opacity: 0.7,
              size: Math.random() * 4 + 3
            };
            setDustParticles((prev) => [...prev.slice(-8), newParticle]);
          }

          if (companionNodeRef.current) {
            companionNodeRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y - runBounce}px, 0) rotate(${tiltRef.current}deg)`;
          }
          if (shadowNodeRef.current) {
            const shadowScale = 1 - (runBounce / 16);
            shadowNodeRef.current.style.transform = `scale(${Math.max(0.65, shadowScale)})`;
            shadowNodeRef.current.style.opacity = `${0.3 + (1 - runBounce / 12) * 0.4}`;
          }
        } else {
          // Standing State
          setCharState('standing');
          tiltRef.current *= 0.85; // smooth return to zero lean

          idlePhaseRef.current += dt * 3.5;
          const idleBob = Math.sin(idlePhaseRef.current) * 2.5;

          if (companionNodeRef.current) {
            companionNodeRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y + idleBob}px, 0) rotate(${tiltRef.current}deg)`;
          }
          if (shadowNodeRef.current) {
            shadowNodeRef.current.style.transform = 'scale(1)';
            shadowNodeRef.current.style.opacity = '0.7';
          }
        }
      } else {
        // Dragging state
        if (companionNodeRef.current) {
          companionNodeRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) scale(1.08)`;
        }
      }

      // Age dust particles
      setDustParticles((prev) =>
        prev
          .map((p) => ({ ...p, y: p.y - 0.4, opacity: p.opacity - dt * 2.2 }))
          .filter((p) => p.opacity > 0)
      );

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isScrolling, facingRight]);

  // Touch and Mouse Dragging Handlers
  const handleStartDrag = (clientX: number, clientY: number) => {
    isDraggingRef.current = true;
    dragOffsetRef.current = {
      x: clientX - posRef.current.x,
      y: clientY - posRef.current.y
    };
  };

  const handleMoveDrag = (clientX: number, clientY: number) => {
    if (!isDraggingRef.current) return;
    const newX = clientX - dragOffsetRef.current.x;
    const newY = clientY - dragOffsetRef.current.y;
    posRef.current = { x: newX, y: newY };
    targetRef.current = { x: newX, y: newY };
  };

  const handleEndDrag = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      // Settle on nearest safe floor
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      targetRef.current.y = Math.min(vh - (vw < 640 ? 100 : 135), Math.max(90, posRef.current.y));
      targetRef.current.x = Math.max(20, Math.min(vw - (vw < 640 ? 85 : 120), posRef.current.x));
    }
  };

  const handleCompanionTap = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
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

    let reply = "I'm specializing in Agentic AI, PyTorch, and LLM applications. You can explore my live deployments in the Projects section or reach me at suhasacharya0525@gmail.com!";
    const qLower = query.toLowerCase();

    if (qLower.includes('cgpa') || qLower.includes('college') || qLower.includes('mit') || qLower.includes('study')) {
      reply = "Suhash holds a 9.2 CGPA at Maharaja Institute of Technology Mysuru in Computer Science & Engineering (AI & ML), graduating in 2027!";
    } else if (qLower.includes('energy') || qLower.includes('eia') || qLower.includes('agent') || qLower.includes('railway')) {
      reply = "The Energy Intelligent Agent is an LLM-powered autonomous tool-calling system integrating 3+ APIs to evaluate hardware efficiency. It is deployed live on Railway at https://eia-production-5e54de99.up.railway.app/!";
    } else if (qLower.includes('maya') || qLower.includes('voice') || qLower.includes('chatbot')) {
      reply = "Maya AI is a voice-enabled conversational assistant built with Hugging Face Transformers, SpeechRecognition, and FastAPI, achieving 85% voice command accuracy with RAG retrieval.";
    } else if (qLower.includes('hackathon') || qLower.includes('devhack') || qLower.includes('award') || qLower.includes('win')) {
      reply = "Suhash won 1st Place at DevHack 2025 (Malnad College of Engineering), 1st Place at Discovery Day 2026 Ideathon, and Runner-Up at SparkVerse 2026!";
    } else if (qLower.includes('contact') || qLower.includes('email') || qLower.includes('phone') || qLower.includes('hire')) {
      reply = "You can contact Suhash directly via email at suhasacharya0525@gmail.com or phone at +91 8217536806. He is currently available for AI/ML roles and research collaborations!";
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
      {/* Running Footstep Dust / Spark Particles */}
      {dustParticles.map((p) => (
        <div
          key={p.id}
          className="fixed pointer-events-none z-30 rounded-full bg-amber-400 dark:bg-amber-300 shadow-sm"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 0.1s linear'
          }}
        />
      ))}

      {/* Mini Suhash Physical 3D Cartoon Companion Entity */}
      <div
        ref={companionNodeRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCompanionTap}
        onTouchStart={(e) => {
          if (e.touches.length === 1) {
            handleStartDrag(e.touches[0].clientX, e.touches[0].clientY);
          }
        }}
        onTouchMove={(e) => {
          if (e.touches.length === 1) {
            handleMoveDrag(e.touches[0].clientX, e.touches[0].clientY);
          }
        }}
        onTouchEnd={handleEndDrag}
        onMouseDown={(e) => {
          if (e.button === 0) {
            handleStartDrag(e.clientX, e.clientY);
            const onMouseMove = (ev: MouseEvent) => handleMoveDrag(ev.clientX, ev.clientY);
            const onMouseUp = () => {
              handleEndDrag();
              window.removeEventListener('mousemove', onMouseMove);
              window.removeEventListener('mouseup', onMouseUp);
            };
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
          }
        }}
        className="fixed top-0 left-0 z-40 cursor-pointer select-none group flex flex-col items-center pointer-events-auto touch-none"
        style={{
          width: '90px',
          willChange: 'transform',
        }}
        title="I am Mini Suhash! Tap me anytime for assistance."
      >
        {/* Dynamic Context Speech Bubble */}
        <div
          className={`absolute -top-11 z-50 whitespace-nowrap px-3 py-1 rounded-full bg-white dark:bg-[#0f172a] border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-[11px] font-mono font-bold shadow-brutal-sm flex items-center gap-1.5 transition-all duration-300 pointer-events-none ${
            isHovered ? 'scale-110 -translate-y-1' : ''
          }`}
          style={{
            transform: facingRight ? 'scaleX(1)' : 'scaleX(1)', // Always readable text
          }}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              charState === 'running' ? 'bg-amber-500 animate-ping' : 'bg-emerald-500 animate-pulse'
            }`}
          />
          <span>{getSectionBubble(activeSection)}</span>
        </div>

        {/* 3D Cartoon Character Cutout Container */}
        <div
          className="relative transition-transform duration-150"
          style={{
            transform: facingRight ? 'scaleX(-1)' : 'scaleX(1)', // Flips image to run left/right naturally
          }}
        >
          {/* 3D Character Cutout Image */}
          <img
            src="/images/mini-suhash.png"
            alt="Mini Suhash 3D Companion"
            className="w-20 sm:w-24 h-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)] transition-all duration-200 group-hover:scale-105"
            draggable={false}
          />

          {/* Running State Wind/Speed Streaks */}
          {charState === 'running' && (
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-70 pointer-events-none">
              <span className="w-3 h-0.5 bg-amber-400 rounded-full animate-pulse" />
              <span className="w-4 h-0.5 bg-cyan-400 rounded-full animate-pulse delay-75" />
            </div>
          )}

          {/* Cute Sparkle Star on Waving Hand */}
          <div className="absolute top-4 -right-1 text-amber-400 dark:text-amber-300 animate-bounce pointer-events-none">
            <Sparkles className="w-4 h-4 drop-shadow" />
          </div>
        </div>

        {/* Dynamic Ground Shadow (Stretches when standing, compresses when running/jumping) */}
        <div
          ref={shadowNodeRef}
          className="w-14 h-2.5 bg-black/30 dark:bg-black/60 rounded-full blur-[2px] mt-0.5 transition-transform duration-75"
        />

        {/* "Mini Suhash" Cute Name Tag Badge */}
        <div className="mt-1 px-2 py-0.5 rounded-full bg-slate-900/90 dark:bg-slate-100/90 text-white dark:text-slate-900 font-mono text-[9px] font-extrabold uppercase tracking-wider shadow-sm border border-slate-700 dark:border-slate-300">
          {charState === 'running' ? 'Running ⚡' : 'Mini Suhash ✦'}
        </div>
      </div>

      {/* Interactive AI Assistant & Help Modal Drawer */}
      {isAssistantOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#0f172a] border-2 border-slate-300 dark:border-slate-700 rounded-3xl shadow-brutal-lg flex flex-col max-h-[85vh] overflow-hidden">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-amber-500 bg-slate-950 shadow-sm">
                  <img
                    src="/images/mini-suhash.png"
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
                    Your interactive physics companion
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
