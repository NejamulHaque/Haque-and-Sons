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
