import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Send, ArrowRight, Compass, Phone, Trophy, Code2 } from 'lucide-react';
import { MiniSuhash3D } from './MiniSuhash3D';
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

  // 3D Companion Physics & State
  const [charState, setCharState] = useState<'standing' | 'running'>('standing');
  const [runSpeed, setRunSpeed] = useState(0);
  const [facingAngle, setFacingAngle] = useState(0); // 360-degree rotation in radians
  const [isWaving, setIsWaving] = useState(true);
  const [dustParticles, setDustParticles] = useState<DustParticle[]>([]);
  const [customCallText, setCustomCallText] = useState<string | null>(null);

  // Position references in viewport pixels
  const posRef = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth - 150 : 800,
    y: typeof window !== 'undefined' ? window.innerHeight - 190 : 600,
  });
  const velRef = useRef({ vx: 0, vy: 0 });
  const targetRef = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth - 150 : 800,
    y: typeof window !== 'undefined' ? window.innerHeight - 190 : 600,
  });

  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const containerNodeRef = useRef<HTMLDivElement | null>(null);
  const particleIdRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });

  // Dynamic context speech bubble per section
  const getSectionBubble = (section: string) => {
    if (customCallText) return customCallText;
    if (charState === 'running') return 'Jogging over... 🚶‍♂️';

    switch (section) {
      case 'hero':
        return "Hey! I'm Mini Suhash 👋";
      case 'field-notes':
        return 'Reading & Building 📝';
      case 'flagship':
        return 'Flagship EIA Live ⚡';
      case 'roadmap':
        return 'Timeline & Milestones 🗺️';
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

  // Target perch position across the screen based on section
  const updateTargetForSection = (section: string) => {
    if (isDraggingRef.current) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const isMobile = vw < 640;

    const groundOffset = isMobile ? 170 : 195;
    let tx = vw - (isMobile ? 140 : 170);
    let ty = vh - groundOffset;

    // Mini Suhash roams leisurely across the viewport
    switch (section) {
      case 'hero':
        tx = vw - (isMobile ? 135 : 180);
        break;
      case 'field-notes':
        tx = isMobile ? 20 : vw * 0.18;
        break;
      case 'flagship':
        tx = vw - (isMobile ? 135 : 190);
        break;
      case 'roadmap':
        tx = isMobile ? vw * 0.25 : vw * 0.46;
        break;
      case 'projects':
        tx = vw - (isMobile ? 135 : 185);
        break;
      case 'skills':
        tx = isMobile ? 25 : vw * 0.16;
        break;
      case 'experience':
        tx = vw - (isMobile ? 135 : 195);
        break;
      case 'achievements':
        tx = isMobile ? 30 : vw * 0.32;
        break;
      case 'contact':
        tx = isMobile ? vw * 0.28 : vw * 0.46;
        break;
      default:
        tx = vw - (isMobile ? 135 : 170);
    }

    // Keep within safe screen margins
    tx = Math.max(10, Math.min(vw - (isMobile ? 135 : 160), tx));
    ty = Math.max(70, Math.min(vh - groundOffset, ty));

    targetRef.current = { x: tx, y: ty };
  };

  // Listen to scroll to activate gentle running physics
  useEffect(() => {
    const handleScroll = () => {
      isScrollingRef.current = true;

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Update target when activeSection changes or window resizes
  useEffect(() => {
    updateTargetForSection(activeSection);
  }, [activeSection]);

  useEffect(() => {
    const handleResize = () => updateTargetForSection(activeSection);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSection]);

  // Click-to-call: user can click anywhere to call Mini Suhash slowly over!
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('#mini-suhash-container') ||
        isAssistantOpen
      ) {
        return;
      }

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const isMobile = vw < 640;
      const clampedX = Math.max(10, Math.min(vw - (isMobile ? 135 : 160), e.clientX - 65));
      const clampedY = Math.max(70, Math.min(vh - (isMobile ? 170 : 195), e.clientY - 90));

      targetRef.current = { x: clampedX, y: clampedY };
      setCustomCallText('Coming over! 🚶‍♂️');
      setTimeout(() => setCustomCallText(null), 3000);
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [isAssistantOpen]);

  // 60fps Physics & Smooth 360-Degree Heading Loop (Gentle & Slow Pace)
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const pos = posRef.current;
      const vel = velRef.current;
      const target = targetRef.current;

      if (!isDraggingRef.current) {
        const dx = target.x - pos.x;
        const dy = target.y - pos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const isFar = dist > 4;
        const isRunning = isFar || isScrollingRef.current;

        // CALIBRATED SLOW, GENTLE & PEACEFUL PHYSICS (~65px/sec)
        const spring = isRunning ? 0.75 : 0.45;
        const damping = 0.92;

        vel.vx = (vel.vx + dx * spring * dt) * damping;
        vel.vy = (vel.vy + dy * spring * dt) * damping;

        // Cap to a relaxing, slow cartoon walking/jogging speed
        const currentSpeed = Math.sqrt(vel.vx * vel.vx + vel.vy * vel.vy);
        const MAX_SLOW_SPEED = 1.15;
        if (currentSpeed > MAX_SLOW_SPEED) {
          vel.vx = (vel.vx / currentSpeed) * MAX_SLOW_SPEED;
          vel.vy = (vel.vy / currentSpeed) * MAX_SLOW_SPEED;
        }

        pos.x += vel.vx;
        pos.y += vel.vy;

        const effectiveSpeed = Math.sqrt(vel.vx * vel.vx + vel.vy * vel.vy);

        if (isRunning && effectiveSpeed > 0.15) {
          // --- RUNNING SLOWLY & 360-DEGREE ORIENTATION ---
          setCharState('running');
          setRunSpeed(effectiveSpeed);
          setIsWaving(false);

          // Calculate 360-degree heading angle
          let angle = 0;
          if (vel.vx > 0.1) {
            angle = Math.PI * 0.35; // 3/4 turn right
          } else if (vel.vx < -0.1) {
            angle = -Math.PI * 0.35; // 3/4 turn left
          }

          // If moving vertically away/up, show 360 back view
          if (vel.vy < -0.45) {
            angle = Math.PI * 0.95; // Rear view
          } else if (vel.vy > 0.45) {
            angle = 0; // Front view
          }

          setFacingAngle(angle);

          // Gentle footstep spark particles
          if (Math.random() < 0.1) {
            particleIdRef.current += 1;
            const newParticle: DustParticle = {
              id: particleIdRef.current,
              x: pos.x + 65 + (Math.random() * 14 - 7),
              y: pos.y + 175,
              opacity: 0.65,
              size: Math.random() * 3 + 2,
            };
            setDustParticles((prev) => [...prev.slice(-6), newParticle]);
          }
        } else {
          // --- STANDING / IDLE / FRONT VIEW WAVING ---
          setCharState('standing');
          setRunSpeed(0);
          setFacingAngle(0); // Smoothly turns to 0° facing the user!
          setIsWaving(true);
        }

        if (containerNodeRef.current) {
          containerNodeRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
        }
      } else {
        if (containerNodeRef.current) {
          containerNodeRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) scale(1.04)`;
        }
      }

      // Age dust particles
      setDustParticles((prev) =>
        prev
          .map((p) => ({ ...p, y: p.y - 0.3, opacity: p.opacity - dt * 2.0 }))
          .filter((p) => p.opacity > 0)
      );

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Dragging support
  const handleStartDrag = (cx: number, cy: number) => {
    isDraggingRef.current = true;
    dragOffsetRef.current = {
      x: cx - posRef.current.x,
      y: cy - posRef.current.y,
    };
  };

  const handleMoveDrag = (cx: number, cy: number) => {
    if (!isDraggingRef.current) return;
    const nx = cx - dragOffsetRef.current.x;
    const ny = cy - dragOffsetRef.current.y;
    posRef.current = { x: nx, y: ny };
    targetRef.current = { x: nx, y: ny };
  };

  const handleEndDrag = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      targetRef.current.x = Math.max(10, Math.min(vw - 140, posRef.current.x));
      targetRef.current.y = Math.min(vh - 180, Math.max(70, posRef.current.y));
    }
  };

  const handleCompanionTap = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    sounds.playPop();
    setIsAssistantOpen(true);
  };

  const handleQuickQuestion = (question: string, answer: string) => {
    sounds.playClick();
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: question },
      { sender: 'assistant', text: answer },
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
      { sender: 'assistant', text: reply },
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
      {/* Gentle Footstep Sparks / Dust Particles */}
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
          }}
        />
      ))}

      {/* Mini Suhash Physical 3D Character Container */}
      <div
        id="mini-suhash-container"
        ref={containerNodeRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
        className="fixed top-0 left-0 z-40 select-none group flex flex-col items-center pointer-events-auto touch-none"
        style={{
          width: '130px',
          height: '190px',
          willChange: 'transform',
        }}
      >
        {/* Real-time Dynamic Context Speech Bubble */}
        <div
          onClick={handleCompanionTap}
          className={`absolute -top-7 z-50 whitespace-nowrap px-3 py-1 rounded-full bg-white dark:bg-[#0f172a] border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-[11px] font-mono font-bold shadow-brutal-sm flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
            isHovered ? 'scale-110 -translate-y-1' : ''
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              charState === 'running' ? 'bg-amber-500 animate-ping' : 'bg-emerald-500 animate-pulse'
            }`}
          />
          <span>{getSectionBubble(activeSection)}</span>
        </div>

        {/* The Exact Cartoon Character in Full 3D 360-Degree Rotation */}
        <MiniSuhash3D
          charState={charState}
          runSpeed={runSpeed}
          facingAngle={facingAngle}
          isWaving={isWaving}
          onCharacterClick={handleCompanionTap}
          scale={typeof window !== 'undefined' && window.innerWidth < 640 ? 0.85 : 1.0}
        />

        {/* Status Pill Badge */}
        <div
          onClick={handleCompanionTap}
          className="cursor-pointer -mt-1 px-2.5 py-0.5 rounded-full bg-slate-900/90 dark:bg-slate-100/90 text-white dark:text-slate-900 font-mono text-[9px] font-extrabold uppercase tracking-wider shadow-sm border border-slate-700 dark:border-slate-300"
        >
          {charState === 'running' ? 'Jogging ✦' : 'Mini Suhash ✦'}
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
                      3D AI Guide
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400">
                    360° Real-time 3D physics companion
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
