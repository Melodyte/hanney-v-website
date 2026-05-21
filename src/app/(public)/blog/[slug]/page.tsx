import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import RichTextRenderer from "@/components/shared/RichTextRenderer";
import type { BlogPost } from "@/lib/types";

export const revalidate = 60;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt || `Read ${post.title} on the Hanney-V blog.`,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!post) {
    notFound();
  }

  const blogPost = post as BlogPost;

  return (
    <article className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-gold-600 transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-medium text-gold-600 uppercase tracking-wider">
              {blogPost.category}
            </span>
            {blogPost.published_at && (
              <span className="text-sm text-neutral-400">
                {new Date(blogPost.published_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-neutral-950 mb-4 leading-tight">
            {blogPost.title}
          </h1>
          {blogPost.author && (
            <p className="text-neutral-600">
              By <span className="font-medium text-neutral-900">{blogPost.author}</span>
            </p>
          )}
        </header>

        {/* Featured Image */}
        {blogPost.featured_image_url && (
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-10 bg-neutral-100">
            <Image
              src={blogPost.featured_image_url}
              alt={blogPost.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>
        )}

        {/* Body Content */}
        <RichTextRenderer content={blogPost.body_html} />
      </div>
    </article>
  );
}
