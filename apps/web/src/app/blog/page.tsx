import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Blog | Haque & Sons",
  description: "Updates, insights, and tutorials from Haque & Sons.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-black pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">
            Blog
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-3 mb-6">
            Latest{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Updates
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Insights, tutorials, and product updates from our team.
          </p>
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 transition-all duration-500"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium text-cyan-400 bg-cyan-500/10 rounded-full border border-cyan-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-400 mb-5 leading-relaxed">{post.excerpt}</p>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} /> {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} /> {post.readTime}
                </span>
                <span className="ml-auto flex items-center gap-1 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Read More <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
