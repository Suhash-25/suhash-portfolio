import { Project, ExperienceItem, SkillCategory, Achievement } from '../types';

export const personalInfo = {
  name: "Suhash G",
  role: "AI & Machine Learning Engineer",
  tagline: "Engineering Agentic AI, Autonomous Intelligence, and Full-Stack Machine Learning Solutions.",
  bio: "Undergraduate in Computer Science & Engineering (AI & ML) at Maharaja Institute of Technology Mysore (9.2 CGPA). Specializing in LLMs, Autonomous Agentic Systems, Computer Vision, and Predictive AI pipelines with experience deploying production-ready intelligent services.",
  contact: {
    email: "suhasacharya0525@gmail.com",
    phone: "+91 8217536806",
    location: "Mysore, Karnataka, India",
    availability: "Available for AI/ML Roles & Research Collaborations (2026)",
    timezone: "IST (UTC+5:30)",
  },
  socials: {
    github: "https://github.com/Suhash-25",
    linkedin: "https://www.linkedin.com/in/suhash-g",
    leetcode: "https://leetcode.com/u/suhasacharya0525/",
    email: "mailto:suhasacharya0525@gmail.com",
    phone: "tel:+918217536806"
  },
  metrics: [
    { label: "Academic CGPA", value: "9.2", suffix: "/ 10", caption: "MIT Mysore (AI & ML)" },
    { label: "Detection Accuracy", value: "94%", suffix: "", caption: "IoT Security AI Framework" },
    { label: "Command Execution", value: "85%", suffix: "", caption: "Voice & NLP Assistants" },
    { label: "Community Reach", value: "900+", suffix: "Students", caption: "Google Student Ambassador" }
  ]
};

