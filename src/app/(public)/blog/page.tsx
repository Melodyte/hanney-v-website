import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/types";
import BlogListing from "./BlogListing";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Fashion tips, behind-the-scenes content, and cultural articles from Hanney-V luxury fashion brand.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  const blogPosts = (posts as BlogPost[] | null) || [];

  // Extract unique categories
  const categories = Array.from(new Set(blogPosts.map((p) => p.category))).filter(Boolean);

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="block w-8 h-px bg-gold-400" aria-hidden="true" />
            <span className="block w-2 h-2 rotate-45 bg-gold-400" aria-hidden="true" />
            <span className="block w-8 h-px bg-gold-400" aria-hidden="true" />
          </div>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-neutral-950 mb-4">
            Our Blog
          </h1>
          <div className="w-16 h-0.5 bg-gold-gradient mx-auto mb-4" />
          <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
            Fashion tips, cultural insights, and behind-the-scenes stories
          </p>
        </div>

        <BlogListing posts={blogPosts} categories={categories} />
      </div>
    </div>
  );
}
