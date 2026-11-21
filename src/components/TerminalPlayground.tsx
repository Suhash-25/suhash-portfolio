import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';
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

export const TerminalPlayground: React.FC<TerminalProps> = ({ isOpen, onClose, onSelectProject: _onSelectProject }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1.5 text-slate-200">
          <p className="text-emerald-400 font-semibold font-mono">
            ⚡ Suhash G — Agentic AI Interactive Terminal v2.6
          </p>
          <p className="text-xs text-slate-300 font-mono">
            Type <span className="text-amber-300 font-bold">help</span> to list commands or click the quick pills below to explore.
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
          <div className="space-y-1.5 text-xs text-slate-200">
            <p className="text-amber-300 font-semibold mb-1">Available Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono">
              <div><span className="text-emerald-400 font-bold">projects</span> — List all AI/ML projects</div>
              <div><span className="text-emerald-400 font-bold">skills</span> — View core tech stack & proficiencies</div>
              <div><span className="text-emerald-400 font-bold">agent-demo</span> — Simulate Agentic AI tool-calling loop</div>
              <div><span className="text-emerald-400 font-bold">contact</span> — Get direct contact links</div>
              <div><span className="text-emerald-400 font-bold">stats</span> — Academic & project performance metrics</div>
              <div><span className="text-emerald-400 font-bold">clear</span> — Clear terminal output</div>
              <div><span className="text-emerald-400 font-bold">exit</span> — Close terminal</div>
            </div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs">
            <p className="text-white font-semibold">Featured Architectures & Repositories:</p>
            {projects.map((p, i) => (
              <div key={p.id} className="p-2 rounded bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-emerald-300 font-semibold">{i + 1}. {p.title}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">{p.category}</span>
                </div>
                <p className="text-slate-300 text-[11px]">{p.tagline}</p>
                <div className="flex gap-2.5 pt-1">
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-cyan-400 underline hover:text-white"
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
                      Railway Live
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-1.5 text-xs font-mono text-slate-200">
            <p className="text-white font-semibold">Technical Arsenal & Proficiencies:</p>
            <p><span className="text-emerald-400 font-bold">Languages:</span> Python (Advanced), C++, C, SQL</p>
            <p><span className="text-emerald-400 font-bold">AI / ML:</span> PyTorch, TensorFlow, Hugging Face, Scikit-learn, OpenCV</p>
            <p><span className="text-emerald-400 font-bold">Agentic AI:</span> LLM Tool-Calling, RAG, Multi-Agent Coordination, FastAPI</p>
            <p><span className="text-emerald-400 font-bold">Robotics:</span> ROS 2, Gazebo, Meta Reinforcement Learning (ORION Rover)</p>
          </div>
        );
        break;

      case 'agent-demo':
        setIsSimulatingAgent(true);
        setTimeout(() => {
          setHistory((prev) => [
            ...prev,
            {
              command: 'agent-demo',
              output: (
                <div className="space-y-1.5 text-xs font-mono text-emerald-300">
                  <p className="text-white font-bold">⚡ Simulating Energy Intelligent Agent Tool-Calling Workflow:</p>
                  <p className="text-cyan-400">1. [USER_QUERY] "Find lowest-wattage appliance with 4+ star rating under ₹25k"</p>
                  <p className="text-amber-300">2. [AGENT_PARSER] Calling API: `api.hardware.catalog.search()`</p>
                  <p className="text-blue-300">3. [TOOL_EXECUTION] Received 14 candidate devices with live power telemetry</p>
                  <p className="text-purple-300">4. [PARETO_OPTIMIZER] Computed lowest kWh consumption / price delta</p>
                  <p className="text-emerald-400 font-bold">5. [RESULT] Recommendation synthesized in 1.4s (30% latency reduction)</p>
                  <p className="text-xs text-slate-300">Deployment verified live on Railway: https://eia-production-5e54de99.up.railway.app/</p>
                </div>
              )
            }
          ]);
          setIsSimulatingAgent(false);
        }, 1200);
        return;

      case 'stats':
        output = (
          <div className="space-y-1 text-xs font-mono text-slate-200">
            <p className="text-white font-semibold">Suhash G — Key Metrics:</p>
            <p>• CGPA: <span className="text-emerald-400 font-bold">9.2 / 10.0</span> (Maharaja Institute of Technology Mysuru)</p>
            <p>• Students Mentored: <span className="text-cyan-400 font-bold">900+</span> as Google Student Ambassador</p>
            <p>• Hackathons Won: <span className="text-amber-300 font-bold">1st Place DevHack 2025</span> + 1st Discovery Day 2026</p>
            <p>• Active AI Repositories: <span className="text-white font-bold">5+ High-Accuracy Architectures</span></p>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-xs font-mono text-slate-200">
            <p className="text-white font-semibold">Direct Communication Channels:</p>
            <p>• Email: <a href="mailto:suhasacharya0525@gmail.com" className="text-cyan-400 underline">suhasacharya0525@gmail.com</a></p>
            <p>• Phone: <span className="text-emerald-400">+91 8217536806</span></p>
            <p>• LinkedIn: <a href="https://www.linkedin.com/in/suhash-g" target="_blank" rel="noreferrer" className="text-blue-400 underline">linkedin.com/in/suhash-g</a></p>
            <p>• GitHub: <a href="https://github.com/Suhash-25" target="_blank" rel="noreferrer" className="text-slate-300 underline">github.com/Suhash-25</a></p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'exit':
        onClose();
        return;

      default:
        output = (
          <p className="text-xs font-mono text-rose-400">
            Command not recognized: '{trimmed}'. Type <span className="text-white underline">help</span> for a list of available commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmdStr, output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    runCommand(input);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className={`relative w-full ${
          isMaximized ? 'max-w-6xl h-[90vh]' : 'max-w-2xl h-[560px]'
        } bg-[#0A0E1A] border-2 border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden font-mono transition-all duration-300`}
      >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0d1424] border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="flex items-center gap-1.5 ml-2 text-xs text-slate-300 font-semibold">
              <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>suhash@mit-mysuru:~/agentic-ai$</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title={isMaximized ? 'Minimize Window' : 'Maximize Window'}
            >
              {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Close Terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Action Commands Pill Bar */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-[#090d16] border-b border-slate-800 overflow-x-auto text-[11px] scrollbar-none">
          <span className="text-slate-500 shrink-0">Quick run:</span>
          {['help', 'projects', 'skills', 'agent-demo', 'stats', 'contact'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => runCommand(cmd)}
              className="px-2.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 shrink-0 border border-slate-700 transition-colors font-mono"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Console Log Scroll Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs leading-relaxed">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-emerald-400 font-bold">&gt;</span>
                <span className="text-slate-100 font-bold">{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}

          {isSimulatingAgent && (
            <div className="flex items-center gap-2 text-amber-300 pl-4 py-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>Agent reasoning and dispatching tool calls...</span>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Prompt Input Line */}
        <form onSubmit={handleSubmit} className="p-3 bg-[#0d1424] border-t border-slate-800 flex items-center gap-2">
          <span className="text-emerald-400 font-bold">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help', 'projects', 'agent-demo' or any command..."
            className="flex-1 bg-transparent text-white placeholder-slate-500 text-xs focus:outline-none font-mono"
          />
          <button
            type="submit"
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Execute Command"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