export const projects: Project[] = [
  {
    id: "energy-intelligent-agent",
    title: "Energy Intelligent Agent System",
    category: "Agentic AI & LLMs",
    tagline: "Autonomous Agentic AI for Smart Energy Recommendations & Tool-Calling Workflows",
    description: "An enterprise-ready Agentic AI architecture leveraging LLM reasoning, multi-API orchestration, and dynamic tool-calling protocols to autonomously evaluate and recommend energy-efficient hardware and devices based on real-time consumer parameters.",
    highlights: [
      "Integrated 3+ live APIs for dynamic product spec fetching, price evaluation, and efficiency ratings.",
      "Implemented intelligent tool-calling workflows reducing recommendation response latency by 30%.",
      "Architected with production-ready cloud deployment on Railway with robust error fallbacks and structured JSON outputs."
    ],
    technologies: ["Python", "Agentic AI", "LLMs", "FastAPI", "Tool Calling", "REST APIs", "Railway"],
    metrics: [
      { label: "Response Speedup", value: "30% Faster" },
      { label: "APIs Orchestrated", value: "3+ Services" },
      { label: "Deployment", value: "Production Live" }
    ],
    githubUrl: "https://github.com/Suhash-25/Agentic-AI-MIT",
    liveUrl: "https://eia-production-5e54de99.up.railway.app/",
    year: "2026",
    featured: true,
    architectureDetails: "User Prompt -> Agent Planner -> Tool Selector -> Multi-API Ingestion Engine -> Context Augmentation -> Verified Recommendation Synthesis"
  },
  {
    id: "maya-ai",
    title: "Maya AI – Voice Based Chatbot",
    category: "Voice & NLP",
    tagline: "Real-Time Voice-Enabled AI Assistant Powered by Transformers & RAG Architecture",
    description: "A bidirectional conversational voice agent built using Hugging Face Transformers, SpeechRecognition, and FastAPI backend. Maya AI interprets auditory directives, queries vector knowledge bases via RAG, and executes hands-free system actions.",
    highlights: [
      "Achieved 85% voice command recognition accuracy across noisy acoustic environments.",
      "Automated 10+ operational system tasks including process dispatch, file retrieval, and information querying.",
      "Embedded Retrieval-Augmented Generation (RAG) to ground answers in verified context data."
    ],
    technologies: ["Python", "Hugging Face", "Transformers", "SpeechRecognition", "FastAPI", "RAG", "PyTorch"],
    metrics: [
      { label: "Voice Accuracy", value: "85%" },
      { label: "Automated Workflows", value: "10+ Tasks" },
      { label: "Backend Latency", value: "< 250ms" }
    ],
    githubUrl: "https://github.com/Suhash-25/Maya-AI",
    year: "2026",
    featured: true,
    architectureDetails: "Acoustic Audio Ingestion -> SpeechRecognition -> Tokenizer & Transformer LLM -> RAG Vector Matcher -> Speech Synthesis & System Executor"
  },
  {
    id: "orion-rover",
    title: "Adaptive Reinforcement Learning for Planetary Exploration",
    category: "Autonomous & Robotics",
    tagline: "ORION Rover: Meta Reinforcement Learning for Autonomous Terrestrial Navigation",
    description: "An autonomous rover navigation system engineered for extraterrestrial planetary exploration. Implements Meta-RL policies enabling the agent to adapt navigation strategies in zero-shot fashion across uncharted rugged terrains.",
    highlights: [
      "Simulated complex celestial topography and sensor telemetry using Gazebo and ROS 2 middleware.",
      "Trained Meta Reinforcement Learning models in PyTorch that adapt motor policies to unprecedented surface friction and obstacles.",
      "Integrated continuous point-cloud LiDAR perception with real-time trajectory optimization."
    ],
    technologies: ["Python", "ROS 2", "Gazebo", "PyTorch", "Meta Reinforcement Learning", "Computer Vision", "Robotics"],
    metrics: [
      { label: "Adaptive Policies", value: "Meta-RL" },
      { label: "Simulation Engine", value: "ROS 2 + Gazebo" },
      { label: "Terrain Adaptation", value: "Zero-Shot" }
    ],
    githubUrl: "https://github.com/Suhash-25/ORION-Rover.git",
    year: "2026",
    featured: true,
    architectureDetails: "Gazebo World -> ROS 2 Point-Cloud Telemetry -> PyTorch Meta-RL Policy Network -> Adaptive Actuator Control"
  },
  {
    id: "ai-iot-security",
    title: "AI-Powered IoT Security Framework",
    category: "IoT & Security",
    tagline: "Edge Machine Learning Anomaly Detection on ESP32 Microcontrollers",
    description: "Hardware-software integrated edge intelligence framework deployed on ESP32 microcontrollers. Employs lightweight ML classifiers to detect abnormal packet traffic, tampering, and wireless spoofing in real time.",
    highlights: [
      "Engineered edge ML inference pipeline achieving 94% anomaly detection accuracy on resource-constrained embedded chips.",
      "Implemented tamper-resistant Bluetooth Low Energy (BLE) communication protocols, boosting wireless network reliability by 30%.",
      "Designed low-power sleep state cycles maximizing edge sensor battery lifespan."
    ],
    technologies: ["C++", "Python", "ESP32", "Scikit-learn", "IoT", "Bluetooth LE", "Embedded ML"],
    metrics: [
      { label: "Anomaly Accuracy", value: "94%" },
      { label: "Reliability Gain", value: "+30%" },
      { label: "Target Hardware", value: "ESP32 Core" }
    ],
    githubUrl: "https://github.com/Suhash-25/iot-framework.git",
    year: "2025",
    featured: false,
    architectureDetails: "ESP32 Sensor Array -> BLE Encrypted Stream -> Edge Feature Normalizer -> ML Anomaly Classifier -> Security Alert Flag"
  },
  {
    id: "ai-assistant-jarvis",
    title: "AI Personal Assistant (Jarvis)",
    category: "Voice & NLP",
    tagline: "System Automation & Intelligent Task Execution Engine via Speech Processing",
    description: "Intelligent desktop automation agent executing natural language voice commands to control OS routines, fetch online intelligence, manage calendar states, and summarize document files.",
    highlights: [
      "Engineered custom intent parsers handling 15+ voice command vectors with 85% accuracy.",
      "Constructed modular command dispatcher for quick expansion into web APIs and native utilities.",
      "Designed zero-dependency fallback offline mode for core system management tasks."
    ],
    technologies: ["Python", "Speech Recognition", "NLP", "PyAutoGUI", "Threading", "REST APIs"],
    metrics: [
      { label: "Execution Accuracy", value: "85%" },
      { label: "Voice Commands", value: "15+ Core Actions" },
      { label: "Response Loop", value: "Sub-second" }
    ],
    githubUrl: "https://github.com/Suhash-25/AI-assistant-Jarvis-",
    year: "2025",
    featured: false,
    architectureDetails: "Voice Input Stream -> Audio Preprocessor -> Intent Classifier -> Task Dispatch Engine -> Native OS System Bridge"
  }
];

