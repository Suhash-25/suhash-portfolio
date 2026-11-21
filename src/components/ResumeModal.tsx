import React, { useState } from 'react';
import { X, Printer, Copy, CheckCircle2, FileText, ExternalLink } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const rawResumeText = `
Suhash G
Phone: +91 8217536806 | Email: suhasacharya0525@gmail.com
LinkedIn: https://www.linkedin.com/in/suhash-g | GitHub: https://github.com/Suhash-25 | LeetCode: https://leetcode.com/u/l2ZtHkX4cD/

PROFESSIONAL SUMMARY
AI & Machine Learning undergraduate skilled in LLMs, Computer Vision, NLP, and Intelligent Automation. Experienced in building AI-powered applications using Python, PyTorch, TensorFlow, Agentic AI and FastAPI with proven leadership through internships, hackathons, and technical communities.

EDUCATION
Bachelor of Engineering – Computer Science and Engineering (AI & ML) (2023 – 2027)
Maharaja Institute of Technology Mysore – 9.2 CGPA

PROFESSIONAL EXPERIENCE
Machine Learning Intern – Skillbit Technologies (Feb 2026 – Apr 2026)
- Developed and optimized machine learning models using Python, Scikit-learn, and feature engineering for real-world predictive tasks.
- Built preprocessing and evaluation pipelines, improving model performance through hyperparameter tuning.

LEADERSHIP & EXPERIENCE
General Secretary – InnovateX Club (Nov 2024 – Nov 2025)
- Organized technical workshops, hackathons, and innovation initiatives while leading cross-functional student teams and increasing participation by 40% by organizing more than 15 events.
Google Student Ambassador (Sep 2025 – Jan 2026)
- Represented Google on campus by organizing workshops on Google Cloud, AI tools, and developer programs for 900+ students.

PROJECTS
1. Maya AI – Voice Based Chatbot (Python, Hugging Face Transformers, SpeechRecognition, FastAPI, RAG)
   - Developed a voice-enabled AI assistant achieving 85% command recognition accuracy. Automated 10+ system tasks through natural language voice commands. (https://github.com/Suhash-25/Maya-AI)
2. Energy Intelligent Agent System (Python, LLMs, Agentic AI, APIs, Tool calling)
   - Built an LLM-powered agentic AI system integrating 3+ APIs to recommend energy-efficient devices. Implemented tool-calling workflows delivering recommendations with 30% faster response. Live: https://eia-production-5e54de99.up.railway.app/ (https://github.com/Suhash-25/Agentic-AI-MIT)
3. Adaptive Reinforcement Learning System for Autonomous Space Exploration (ORION Rover) (Python, ROS 2, Gazebo, PyTorch, Meta Reinforcement Learning)
   - Built an autonomous rover using Meta Reinforcement Learning to adapt navigation policies to unseen planetary terrains. Integrating ROS 2, Gazebo, and PyTorch. (https://github.com/Suhash-25/ORION-Rover.git)
4. AI Personal Assistant (Python, Speech Recognition, NLP)
   - Engineered a voice-controlled AI assistant capable of executing 15+ voice commands for system automation and information retrieval with 85% accuracy. (https://github.com/Suhash-25/AI-assistant-Jarvis-)
5. AI-Powered IoT Security Framework (IoT, AI/ML, ESP32)
   - Designed an AI-powered IoT security framework using ESP32 and machine learning, achieving 94% anomaly detection accuracy. Improved network reliability by 30%. (https://github.com/Suhash-25/iot-framework.git)

TECHNICAL SKILLS
- Programming: Python, C++, C
- AI & ML: Machine Learning, Deep Learning, Natural Language Processing, Computer Vision, LLM Applications, Agentic AI
- Libraries & Frameworks: TensorFlow, Scikit-learn, Pandas, NumPy, OpenCV, PyTorch
- Data Technologies: SQL, MongoDB, Data Analysis, Data Visualization
- Web Development: HTML, CSS, React.js, Tailwind CSS, Three.js
- Backend: FastAPI, REST APIs
- Tools: Git, GitHub, Linux

CERTIFICATIONS
- IBM SQL for Data Science – IBM
- Duke Generative AI – Duke University
- Network Security – Google
- Microsoft Azure Fundamentals – Microsoft

ACHIEVEMENTS & ACTIVITIES
- Winner - DevHack 2025 Hackathon (Malnad College of Engineering, Hassan)
- Winner - Discovery Day 2026 Ideathon, Runner - SparkVerse 2026 Ideathon (Maharaja Institute of Technology Mysore)
- Open-source contributor and organizer of AI/ML communities (SWOC 2024, OSCI 2025)
  `.trim();

  const handleCopyText = () => {
    navigator.clipboard.writeText(rawResumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#090d16] border-2 border-slate-300 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-slate-900 dark:text-slate-100">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-100 dark:bg-[#0d1424] border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-display font-bold text-base">
            <FileText className="w-5 h-5 text-blue-600 dark:text-indigo-400" />
            <span>Curriculum Vitae — {personalInfo.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-xs font-mono text-slate-800 dark:text-slate-300 transition-colors border border-slate-300 dark:border-white/10 font-semibold shadow-sm"
              title="Copy Full Plain Text Resume"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-700 dark:text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 text-xs font-bold text-white transition-colors shadow-sm"
              title="Print / Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              title="Close Resume"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Container */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-white dark:bg-[#090d16] text-slate-900 dark:text-slate-200 font-sans print:bg-white print:text-black">
          
          {/* Header */}
          <div className="text-center border-b border-slate-200 dark:border-white/10 pb-6">
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
              {personalInfo.name}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-mono text-slate-600 dark:text-slate-400 mt-2 font-medium">
              <span>{personalInfo.contact.phone}</span>
              <span>•</span>
              <a href={`mailto:${personalInfo.contact.email}`} className="text-blue-600 dark:text-indigo-400 hover:underline">
                {personalInfo.contact.email}
              </a>
              <span>•</span>
              <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-cyan-400 hover:underline">
                LinkedIn
              </a>
              <span>•</span>
              <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-cyan-400 hover:underline">
                GitHub
              </a>
              <span>•</span>
              <a href={personalInfo.socials.leetcode} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-cyan-400 hover:underline">
                LeetCode
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-blue-700 dark:text-indigo-400 font-bold mb-2 border-b border-blue-200 dark:border-indigo-500/20 pb-1">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-300 leading-relaxed font-normal">
              AI & Machine Learning undergraduate skilled in LLMs, Computer Vision, NLP, and Intelligent Automation. Experienced in building AI-powered applications using Python, PyTorch, TensorFlow, Agentic AI and FastAPI with proven leadership through internships, hackathons, and technical communities.
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-blue-700 dark:text-indigo-400 font-bold mb-3 border-b border-blue-200 dark:border-indigo-500/20 pb-1">
              Education
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
              <span className="font-bold text-slate-900 dark:text-white">Bachelor of Engineering – Computer Science and Engineering (AI & ML)</span>
              <span className="font-mono text-slate-600 dark:text-slate-400 font-semibold">2023 – 2027</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 mt-1 font-mono">
              <span className="text-slate-800 dark:text-cyan-300 font-semibold">Maharaja Institute of Technology Mysore</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">9.2 CGPA</span>
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-blue-700 dark:text-indigo-400 font-bold mb-3 border-b border-blue-200 dark:border-indigo-500/20 pb-1">
              Professional Experience
            </h2>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-slate-900 dark:text-white">Machine Learning Intern – Skillbit Technologies</span>
                  <span className="font-mono text-slate-600 dark:text-slate-400 text-xs font-semibold">Feb 2026 – Apr 2026</span>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-800 dark:text-slate-300 space-y-1 pl-1">
                  <li>Developed and optimized machine learning models using Python, Scikit-learn, and feature engineering for real-world predictive tasks.</li>
                  <li>Built preprocessing and evaluation pipelines, improving model performance through hyperparameter tuning.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Leadership & Experience */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-blue-700 dark:text-indigo-400 font-bold mb-3 border-b border-blue-200 dark:border-indigo-500/20 pb-1">
              Leadership & Experience
            </h2>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-slate-900 dark:text-white">General Secretary – InnovateX Club</span>
                  <span className="font-mono text-slate-600 dark:text-slate-400 text-xs font-semibold">Nov 2024 – Nov 2025</span>
                </div>
                <p className="text-xs text-slate-800 dark:text-slate-300">
                  Organized technical workshops, hackathons, and innovation initiatives while leading cross-functional student teams and increasing participation by 40% by organizing more than 15 events.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-slate-900 dark:text-white">Google Student Ambassador</span>
                  <span className="font-mono text-slate-600 dark:text-slate-400 text-xs font-semibold">Sep 2025 – Jan 2026</span>
                </div>
                <p className="text-xs text-slate-800 dark:text-slate-300">
                  Represented Google on campus by organizing workshops on Google Cloud, AI tools, and developer programs for 900+ students.
                </p>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-blue-700 dark:text-indigo-400 font-bold mb-3 border-b border-blue-200 dark:border-indigo-500/20 pb-1">
              Projects
            </h2>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>1. Maya AI – Voice Based Chatbot</span>
                    <a href="https://github.com/Suhash-25/Maya-AI" target="_blank" rel="noreferrer" className="text-blue-600 dark:text-cyan-400">
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </span>
                  <span className="font-mono text-slate-600 dark:text-slate-400 text-xs">Python, Hugging Face, FastAPI, RAG</span>
                </div>
                <p className="text-xs text-slate-800 dark:text-slate-300">
                  Developed a voice-enabled AI assistant achieving 85% command recognition accuracy. Automated 10+ system tasks through natural language voice commands.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>2. Energy Intelligent Agent System</span>
                    <a href="https://eia-production-5e54de99.up.railway.app/" target="_blank" rel="noreferrer" className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold underline">
                      (Live on Railway)
                    </a>
                  </span>
                  <span className="font-mono text-slate-600 dark:text-slate-400 text-xs">Python, Agentic AI, APIs, Tool Calling</span>
                </div>
                <p className="text-xs text-slate-800 dark:text-slate-300">
                  Built an LLM-powered agentic AI system integrating 3+ APIs to recommend energy-efficient devices. Implemented tool-calling workflows delivering recommendations with 30% faster response.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>3. ORION Rover – Autonomous Reinforcement Learning</span>
                  </span>
                  <span className="font-mono text-slate-600 dark:text-slate-400 text-xs">ROS 2, Gazebo, PyTorch, Meta-RL</span>
                </div>
                <p className="text-xs text-slate-800 dark:text-slate-300">
                  Built an autonomous rover using Meta Reinforcement Learning to adapt navigation policies to unseen planetary terrains.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-blue-700 dark:text-indigo-400 font-bold mb-3 border-b border-blue-200 dark:border-indigo-500/20 pb-1">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <span className="font-bold text-slate-900 dark:text-white">Programming:</span> <span className="text-slate-800 dark:text-slate-300">Python, C++, C</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white">AI & ML:</span> <span className="text-slate-800 dark:text-slate-300">Machine Learning, Deep Learning, NLP, LLMs, Agentic AI</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white">Frameworks:</span> <span className="text-slate-800 dark:text-slate-300">TensorFlow, Scikit-learn, Pandas, NumPy, OpenCV, PyTorch</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white">Data & Backend:</span> <span className="text-slate-800 dark:text-slate-300">FastAPI, REST APIs, SQL, MongoDB</span>
              </div>
            </div>
          </div>

          {/* Certifications & Achievements */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-blue-700 dark:text-indigo-400 font-bold mb-3 border-b border-blue-200 dark:border-indigo-500/20 pb-1">
              Certifications & Honors
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-800 dark:text-slate-300">
              <div>• 1st Place Champion – DevHack 2025 Hackathon</div>
              <div>• IBM SQL for Data Science – IBM</div>
              <div>• Winner Discovery Day & Runner SparkVerse 2026</div>
              <div>• Generative AI – Duke University</div>
              <div>• Network Security – Google</div>
              <div>• Microsoft Azure Fundamentals – Microsoft</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
