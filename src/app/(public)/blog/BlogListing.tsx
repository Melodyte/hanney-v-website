"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import CategoryFilter from "@/components/shared/CategoryFilter";
import Pagination from "@/components/shared/Pagination";
import type { BlogPost } from "@/lib/types";

interface BlogListingProps {
  posts: BlogPost[];
  categories: string[];
}

const POSTS_PER_PAGE = 9;

export default function BlogListing({ posts, categories }: BlogListingProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return posts;
    return posts.filter((post) => post.category === activeCategory);
  }, [posts, activeCategory]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-neutral-500 text-lg">
          No blog posts available yet. Check back soon for fashion tips and stories!
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="mb-10">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      )}

      {/* Posts Grid */}
      {paginatedPosts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-neutral-500 text-lg">
            No posts available in this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <article className="bg-white border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* Featured Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                  {post.featured_image_url ? (
                    <Image
                      src={post.featured_image_url}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gold-gradient opacity-20" />
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium text-gold-600 uppercase tracking-wider">
                      {post.category}
                    </span>
                    {post.published_at && (
                      <span className="text-xs text-neutral-400">
                        {new Date(post.published_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>
                  <h2 className="font-heading text-lg text-neutral-950 mb-2 line-clamp-2 group-hover:text-gold-600 transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-neutral-600 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </>
  );
}
