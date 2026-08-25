export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "launching-haque-and-sons-redesign",
    title: "Launching Our New Digital Experience",
    excerpt:
      "We've completely rebuilt our website with Next.js 16, 3D graphics, and enterprise-grade security. Here's what went into it.",
    content: `We're thrilled to unveil the all-new Haque & Sons website — a complete rebuild powered by Next.js 16, React Three Fiber, and a DevSecOps-first architecture.

## Why We Rebuilt

Our previous site served us well, but as our services grew, so did our need for a platform that reflects the quality of work we deliver. The new site features:

- **3D Interactive Hero** — Built with React Three Fiber, post-processing effects, and particle systems
- **Smooth Scrolling** — Lenis-powered buttery navigation experience  
- **PWA Support** — Installable, offline-capable progressive web app
- **Enterprise Security** — Semgrep SAST, OSV Scanner, and supply-chain policies in CI/CD

## Tech Stack Highlights

Every technology was chosen deliberately:

- **Next.js 16 + Turbopack** for blazing-fast builds
- **Turborepo monorepo** for scalable multi-package architecture
- **Better Auth** for zero-trust authentication
- **Neon PostgreSQL** for serverless database
- **Cloudflare WAF** for DDoS and bot protection

## What's Next

This is just the beginning. Upcoming features include:

- Client dashboard with project tracking
- AI-powered chatbot integration
- Automated invoice generation
- Multi-language support

Stay tuned for more updates!`,
    author: "Nejamul Haque",
    date: "2026-08-25",
    tags: ["Launch", "Next.js", "DevSecOps"],
    readTime: "3 min read",
  },
  {
    slug: "why-devsecops-matters-for-startups",
    title: "Why DevSecOps Matters for Startups",
    excerpt:
      "Security isn't a luxury for startups — it's a competitive advantage. Here's how we integrate security from day one.",
    content: `Many startups treat security as an afterthought. By the time they realize they need it, technical debt has accumulated and retrofitting becomes expensive.

## Shift Left Security

At Haque & Sons, we practice "shift left" security — integrating security checks into every stage of development:

1. **Pre-commit hooks** catch secrets before they reach version control
2. **CI pipeline** runs Semgrep SAST on every pull request
3. **Dependency audits** via OSV Scanner flag vulnerable packages automatically
4. **Supply-chain policies** enforce minimum release age for all dependencies

## Free Tools That Punch Above Their Weight

You don't need enterprise budgets for enterprise security:

- **Semgrep** — Open-source SAST with OWASP Top 10 rules
- **Gitleaks** — Secret scanning in GitHub Actions
- **npm audit** — Built-in dependency vulnerability checking
- **Cloudflare Free Tier** — WAF, DDoS protection, and SSL

## The ROI of Early Security

Investing in security early saves 10-100x compared to fixing breaches later. More importantly, it builds trust with clients who increasingly demand security documentation and compliance evidence.

Security isn't a cost center — it's your strongest differentiator.`,
    author: "Nejamul Haque",
    date: "2026-08-20",
    tags: ["Security", "DevSecOps", "Startups"],
    readTime: "4 min read",
  },
  {
    slug: "building-ai-powered-tools-with-open-source",
    title: "Building AI-Powered Tools with Open Source",
    excerpt:
      "How we built Irus AI, Digital Lens, and Builder AI using only open-source tools and free-tier services.",
    content: `AI tools don't require massive budgets. Here's how we built three production AI products using entirely open-source stacks and free-tier cloud services.

## Irus AI — Personal Command Center

Built with LangChain, vector embeddings, and OpenAI API. Features live search, document intelligence, and long-term memory — all running on Render's free tier.

## Digital Lens — News Intelligence

Real-time news aggregation with sentiment analysis powered by Hugging Face transformers. Deployed on Vercel with edge functions for sub-100ms responses.

## Builder AI — Portfolio Generator

AI-powered site generator that takes user inputs and produces a live, responsive portfolio in seconds. Uses ONNX Runtime for client-side inference.

## The Free-Tier Stack

| Service | Tool | Cost |
|---------|------|------|
| Hosting | Vercel / Render | $0 |
| Database | Neon PostgreSQL | $0 |
| AI Models | Hugging Face + OpenAI | $0-$5/mo |
| CDN/WAF | Cloudflare | $0 |
| Monitoring | Grafana Cloud | $0 |

## Key Takeaway

Open-source AI has reached production quality. The bottleneck is no longer technology — it's imagination and execution.`,
    author: "Nejamul Haque",
    date: "2026-08-15",
    tags: ["AI", "Open Source", "Products"],
    readTime: "5 min read",
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Add these new posts to the blogPosts array
const newPosts: BlogPost[] = [
  {
    slug: "building-irus-ai-command-center",
    title: "Building Irus AI: A Personal Command Center",
    excerpt: "How we built an AI-powered personal command center with live search, document intelligence, and long-term memory using LangChain and vector embeddings.",
    content: `Irus AI started as a simple idea: what if you had a personal AI that knew everything about your work, could search across all your documents, and remember conversations over time?

## The Architecture

We built Irus AI using a modern stack:
- **Frontend**: Next.js 16 with App Router
- **AI Engine**: LangChain for orchestration
- **Vector Database**: Pinecone for semantic search
- **LLM**: OpenAI GPT-4 for reasoning
- **Memory**: Redis for conversation history

## Key Features

### Live Search
Unlike traditional keyword search, Irus AI uses vector embeddings to understand the meaning behind your queries. Ask "what did I decide about the database last week?" and it finds the relevant conversation even if you didn't use those exact words.

### Document Intelligence
Upload PDFs, docs, or paste text — Irus AI chunks, embeds, and indexes everything. It can answer questions about your documents with citations.

### Long-Term Memory
Most AI chatbots forget everything after the conversation ends. Irus AI maintains a persistent memory graph, connecting related concepts across conversations.

## Lessons Learned

1. **Chunking strategy matters** — We experimented with fixed-size, semantic, and recursive chunking. Recursive won for most use cases.
2. **Embedding model choice** — OpenAI's text-embedding-3-small gave us the best price/performance ratio.
3. **Prompt engineering** — The system prompt is 80% of the battle. We iterated dozens of times.

## What's Next

We're adding multi-modal support (images, audio), agent capabilities (autonomous task execution), and a plugin system for custom integrations.

Try Irus AI at [irus-ai.onrender.com](https://irus-ai.onrender.com/)`,
    author: "Nejamul Haque",
    date: "2026-08-20",
    tags: ["AI", "LangChain", "Product"],
    readTime: "6 min read",
  },
  {
    slug: "collabsheets-real-time-collaboration",
    title: "CollabSheets: Real-Time Collaboration at Scale",
    excerpt: "Deep dive into building a real-time collaborative code editor supporting 60+ languages with AI assistance and WebSocket architecture.",
    content: `CollabSheets is our answer to "what if Google Docs met VS Code met ChatGPT?"

## The Challenge

Real-time collaboration is hard. Add code execution in 60+ languages, AI assistance, and you have a distributed systems nightmare.

## Architecture Decisions

### CRDTs vs OT
We chose Operational Transformation (OT) over CRDTs for simpler conflict resolution in text editing. Y.js would have been easier but added bundle size we couldn't afford.

### WebSocket Infrastructure
Using Socket.io with Redis adapter for horizontal scaling. Each room (document) is sharded across Redis pub/sub channels.

### Code Execution Sandbox
We use isolated Docker containers with strict resource limits. Each execution gets 512MB RAM, 30s timeout, and no network access.

### AI Integration
The AI assistant runs in a separate service, communicating via gRPC. It has context about the current document, cursor position, and recent edits.

## Performance Metrics

- **Latency**: <50ms for character sync
- **Concurrent users**: Tested up to 100 per document
- **Uptime**: 99.9% over 6 months

## Try It

Visit [collabsheets.onrender.com](https://collabsheets.onrender.com/) to collaborate in real-time.`,
    author: "Nejamul Haque",
    date: "2026-08-15",
    tags: ["Real-time", "WebSockets", "Engineering"],
    readTime: "7 min read",
  },
  {
    slug: "nestfy-personal-finance-ai",
    title: "Nestfy: AI-Powered Personal Finance",
    excerpt: "How we built an elegant finance tracker with receipt OCR, smart budgets, and AI spending insights using Next.js and machine learning.",
    content: `Personal finance apps are everywhere. But most are ugly, complicated, or require manual data entry. Nestfy is different.

## The Vision

A finance app that:
1. Looks beautiful (dark mode, smooth animations)
2. Requires minimal manual input (OCR receipts, bank sync)
3. Actually helps you save money (AI insights, smart budgets)

## Tech Stack

- **Frontend**: Next.js 16, Tailwind CSS, Framer Motion
- **Backend**: Node.js, PostgreSQL, Drizzle ORM
- **AI**: TensorFlow.js for receipt OCR, custom ML for categorization
- **Auth**: Better Auth with 2FA

## Key Features

### Receipt OCR
Snap a photo of any receipt. Our ML model extracts merchant, date, amount, and line items with 94% accuracy.

### Smart Budgets
Instead of static budgets, Nestfy learns your spending patterns and suggests dynamic budgets. "You typically spend $200 on groceries in the first week, but $50 in the fourth."

### AI Insights
Weekly AI-generated reports: "Your dining out increased 40% this month. Here are 3 cheaper alternatives near you."

## Privacy First

All financial data is encrypted at rest and in transit. We never sell your data. OCR processing happens on-device when possible.

## Try Nestfy

Visit [nestfy-beta.vercel.app](https://nestfy-beta.vercel.app/) to track your finances beautifully.`,
    author: "Nejamul Haque",
    date: "2026-08-10",
    tags: ["FinTech", "AI", "Product"],
    readTime: "5 min read",
  },
  {
    slug: "digital-lens-news-intelligence",
    title: "Digital Lens: AI News Intelligence Platform",
    excerpt: "Building a real-time news aggregation platform with sentiment analysis, automated summaries, and personalized feeds using NLP and edge computing.",
    content: `In a world of information overload, Digital Lens cuts through the noise.

## The Problem

News is everywhere. But finding relevant, trustworthy, summarized news tailored to your interests is still manual work.

## How It Works

### Real-Time Aggregation
We monitor 500+ news sources via RSS, APIs, and web scraping. Edge functions on Vercel process articles in <100ms.

### Sentiment Analysis
Using Hugging Face transformers, we analyze sentiment (positive/negative/neutral) and detect bias in real-time.

### Automated Summaries
Each article gets a 3-sentence TL;DR generated by our fine-tuned summarization model.

### Personalized Feeds
The more you read, the smarter your feed gets. Collaborative filtering + content-based recommendations.

## Architecture

- **Edge**: Vercel Edge Functions for sub-100ms response
- **AI**: Hugging Face Inference API
- **Database**: Neon PostgreSQL (serverless)
- **Cache**: Upstash Redis

## Try Digital Lens

Visit [digital-lens.vercel.app](https://digital-lens.vercel.app/) for your personalized news feed.`,
    author: "Nejamul Haque",
    date: "2026-08-05",
    tags: ["NLP", "Edge Computing", "Product"],
    readTime: "5 min read",
  },
  {
    slug: "proresume-ats-friendly-resumes",
    title: "ProResume: Building ATS-Friendly Resumes with AI",
    excerpt: "How we built an AI-powered resume builder that optimizes for Applicant Tracking Systems with smart formatting and keyword suggestions.",
    content: `75% of resumes are rejected by ATS before a human ever sees them. ProResume fixes that.

## The ATS Problem

Applicant Tracking Systems parse resumes looking for keywords, proper formatting, and structure. Most resumes fail because:
- Wrong format (tables, columns, graphics)
- Missing keywords from job description
- Poor section ordering

## How ProResume Works

### Smart Parsing
Paste your existing resume or LinkedIn URL. We extract structured data (experience, education, skills).

### Job Description Matching
Paste a job description. Our AI identifies missing keywords and suggests where to add them naturally.

### ATS Optimization
We score your resume against common ATS parsers (Greenhouse, Lever, Workday) and suggest fixes.

### Beautiful Templates
Choose from 10+ professionally designed templates that are guaranteed ATS-compatible.

## Tech Stack

- **Frontend**: Next.js 16, React Hook Form, Zod validation
- **PDF Generation**: @react-pdf/renderer
- **AI**: OpenAI API for keyword extraction and suggestions
- **Hosting**: Vercel

## Results

Beta users reported 3x more interview callbacks after optimizing with ProResume.

## Try ProResume

Build your ATS-friendly resume at [proresume-six.vercel.app](https://proresume-six.vercel.app/)`,
    author: "Nejamul Haque",
    date: "2026-07-30",
    tags: ["Career", "AI", "Product"],
    readTime: "4 min read",
  },
];

// Merge with existing posts
blogPosts.push(...newPosts);