export const skillCategories: SkillCategory[] = [
  {
    category: "AI, ML & Deep Learning",
    iconName: "BrainCircuit",
    skills: [
      { name: "Agentic AI & LLMs", level: 95, experienceYears: "2+ yrs", highlight: "Tool-calling, ReAct, multi-agent workflows, prompt engineering" },
      { name: "PyTorch & Deep Learning", level: 90, experienceYears: "2+ yrs", highlight: "Neural architectures, Meta-RL, model training, evaluation" },
      { name: "TensorFlow & Keras", level: 85, experienceYears: "2 yrs", highlight: "CNNs, RNNs, predictive pipelines, edge inference" },
      { name: "Natural Language Processing", level: 92, experienceYears: "2+ yrs", highlight: "Transformers, RAG, Hugging Face, tokenization, embeddings" },
      { name: "Computer Vision", level: 86, experienceYears: "2 yrs", highlight: "OpenCV, image classification, object detection pipelines" },
      { name: "Scikit-learn & Feature Eng.", level: 94, experienceYears: "3 yrs", highlight: "Regression, classification, clustering, hyperparameter tuning" }
    ]
  },
  {
    category: "Programming & Backend",
    iconName: "Code2",
    skills: [
      { name: "Python", level: 96, experienceYears: "3+ yrs", highlight: "Advanced async, OOP, scientific stack (NumPy, Pandas), automation" },
      { name: "FastAPI & REST APIs", level: 92, experienceYears: "2 yrs", highlight: "High-concurrency microservices, Pydantic, OpenAPI, async routers" },
      { name: "C++", level: 84, experienceYears: "2+ yrs", highlight: "Systems programming, embedded algorithms, memory management" },
      { name: "C", level: 82, experienceYears: "2 yrs", highlight: "Embedded C for microcontrollers (ESP32), hardware registers" },
      { name: "ROS 2 & Gazebo", level: 80, experienceYears: "1+ yr", highlight: "Robotics middleware, nodes, topics, simulated planetary environments" }
    ]
  },
  {
    category: "Data & Cloud Infrastructure",
    iconName: "Database",
    skills: [
      { name: "SQL (PostgreSQL / MySQL)", level: 90, experienceYears: "2+ yrs", highlight: "Relational modeling, complex queries, indexing, IBM Certified" },
      { name: "MongoDB & NoSQL", level: 84, experienceYears: "2 yrs", highlight: "Document stores, schema design, aggregation pipelines" },
      { name: "Data Visualization & Analysis", level: 92, experienceYears: "2+ yrs", highlight: "Pandas, NumPy, Matplotlib, Seaborn, exploratory data insights" },
      { name: "Microsoft Azure Cloud", level: 82, experienceYears: "1+ yr", highlight: "Cloud computing fundamentals, AI services, Azure Certified" },
      { name: "Linux & Git/GitHub", level: 90, experienceYears: "3 yrs", highlight: "Bash scripting, CI/CD, collaborative open-source workflows" }
    ]
  },
  {
    category: "Modern Web & Interactive UI",
    iconName: "Layers",
    skills: [
      { name: "React.js & TypeScript", level: 88, experienceYears: "2 yrs", highlight: "Component design, hooks, state management, modern SPA architectures" },
      { name: "Tailwind CSS", level: 94, experienceYears: "2 yrs", highlight: "Custom design systems, responsive layouts, micro-animations" },
      { name: "Three.js & Creative Dev", level: 78, experienceYears: "1 yr", highlight: "Interactive 3D visuals, particle systems, shader experiments" },
      { name: "HTML5 / CSS3 / Modern JS", level: 92, experienceYears: "3 yrs", highlight: "Semantic markup, modern ES6+, CSS grid/flexbox, accessibility" }
    ]
  }
];

export const experiences: ExperienceItem[] = [
  {
    id: "skillbit",
    role: "Machine Learning Intern",
    organization: "Skillbit Technologies",
    location: "Remote / Hybrid",
    period: "Feb 2026 – Apr 2026",
    type: "work",
    badge: "Industry Experience",
    highlights: [
      "Engineered and optimized supervised machine learning models using Python, Scikit-learn, and advanced feature engineering techniques for real-world predictive tasks.",
      "Constructed automated data preprocessing, feature normalization, and cross-validation pipelines to guarantee model reproducibility.",
      "Executed systematic hyperparameter tuning (GridSearchCV, Bayesian optimization) yielding measurable accuracy and F1-score boosts on production benchmarks."
    ],
    metrics: "Production Predictive ML & Feature Pipelines"
  },
  {
    id: "gsa",
    role: "Google Student Ambassador",
    organization: "Google Developer Ecosystem",
    location: "Campus & Virtual",
    period: "Sep 2025 – Jan 2026",
    type: "leadership",
    badge: "Global Tech Representation",
    highlights: [
      "Official campus ambassador representing Google technologies, developer opportunities, and student programs across student communities.",
      "Spearheaded and instructed hands-on technical workshops exploring Google Cloud Platform (GCP), modern AI tools, and Gemini developer APIs for over 900+ registered students.",
      "Facilitated study jams and hackathons, connecting aspiring engineers with mentors and enterprise cloud resources."
    ],
    metrics: "900+ Students Mentored across AI & GCP"
  },
  {
    id: "innovatex",
    role: "General Secretary",
    organization: "InnovateX Club",
    location: "MIT Mysore",
    period: "Nov 2024 – Nov 2025",
    type: "leadership",
    badge: "Student Leadership",
    highlights: [
      "Spearheaded operations for the flagship student innovation club, directing cross-functional executive teams across hackathons, ideathons, and tech conferences.",
      "Organized more than 15 high-impact technical events and workshops, scaling active member engagement and campus participation by 40%.",
      "Managed sponsor relations, budget allocation, and technical judging panels for regional student developers."
    ],
    metrics: "15+ Tech Events Organized • +40% Participation Surge"
  },
  {
    id: "education",
    role: "Bachelor of Engineering — CSE (AI & ML)",
    organization: "Maharaja Institute of Technology Mysore",
    location: "Mysore, India",
    period: "2023 – 2027",
    type: "education",
    badge: "Top Tier Academics",
    highlights: [
      "Maintaining an exceptional 9.2 CGPA with strong academic standing in Artificial Intelligence and Machine Learning.",
      "Coursework: Deep Learning, Design & Analysis of Algorithms, Natural Language Processing, Operating Systems, Database Management Systems, Computer Networks.",
      "Active participant in collegiate hackathons, collegiate AI research initiatives, and open-source software clubs."
    ],
    metrics: "9.2 CGPA • CSE (AI & ML)"
  }
];

