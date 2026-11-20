import React, { useState } from 'react';
import { X, Printer, Copy, CheckCircle2, FileText, ExternalLink } from 'lucide-react';
import { personalInfo, projects } from '../data/portfolioData';

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
LinkedIn: https://www.linkedin.com/in/suhash-g | GitHub: https://github.com/Suhash-25 | LeetCode: https://leetcode.com/u/suhasacharya0525/

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#090d16] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0d1424] border-b border-white/10">
          <div className="flex items-center gap-2 text-white font-display font-bold text-base">
            <FileText className="w-5 h-5 text-indigo-400" />
            <span>Curriculum Vitae — {personalInfo.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 transition-colors border border-white/10"
              title="Copy Full Plain Text Resume"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white transition-colors shadow-sm"
              title="Print / Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              title="Close Resume"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Container */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#090d16] text-slate-200 font-sans print:bg-white print:text-black">
          
          {/* Header */}
          <div className="text-center border-b border-white/10 pb-6">
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              {personalInfo.name}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-mono text-slate-400 mt-2">
              <span>{personalInfo.contact.phone}</span>
              <span>•</span>
              <a href={`mailto:${personalInfo.contact.email}`} className="text-indigo-400 hover:underline">
                {personalInfo.contact.email}
              </a>
              <span>•</span>
              <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                LinkedIn
              </a>
              <span>•</span>
              <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                GitHub
              </a>
              <span>•</span>
              <a href={personalInfo.socials.leetcode} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                LeetCode
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold mb-2 border-b border-indigo-500/20 pb-1">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              AI & Machine Learning undergraduate skilled in LLMs, Computer Vision, NLP, and Intelligent Automation. Experienced in building AI-powered applications using Python, PyTorch, TensorFlow, Agentic AI and FastAPI with proven leadership through internships, hackathons, and technical communities.
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold mb-3 border-b border-indigo-500/20 pb-1">
              Education
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
              <span className="font-semibold text-white">Bachelor of Engineering – Computer Science and Engineering (AI & ML)</span>
              <span className="font-mono text-slate-400">2023 – 2027</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-300 mt-1 font-mono">
              <span className="text-cyan-300">Maharaja Institute of Technology Mysore</span>
              <span className="text-emerald-400 font-bold">9.2 CGPA</span>
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold mb-3 border-b border-indigo-500/20 pb-1">
              Professional Experience
            </h2>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-white">Machine Learning Intern – Skillbit Technologies</span>
                  <span className="font-mono text-slate-400 text-xs">Feb 2026 – Apr 2026</span>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pl-1">
                  <li>Developed and optimized machine learning models using Python, Scikit-learn, and feature engineering for real-world predictive tasks.</li>
                  <li>Built preprocessing and evaluation pipelines, improving model performance through hyperparameter tuning.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Leadership & Experience */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold mb-3 border-b border-indigo-500/20 pb-1">
              Leadership & Experience
            </h2>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-white">General Secretary – InnovateX Club</span>
                  <span className="font-mono text-slate-400 text-xs">Nov 2024 – Nov 2025</span>
                </div>
                <p className="text-xs text-slate-300">
                  Organized technical workshops, hackathons, and innovation initiatives while leading cross-functional student teams and increasing participation by 40% by organizing more than 15 events.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-white">Google Student Ambassador</span>
                  <span className="font-mono text-slate-400 text-xs">Sep 2025 – Jan 2026</span>
                </div>
                <p className="text-xs text-slate-300">
                  Represented Google on campus by organizing workshops on Google Cloud, AI tools, and developer programs for 900+ students.
                </p>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold mb-3 border-b border-indigo-500/20 pb-1">
              Projects
            </h2>
            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                    <div className="font-bold text-white flex items-center gap-2">
                      <span>{proj.title}</span>
                      <span className="text-slate-400 text-xs font-normal">[{proj.technologies.slice(0, 4).join(', ')}]</span>
                    </div>
                    <span className="font-mono text-slate-400 text-xs">{proj.year}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-3 text-[11px] font-mono text-cyan-400 pt-0.5">
                    <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                      <span>GitHub</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline flex items-center gap-1">
                        <span>Production Deployment</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold mb-3 border-b border-indigo-500/20 pb-1">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div><strong className="text-slate-200">Programming:</strong> <span className="text-slate-400">Python, C++, C</span></div>
              <div><strong className="text-slate-200">AI & ML:</strong> <span className="text-slate-400">Machine Learning, Deep Learning, NLP, Computer Vision, LLMs, Agentic AI</span></div>
              <div><strong className="text-slate-200">Libraries & Frameworks:</strong> <span className="text-slate-400">TensorFlow, Scikit-learn, Pandas, NumPy, OpenCV, PyTorch</span></div>
              <div><strong className="text-slate-200">Data Technologies:</strong> <span className="text-slate-400">SQL, MongoDB, Data Analysis, Data Visualization</span></div>
              <div><strong className="text-slate-200">Web Development:</strong> <span className="text-slate-400">HTML, CSS, React.js, Tailwind CSS, Three.js</span></div>
              <div><strong className="text-slate-200">Backend:</strong> <span className="text-slate-400">FastAPI, REST APIs</span></div>
              <div><strong className="text-slate-200">Tools:</strong> <span className="text-slate-400">Git, GitHub, Linux</span></div>
            </div>
          </div>

          {/* Certifications & Achievements */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold mb-3 border-b border-indigo-500/20 pb-1">
              Certifications & Achievements
            </h2>
            <div className="space-y-2 text-xs text-slate-300">
              <p>• <strong>IBM SQL for Data Science</strong> — IBM</p>
              <p>• <strong>Duke Generative AI</strong> — Duke University</p>
              <p>• <strong>Network Security</strong> — Google</p>
              <p>• <strong>Microsoft Azure Fundamentals</strong> — Microsoft</p>
              <p>• <strong>Winner</strong> — DevHack 2025 Hackathon (Malnad College of Engineering, Hassan)</p>
              <p>• <strong>Winner</strong> — Discovery Day 2026 Ideathon, <strong>Runner</strong> — SparkVerse 2026 Ideathon (MIT Mysore)</p>
              <p>• <strong>Open-source Contributor</strong> — SWOC 2024, OSCI 2025</p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#0d1424] border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Suhash G • AI & Machine Learning Portfolio</span>
          <button onClick={onClose} className="hover:text-white transition-colors">
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
