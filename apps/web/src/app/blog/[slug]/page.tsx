import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, getAllPosts } from "@/lib/blog";
import { Calendar, Clock, ArrowLeft, ChevronRight, User } from "lucide-react";
import React from "react";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Haque & Sons Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

function renderFormattedText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\)|`.*?`)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 rounded bg-white/10 text-cyan-300 font-mono text-xs"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("[") && part.includes("](")) {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        return (
          <a
            key={index}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 font-medium"
          >
            {match[1]}
          </a>
        );
      }
    }
    return part;
  });
}

function parseMarkdownBlock(block: string, key: number) {
  const trimmed = block.trim();

  // H2 Header
  if (trimmed.startsWith("## ")) {
    return (
      <h2
        key={key}
        className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-5 pb-3 border-b border-white/10 tracking-tight"
      >
        {trimmed.replace("## ", "")}
      </h2>
    );
  }

  // H3 Header
  if (trimmed.startsWith("### ")) {
    return (
      <h3
        key={key}
        className="text-xl sm:text-2xl font-bold text-cyan-300 mt-8 mb-3 tracking-tight"
      >
        {trimmed.replace("### ", "")}
      </h3>
    );
  }

  // Table
  if (trimmed.startsWith("|") && trimmed.includes("\n|")) {
    const lines = trimmed.split("\n").filter((l) => l.trim().startsWith("|"));
    if (lines.length >= 2) {
      const headerRow = lines[0]
        .split("|")
        .filter((_, i, arr) => i > 0 && i < arr.length - 1)
        .map((cell) => cell.trim());
      
      const bodyRows = lines
        .slice(2)
        .map((line) =>
          line
            .split("|")
            .filter((_, i, arr) => i > 0 && i < arr.length - 1)
            .map((cell) => cell.trim())
        );

      return (
        <div key={key} className="my-8 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.02]">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.06] text-gray-200 uppercase text-xs">
              <tr>
                {headerRow.map((h, i) => (
                  <th key={i} className="px-5 py-3.5 font-semibold text-cyan-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {bodyRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-5 py-3 font-mono text-xs">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }

  // Bullet List
  if (trimmed.startsWith("- ")) {
    const items = trimmed.split("\n").filter((line) => line.trim().startsWith("- "));
    return (
      <ul key={key} className="my-6 space-y-3 pl-4">
        {items.map((item, i) => (
          <li key={i} className="text-gray-300 flex items-start gap-3 leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
            <span>{renderFormattedText(item.replace(/^- /, ""))}</span>
          </li>
        ))}
      </ul>
    );
  }

  // Numbered List
  if (/^\d+\./.test(trimmed)) {
    const items = trimmed.split("\n").filter((line) => /^\d+\./.test(line.trim()));
    return (
      <ol key={key} className="my-6 space-y-3 pl-4">
        {items.map((item, i) => (
          <li key={i} className="text-gray-300 flex items-start gap-3 leading-relaxed">
            <span className="font-mono text-xs font-bold text-cyan-400 mt-0.5 shrink-0">
              {String(i + 1).padStart(2, "0")}.
            </span>
            <span>{renderFormattedText(item.replace(/^\d+\.\s*/, ""))}</span>
          </li>
        ))}
      </ol>
    );
  }

  // Paragraph
  return (
    <p key={key} className="text-gray-300 leading-relaxed text-base sm:text-lg mb-6">
      {renderFormattedText(trimmed)}
    </p>
  );
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const blocks = post.content.split("\n\n");

  return (
    <main className="min-h-screen bg-black pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors mb-10 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Articles</span>
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 rounded-full border border-cyan-500/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
          {post.title}
        </h1>

        {/* Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-400 mb-12 pb-8 border-b border-white/10">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <User size={15} className="text-cyan-400" />
              <span className="text-white font-medium">{post.author}</span>
            </span>
            <span className="flex items-center gap-1.5 text-gray-500">
              <Calendar size={14} /> {post.date}
            </span>
            <span className="flex items-center gap-1.5 text-gray-500">
              <Clock size={14} /> {post.readTime}
            </span>
          </div>

          <span className="text-xs px-2.5 py-1 rounded bg-white/5 border border-white/10 text-gray-400">
            Haque & Sons Studio
          </span>
        </div>

        {/* Article Body */}
        <article className="text-gray-300">
          {blocks.map((block, index) => parseMarkdownBlock(block, index))}
        </article>

        {/* Post Footer */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-full text-white text-sm font-medium transition-all"
          >
            <ChevronRight size={16} className="rotate-180" /> All Articles
          </Link>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-black font-semibold rounded-full hover:bg-cyan-400 transition-all text-sm shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          >
            <span>Start a Project with Us</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
