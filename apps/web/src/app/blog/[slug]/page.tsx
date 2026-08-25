import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, getAllPosts } from "@/lib/blog";
import { Calendar, Clock, ArrowLeft, ChevronRight } from "lucide-react";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: `${post.title} | Haque & Sons Blog`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const paragraphs = post.content.split("\n\n");

  return (
    <main className="min-h-screen bg-black pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors mb-10"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium text-cyan-400 bg-cyan-500/10 rounded-full border border-cyan-500/20"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-6 text-sm text-gray-500 mb-12 pb-8 border-b border-white/[0.06]">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} /> {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} /> {post.readTime}
          </span>
          <span className="text-gray-400">by {post.author}</span>
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          {paragraphs.map((para, i) => {
            if (para.startsWith("## ")) {
              return (
                <h2 key={i} className="text-2xl font-bold text-white mt-10 mb-4">
                  {para.replace("## ", "")}
                </h2>
              );
            }
            if (para.startsWith("- ")) {
              return (
                <ul key={i} className="list-disc list-inside space-y-2 text-gray-300 my-4">
                  {para.split("\n").map((line, j) => (
                    <li key={j}>
                      {line
                        .replace(/^- \*\*(.+?)\*\*/, "$1")
                        .replace(/\*\*/g, "")
                        .replace(/^- /, "")}
                    </li>
                  ))}
                </ul>
              );
            }
            if (para.startsWith("|")) {
              return null; // Skip markdown tables for now
            }
            if (para.match(/^\d+\./)) {
              return (
                <ol key={i} className="list-decimal list-inside space-y-2 text-gray-300 my-4">
                  {para.split("\n").map((line, j) => (
                    <li key={j}>{line.replace(/^\d+\.\s/, "").replace(/\*\*/g, "")}</li>
                  ))}
                </ol>
              );
            }
            return (
              <p key={i} className="text-gray-300 leading-relaxed mb-4">
                {para.replace(/\*\*(.+?)\*\*/g, "$1")}
              </p>
            );
          })}
        </article>

        <div className="mt-16 pt-8 border-t border-white/[0.06]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.04] border border-white/[0.08] rounded-full text-white hover:bg-white/[0.08] transition-all"
          >
            <ChevronRight size={16} className="rotate-180" /> All Posts
          </Link>
        </div>
      </div>
    </main>
  );
}