export const achievements: Achievement[] = [
  {
    id: "devhack-2025",
    title: "1st Place Winner — DevHack 2025 Hackathon",
    issuer: "Malnad College of Engineering, Hassan",
    date: "2025",
    type: "Hackathon",
    icon: "Trophy",
    description: "Clinched 1st place in a competitive 36-hour hackathon by developing an innovative AI-driven software architecture, judged on technical feasibility, model efficiency, and pitch presentation.",
    badgeText: "Hackathon Champion",
    accentColor: "from-amber-400 to-yellow-500"
  },
  {
    id: "discovery-day-2026",
    title: "Winner — Discovery Day 2026 Ideathon",
    issuer: "Maharaja Institute of Technology Mysore",
    date: "2026",
    type: "Award",
    icon: "Award",
    description: "Awarded top honours for pitching an AI-based system innovation combining hardware telemetry and autonomous intelligence for practical real-world problem solving.",
    badgeText: "1st Place Ideathon",
    accentColor: "from-indigo-500 to-purple-600"
  },
  {
    id: "sparkverse-2026",
    title: "Runner-Up — SparkVerse 2026 Ideathon",
    issuer: "Maharaja Institute of Technology Mysore",
    date: "2026",
    type: "Award",
    icon: "Medal",
    description: "Secured runner-up position among top engineering teams presenting high-impact machine learning architectures for sustainable tech initiatives.",
    badgeText: "Ideathon Runner-Up",
    accentColor: "from-cyan-400 to-blue-500"
  },
  {
    id: "open-source",
    title: "Open-Source Contributor & Community Organizer",
    issuer: "Social Winter of Code (SWOC 2024) & OSCI 2025",
    date: "2024 – 2025",
    type: "Community",
    icon: "GitPullRequest",
    description: "Contributed code to open-source machine learning and developer tool repositories; mentored junior developers in Git workflows and pull request lifecycles.",
    badgeText: "Open Source",
    accentColor: "from-emerald-400 to-teal-500"
  }
];

export const certifications: Achievement[] = [
  {
    id: "ibm-sql",
    title: "IBM SQL for Data Science",
    issuer: "IBM",
    date: "Certified",
    type: "Certification",
    icon: "ShieldCheck",
    description: "Advanced relational database management, multi-table joins, subqueries, and analytical data aggregation using enterprise SQL.",
    badgeText: "IBM Certified",
    accentColor: "from-blue-500 to-indigo-600"
  },
  {
    id: "duke-genai",
    title: "Duke Generative AI Specialization",
    issuer: "Duke University",
    date: "Certified",
    type: "Certification",
    icon: "Sparkles",
    description: "Foundational and advanced principles of Generative AI, prompt engineering, attention mechanisms, and LLM application deployment.",
    badgeText: "Duke University",
    accentColor: "from-purple-500 to-pink-500"
  },
  {
    id: "google-security",
    title: "Google Network Security",
    issuer: "Google",
    date: "Certified",
    type: "Certification",
    icon: "Lock",
    description: "Network protocols, intrusion defense, cryptographic practices, and vulnerability mitigation across modern cloud architectures.",
    badgeText: "Google Certified",
    accentColor: "from-green-500 to-emerald-600"
  },
  {
    id: "ms-azure",
    title: "Microsoft Azure Fundamentals (AZ-900)",
    issuer: "Microsoft",
    date: "Certified",
    type: "Certification",
    icon: "Cloud",
    description: "Azure cloud architecture, governance, security compliance, compute scalability, and serverless solution design.",
    badgeText: "Microsoft Certified",
    accentColor: "from-cyan-500 to-blue-600"
  }
];
