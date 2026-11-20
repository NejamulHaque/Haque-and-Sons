import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Blog & Engineering Notes | Haque Studio",
  description: "Updates, insights, and technical tutorials from Haque Studio.",
  alternates: { canonical: "https://haquestudio.me/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-24 px-6 selection:bg-white selection:text-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20 pt-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-neutral-400 mb-6">
            <span>Engineering Notes &amp; Insights</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Insights &amp; Dispatches
          </h1>
          <p className="text-base md:text-lg text-neutral-400 max-w-xl mx-auto font-normal">
            Articles, architecture patterns, and tutorials from the Haque Studio engineering team.
          </p>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block p-8 rounded-3xl bg-[#0c0c0e] border border-white/[0.08] hover:border-white/20 transition-all duration-300"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-mono text-neutral-300 bg-white/[0.04] rounded-full border border-white/[0.08]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-2 group-hover:text-neutral-200 transition-colors">
                {post.title}
              </h2>
              <p className="text-neutral-400 text-sm mb-6 leading-relaxed font-normal">{post.excerpt}</p>
              <div className="flex items-center gap-6 text-xs text-neutral-500 font-mono">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} /> {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} /> {post.readTime}
                </span>
                <span className="ml-auto flex items-center gap-1 text-white font-medium group-hover:translate-x-1 transition-transform">
                  Read Article <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
