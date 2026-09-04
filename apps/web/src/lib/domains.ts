export interface InternshipDomain {
  id: string;
  name: string;
  category: "Development" | "AI & Data" | "Mobile" | "DevOps & Security" | "Design";
  icon: string;
  tagline: string;
  description: string;
  techStack: string[];
  prerequisites: string[];
  capstoneProject: string;
  curriculum: {
    week: string;
    title: string;
    topics: string[];
  }[];
  popular?: boolean;
}

export const INTERNSHIP_DOMAINS: InternshipDomain[] = [
  {
    id: "full-stack-web",
    name: "Full-Stack Web Development",
    category: "Development",
    icon: "⚡",
    popular: true,
    tagline: "Build scalable full-stack applications with Next.js 16, PostgreSQL & TypeScript",
    description:
      "Master modern web engineering from database schema design with Drizzle ORM and Neon PostgreSQL to reactive frontends with Next.js 16 App Router, Tailwind CSS, and zero-trust Better Auth.",
    techStack: ["Next.js 16", "TypeScript", "Tailwind CSS", "Neon PostgreSQL", "Drizzle ORM", "Better Auth"],
    prerequisites: ["HTML, CSS, JavaScript basics", "Basic understanding of React"],
    capstoneProject: "Production SaaS Workspace with Real-time Collaboration, Auth & Database",
    curriculum: [
      { week: "Week 1", title: "Modern TypeScript & Next.js App Router Architecture", topics: ["Server Components", "Layouts & Routing", "API Routes"] },
      { week: "Week 2", title: "Database Modeling & ORM Integration", topics: ["Neon PostgreSQL", "Drizzle ORM", "Migrations & Relations"] },
      { week: "Week 3", title: "Authentication & State Management", topics: ["Better Auth", "Session Management", "CRUD Operations"] },
      { week: "Week 4", title: "Deployment, CI/CD & Performance Tuning", topics: ["Vercel Edge Deployment", "Lighthouse 95+ Tuning", "Custom Domains"] },
    ],
  },
  {
    id: "ai-generative-agents",
    name: "AI & Generative AI Engineering",
    category: "AI & Data",
    icon: "🧠",
    popular: true,
    tagline: "Engineer autonomous AI agents, RAG vector pipelines & multi-model LLM systems",
    description:
      "Dive deep into building autonomous agent workflows using LangChain, OpenAI / Claude APIs, Pinecone vector embeddings, and streaming chat completions.",
    techStack: ["LangChain", "OpenAI / Anthropic APIs", "Pinecone Vector DB", "Python / FastAPI", "Next.js"],
    prerequisites: ["Python or JavaScript proficiency", "Basic understanding of APIs"],
    capstoneProject: "Autonomous Knowledge Retrieval & Multi-Agent Task Assistant (like Irus AI)",
    curriculum: [
      { week: "Week 1", title: "LLM Fundamentals & Prompt Engineering", topics: ["Structured Outputs", "Function Calling", "Token Optimization"] },
      { week: "Week 2", title: "RAG & Vector Embeddings Architecture", topics: ["Pinecone / Chroma", "Document Chunking", "Semantic Search"] },
      { week: "Week 3", title: "LangChain & Multi-Agent Orchestration", topics: ["Agent Chains", "Memory Stores", "Tool Use & Action Execution"] },
      { week: "Week 4", title: "Full-Stack Deployment & Evaluation", topics: ["FastAPI Backend", "Streaming Frontend UI", "Evaluation Metrics"] },
    ],
  },
  {
    id: "machine-learning",
    name: "Machine Learning & Deep Learning",
    category: "AI & Data",
    icon: "🔬",
    popular: true,
    tagline: "Train, evaluate & deploy neural networks and predictive ML models",
    description:
      "Explore supervised, unsupervised learning, computer vision, and NLP using PyTorch, TensorFlow, and Scikit-Learn with real-world datasets.",
    techStack: ["Python", "PyTorch", "TensorFlow", "Scikit-Learn", "Pandas", "Streamlit"],
    prerequisites: ["Python programming", "Linear algebra & statistics basics"],
    capstoneProject: "Computer Vision Receipt OCR & Predictive Financial Classifier",
    curriculum: [
      { week: "Week 1", title: "Data Wrangling & Exploratory Analysis", topics: ["Pandas & NumPy", "Feature Engineering", "Data Cleaning"] },
      { week: "Week 2", title: "Classical ML Algorithms", topics: ["Regression & Classification", "Random Forests", "Hyperparameter Tuning"] },
      { week: "Week 3", title: "Deep Learning & Neural Networks", topics: ["PyTorch Tensors", "CNNs & Image Processing", "Model Training"] },
      { week: "Week 4", title: "Model Inference & Web API Deployment", topics: ["ONNX Runtime", "FastAPI Endpoints", "Streamlit Dashboard"] },
    ],
  },
  {
    id: "data-analytics",
    name: "Data Analytics & Business Intelligence",
    category: "AI & Data",
    icon: "📊",
    popular: true,
    tagline: "Transform complex data into actionable executive insights with SQL & PowerBI",
    description:
      "Master end-to-end data analytics: write advanced SQL queries, clean raw datasets with Python/Pandas, and craft interactive dashboards with PowerBI / Tableau.",
    techStack: ["SQL (PostgreSQL)", "Python (Pandas, Seaborn)", "PowerBI", "Tableau", "Excel / Google Sheets"],
    prerequisites: ["Basic logic & spreadsheet familiarity"],
    capstoneProject: "Global Enterprise Revenue & User Retention Analytics BI Suite",
    curriculum: [
      { week: "Week 1", title: "Advanced SQL & Relational Querying", topics: ["Joins & Subqueries", "Window Functions", "Aggregations"] },
      { week: "Week 2", title: "Python for Data Analysis", topics: ["Pandas DataFrames", "Data Cleaning", "Matplotlib Visualizations"] },
      { week: "Week 3", title: "Interactive Business Intelligence", topics: ["PowerBI Dashboards", "DAX Formulas", "KPI Tracking"] },
      { week: "Week 4", title: "Storytelling & Executive Reporting", topics: ["Cohort Retention", "A/B Testing Analysis", "Final Capstone Presentation"] },
    ],
  },
  {
    id: "android-development",
    name: "Android Native Development",
    category: "Mobile",
    icon: "📱",
    popular: true,
    tagline: "Craft high-performance native Android apps using Kotlin & Jetpack Compose",
    description:
      "Learn modern Android architecture with Kotlin, Jetpack Compose declarative UI, Room database, Coroutines, and REST API integration with Retrofit.",
    techStack: ["Kotlin", "Jetpack Compose", "Android Studio", "Retrofit", "Room DB", "Coroutines"],
    prerequisites: ["Object-Oriented Programming (Java or Kotlin)"],
    capstoneProject: "Offline-First Native Android Productivity & Habit Tracking App",
    curriculum: [
      { week: "Week 1", title: "Kotlin Essentials & Jetpack Compose Basics", topics: ["Kotlin Syntax", "Composable Functions", "State & Recomposition"] },
      { week: "Week 2", title: "Navigation & UI Component Architecture", topics: ["Navigation Compose", "Scaffolds & TopBars", "Theming & Dark Mode"] },
      { week: "Week 3", title: "Networking & Local Persistence", topics: ["Retrofit API Client", "Coroutines & Flow", "Room SQLite Database"] },
      { week: "Week 4", title: "MVVM Architecture & APK Build Release", topics: ["ViewModel & StateFlow", "Dependency Injection (Hilt)", "Signed APK Generation"] },
    ],
  },
  {
    id: "java-backend",
    name: "Java Enterprise & Backend Development",
    category: "Development",
    icon: "☕",
    popular: true,
    tagline: "Build enterprise REST APIs and microservices with Java & Spring Boot",
    description:
      "Deep dive into enterprise software engineering with Core Java, Spring Boot 3, Spring Data JPA, Hibernate, JWT Security, and PostgreSQL.",
    techStack: ["Core Java 21", "Spring Boot 3", "Spring Security (JWT)", "PostgreSQL", "Hibernate", "Maven"],
    prerequisites: ["Core Java fundamentals", "Basic OOP principles"],
    capstoneProject: "Enterprise E-Commerce Microservice Backend with JWT & Payment Webhooks",
    curriculum: [
      { week: "Week 1", title: "Advanced Java & Spring Boot Setup", topics: ["Java 21 Features", "Spring Boot Starter", "Dependency Injection"] },
      { week: "Week 2", title: "RESTful Web Services & JPA", topics: ["Spring MVC Controllers", "Spring Data JPA", "PostgreSQL Queries"] },
      { week: "Week 3", title: "Security & Authentication", topics: ["Spring Security Filter Chain", "JWT Tokens", "Role-Based Access Control"] },
      { week: "Week 4", title: "Testing, Swagger Documentation & Docker", topics: ["JUnit 5 & Mockito", "Swagger OpenAPI", "Dockerizing Spring App"] },
    ],
  },
  {
    id: "mobile-app-crossplatform",
    name: "Mobile App Development (React Native / Flutter)",
    category: "Mobile",
    icon: "📲",
    tagline: "Develop cross-platform iOS & Android mobile apps with one codebase",
    description:
      "Build fluid, native-feel mobile applications using React Native / Expo, native device APIs, push notifications, and offline caching.",
    techStack: ["React Native", "Expo", "TypeScript", "Tailwind (NativeWind)", "AsyncStorage", "Firebase"],
    prerequisites: ["JavaScript & React fundamentals"],
    capstoneProject: "Cross-Platform Social Fitness & Workout Tracker App",
    curriculum: [
      { week: "Week 1", title: "React Native & Expo Ecosystem", topics: ["Core Components", "Flexbox Layouts", "Expo Router"] },
      { week: "Week 2", title: "Native Device APIs & Animations", topics: ["Camera & Geolocation", "Reanimated 3", "Gestures"] },
      { week: "Week 3", title: "Backend Sync & Authentication", topics: ["Firebase Auth / Supabase", "REST API Ingestion", "Offline Caching"] },
      { week: "Week 4", title: "App Optimization & Expo EAS Build", topics: ["Performance Profiling", "Push Notifications", "EAS Build Workflow"] },
    ],
  },
  {
    id: "cloud-devsecops",
    name: "Cloud, DevOps & DevSecOps Engineering",
    category: "DevOps & Security",
    icon: "☁️",
    tagline: "Automate CI/CD pipelines, container orchestration & zero-trust security",
    description:
      "Learn to containerize applications with Docker, build automated GitHub Actions workflows, implement security SAST scanning, and deploy to Kubernetes & Edge CDNs.",
    techStack: ["Docker", "Kubernetes", "GitHub Actions", "Vercel / AWS", "Linux / Bash", "Trivy / SonarQube"],
    prerequisites: ["Basic Linux command line knowledge", "Git fundamentals"],
    capstoneProject: "Zero-Downtime Automated CI/CD Pipeline with Security Scanning & Monitoring",
    curriculum: [
      { week: "Week 1", title: "Linux Systems & Docker Containerization", topics: ["Dockerfiles & Multi-stage Builds", "Docker Compose", "Volume Management"] },
      { week: "Week 2", title: "CI/CD with GitHub Actions", topics: ["Automated Testing Workflows", "Build Triggers", "Matrix Builds"] },
      { week: "Week 3", title: "DevSecOps & SAST Security Scanning", topics: ["Secret Detection (Gitleaks)", "Container Vulnerability Scanning", "SSL Hardening"] },
      { week: "Week 4", title: "Cloud Deployment & Telemetry", topics: ["Edge CDN Config", "Serverless Infrastructure", "Grafana / Prometheus Logging"] },
    ],
  },
  {
    id: "uiux-3d-design",
    name: "UI/UX & 3D Interactive Design",
    category: "Design",
    icon: "🎨",
    tagline: "Create high-converting cyber glassmorphism UIs & Three.js 3D web scenes",
    description:
      "Bridge design and engineering: craft stunning design systems in Figma and bring them to life on the web using Three.js, React Three Fiber, and Framer Motion.",
    techStack: ["Figma", "Three.js", "React Three Fiber", "Framer Motion", "Tailwind CSS", "GLSL Shaders"],
    prerequisites: ["Basic design sensibility & HTML/CSS familiarity"],
    capstoneProject: "Cyberpunk Interactive 3D Landing Page with Particle Effects & Custom Shaders",
    curriculum: [
      { week: "Week 1", title: "Modern UI/UX Principles & Figma Mastery", topics: ["Glassmorphism & Cyber Aesthetics", "Design Systems & Tokens", "Component Variants"] },
      { week: "Week 2", title: "Framer Motion & Micro-Interactions", topics: ["Scroll-Linked Animations", "Layout Animations", "Gesture Physics"] },
      { week: "Week 3", title: "Three.js & React Three Fiber", topics: ["3D Meshes & Geometry", "Lighting & Post-Processing Bloom", "Particle Systems"] },
      { week: "Week 4", title: "Interactive 3D Portfolio Capstone", topics: ["OrbitControls", "Performance Optimization", "Responsive 3D Canvas"] },
    ],
  },
  {
    id: "python-backend",
    name: "Python Backend & Automation Engineering",
    category: "Development",
    icon: "🐍",
    tagline: "Build high-throughput async APIs, web scrapers & automated bot workflows",
    description:
      "Master Python for modern backend development with FastAPI, Asyncio, SQLAlchemy, PostgreSQL, web scraping with Playwright, and scheduled background workers.",
    techStack: ["Python 3.12", "FastAPI", "Asyncio", "SQLAlchemy", "PostgreSQL", "Playwright"],
    prerequisites: ["Basic Python knowledge"],
    capstoneProject: "Automated Multi-Source Web Intelligence & News Aggregator API",
    curriculum: [
      { week: "Week 1", title: "Modern Python & Async Programming", topics: ["Type Hints & Pydantic", "Asyncio Coroutines", "Error Handling"] },
      { week: "Week 2", title: "High-Performance APIs with FastAPI", topics: ["Dependency Injection", "OpenAPI Docs", "JWT Authentication"] },
      { week: "Week 3", title: "Web Scraping & Browser Automation", topics: ["Playwright / BeautifulSoup", "Headless Browsers", "Anti-Bot Handling"] },
      { week: "Week 4", title: "Database Sync & Worker Deployment", topics: ["SQLAlchemy ORM", "Cron Automation", "Cloud Deployment"] },
    ],
  },
  {
    id: "cyber-security",
    name: "Cyber Security & Ethical Hacking",
    category: "DevOps & Security",
    icon: "🛡️",
    tagline: "Audit web applications, identify vulnerabilities & enforce zero-trust defense",
    description:
      "Understand ethical hacking methodology, OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF, IDOR), network packet analysis with Wireshark, and security penetration testing.",
    techStack: ["OWASP Top 10", "Burp Suite", "Nmap", "Wireshark", "Linux Security", "Penetration Testing"],
    prerequisites: ["Basic networking & web fundamentals"],
    capstoneProject: "Comprehensive Web Application Penetration Test Report & Security Audit",
    curriculum: [
      { week: "Week 1", title: "Networking & Security Fundamentals", topics: ["TCP/IP & DNS", "Packet Analysis with Wireshark", "Port Scanning with Nmap"] },
      { week: "Week 2", title: "OWASP Top 10 Web Vulnerabilities", topics: ["SQL Injection", "Cross-Site Scripting (XSS)", "CSRF & Session Hijacking"] },
      { week: "Week 3", title: "Hands-on Web Pentesting with Burp Suite", topics: ["Intercepting Proxies", "Fuzzing & Payload Injection", "Auth Bypass Tests"] },
      { week: "Week 4", title: "Remediation, Audit Reporting & Hardening", topics: ["Zero-Trust Defense", "Writing Professional Audit Reports", "Security Headers"] },
    ],
  },
];
