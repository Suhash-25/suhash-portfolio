import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Play, Sparkles, CornerDownLeft } from 'lucide-react';
import { projects } from '../data/portfolioData';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
}

interface CommandHistoryItem {
  command: string;
  output: React.ReactNode;
}

export const TerminalPlayground: React.FC<TerminalProps> = ({ isOpen, onClose, onSelectProject }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-2 text-slate-300">
          <p className="text-cyan-300 font-semibold">
            ⚡ Welcome to Suhash's Interactive Agentic AI Terminal v2.6.0
          </p>
          <p className="text-xs text-slate-400">
            Type <span className="text-amber-300 font-mono">help</span> to list commands or click the quick pills below to explore.
          </p>
        </div>
      )
    }
  ]);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isSimulatingAgent, setIsSimulatingAgent] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isSimulatingAgent]);

  if (!isOpen) return null;

  const runCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    let output: React.ReactNode = null;

    switch (trimmed) {
      case 'help':
        output = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <p className="text-cyan-300 font-semibold mb-1">Available Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono">
              <div><span className="text-amber-300">projects</span> — List all AI/ML projects</div>
              <div><span className="text-amber-300">skills</span> — View core tech stack & proficiencies</div>
              <div><span className="text-amber-300">agent-demo</span> — Simulate Agentic AI tool-calling loop</div>
              <div><span className="text-amber-300">contact</span> — Get direct contact links</div>
              <div><span className="text-amber-300">stats</span> — Academic & project performance metrics</div>
              <div><span className="text-amber-300">clear</span> — Clear terminal output</div>
              <div><span className="text-amber-300">exit</span> — Close terminal</div>
            </div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs">
            <p className="text-cyan-300 font-semibold">Featured Architectures & Repositories:</p>
            {projects.map((p, i) => (
              <div key={p.id} className="p-2 rounded bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-indigo-300 font-semibold">{i + 1}. {p.title}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-400 font-mono">{p.category}</span>
                </div>
                <p className="text-slate-400 text-[11px]">{p.tagline}</p>
                <div className="flex gap-2 pt-1">
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-cyan-400 underline hover:text-cyan-300"
                  >
                    GitHub Repo
                  </a>
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-emerald-400 underline hover:text-emerald-300"
                    >
                      Production Live
                    </a>
                  )}
                  {onSelectProject && (
                    <button
                      onClick={() => onSelectProject(p.id)}
                      className="text-[11px] text-indigo-400 underline hover:text-indigo-300"
                    >
                      Inspect Specs
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-2 text-xs">
            <p className="text-cyan-300 font-semibold">Technical Arsenal Breakdown:</p>
            <div className="space-y-1.5 font-mono text-[11px]">
              <div><span className="text-purple-400 font-semibold">[AI/ML]:</span> PyTorch, TensorFlow, LLMs, Agentic AI, Hugging Face, OpenCV, Scikit-learn</div>
              <div><span className="text-blue-400 font-semibold">[Languages]:</span> Python (Expert), C++, C, SQL, TypeScript, Bash</div>
              <div><span className="text-emerald-400 font-semibold">[Backend]:</span> FastAPI, REST APIs, Tool-calling protocols, ROS 2 Middleware</div>
              <div><span className="text-amber-400 font-semibold">[Data/Cloud]:</span> PostgreSQL, MongoDB, Microsoft Azure, Linux, ESP32 BLE</div>
            </div>
          </div>
        );
        break;

      case 'stats':
        output = (
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Undergraduate CGPA:</span> <span className="text-emerald-400 font-bold">9.2 / 10</span> (MIT Mysore)
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-400">IoT Anomaly Detection:</span> <span className="text-cyan-400 font-bold">94% Accuracy</span>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Voice Recognition:</span> <span className="text-indigo-400 font-bold">85% Accuracy</span>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-400">GSA Reach:</span> <span className="text-purple-400 font-bold">900+ Students</span>
            </div>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-cyan-300 font-semibold">Direct Communication Channels:</p>
            <div>📧 Email: <a href="mailto:suhasacharya0525@gmail.com" className="text-indigo-300 underline">suhasacharya0525@gmail.com</a></div>
            <div>📱 Phone: <a href="tel:+918217536806" className="text-indigo-300 underline">+91 8217536806</a></div>
            <div>🐙 GitHub: <a href="https://github.com/Suhash-25" target="_blank" rel="noopener noreferrer" className="text-indigo-300 underline">github.com/Suhash-25</a></div>
            <div>💼 LinkedIn: <a href="https://www.linkedin.com/in/suhash-g" target="_blank" rel="noopener noreferrer" className="text-indigo-300 underline">linkedin.com/in/suhash-g</a></div>
          </div>
        );
        break;

      case 'agent-demo':
        simulateAgentExecution();
        return;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
        onClose();
        return;

      default:
        output = (
          <p className="text-rose-400 text-xs">
            Command not recognized: "{cmdStr}". Type <span className="text-amber-300 font-mono">help</span> for commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: cmdStr, output }]);
    setInput('');
  };

  const simulateAgentExecution = () => {
    setIsSimulatingAgent(true);
    const traceSteps = [
      { step: 1, text: "[Agent Init] Orchestrating Energy Intelligent Agent...", delay: 400 },
      { step: 2, text: "[LLM Reasoning] Parsing user energy constraints: Target wattage < 120W, efficiency >= 90%...", delay: 1000 },
      { step: 3, text: "[Tool Call] dispatch -> fetch_device_telemetry_api(query='smart-inverter', limit=5)", delay: 1700 },
      { step: 4, text: "[API Response] 200 OK — Ingested 5 telemetry records from cloud database.", delay: 2400 },
      { step: 5, text: "[Optimization Matrix] Evaluated Pareto front for cost vs. power conservation ratio.", delay: 3100 },
      { step: 6, text: "[Final Synthesis] Optimal recommendation verified: Model EIA-Apex (Confidence: 96.8%). Latency: 218ms.", delay: 3800 },
    ];

    traceSteps.forEach(({ text, delay }, idx) => {
      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          {
            command: idx === 0 ? 'agent-demo' : '',
            output: (
              <div className="font-mono text-xs text-emerald-300 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{text}</span>
              </div>
            )
          }
        ]);
        if (idx === traceSteps.length - 1) {
          setIsSimulatingAgent(false);
        }
      }, delay);
    });
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div
        className={`w-full bg-[#0a0f1d] border border-cyan-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isMaximized ? 'h-[95vh] max-w-[95vw]' : 'h-[600px] max-w-3xl'
        }`}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0d1424] border-b border-white/10 select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={onClose} />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <div className="ml-3 flex items-center gap-2 text-xs font-mono text-slate-400">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>guest@suhash-ai-terminal: ~</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 hover:text-white rounded"
              title="Toggle Size"
            >
              {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:text-rose-400 rounded"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 bg-slate-900/50 border-b border-white/5 flex flex-wrap gap-1.5 items-center">
          <span className="text-[11px] font-mono text-slate-400">Quick run:</span>
          {['help', 'projects', 'agent-demo', 'skills', 'stats', 'contact', 'clear'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => runCommand(cmd)}
              disabled={isSimulatingAgent}
              className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 transition-all flex items-center gap-1 disabled:opacity-50"
            >
              <Play className="w-2.5 h-2.5" />
              <span>{cmd}</span>
            </button>
          ))}
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-sm space-y-3">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              {item.command && (
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <span className="text-cyan-400">guest@suhash:~$</span>
                  <span className="text-white font-medium">{item.command}</span>
                </div>
              )}
              <div>{item.output}</div>
            </div>
          ))}

          {isSimulatingAgent && (
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Agent processing tool-calling cycle...</span>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Prompt Input */}
        <div className="p-3 bg-[#0d1424] border-t border-white/10 flex items-center gap-2 font-mono text-xs">
          <span className="text-cyan-400 font-semibold shrink-0">guest@suhash:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSimulatingAgent}
            placeholder="Type a command (e.g., 'agent-demo', 'projects', 'help')..."
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500"
          />
          <button
            onClick={() => runCommand(input)}
            disabled={!input.trim() || isSimulatingAgent}
            className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-sans text-xs disabled:opacity-40 flex items-center gap-1"
          >
            <span>Run</span>
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
