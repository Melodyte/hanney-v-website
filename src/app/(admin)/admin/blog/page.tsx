"use client";

import { useState, useEffect, useCallback } from "react";

// Prevent static generation for admin pages
export const dynamic = 'force-dynamic';
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import Badge from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import type { BlogPost } from "@/lib/types";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);
  const { addToast } = useToast();
  const router = useRouter();

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/blog?all=true");
      const data = await res.json();
      if (res.ok) {
        setPosts(data.posts || []);
      } else {
        addToast("Failed to load blog posts", "error");
      }
    } catch {
      addToast("Failed to load blog posts", "error");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/blog/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
        addToast("Blog post deleted", "success");
      } else {
        addToast("Failed to delete blog post", "error");
      }
    } catch {
      addToast("Failed to delete blog post", "error");
    } finally {
      setDeleteTarget(null);
    }
  };

  const togglePublish = async (post: BlogPost) => {
    try {
      const res = await fetch(`/api/blog/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...post,
          is_published: !post.is_published,
          published_at: !post.is_published ? new Date().toISOString() : null,
        }),
      });
      if (res.ok) {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === post.id
              ? {
                  ...p,
                  is_published: !p.is_published,
                  published_at: !p.is_published
                    ? new Date().toISOString()
                    : null,
                }
              : p
          )
        );
        addToast(
          post.is_published ? "Post unpublished" : "Post published",
          "success"
        );
      } else {
        addToast("Failed to update post", "error");
      }
    } catch {
      addToast("Failed to update post", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin h-8 w-8 border-4 border-gold/30 border-t-gold rounded-full" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-neutral-900">
            Blog Posts
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Manage your blog content ({posts.length} posts)
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => router.push("/admin/blog/new/edit")}
        >
          New Post
        </Button>
      </div>

      {/* Posts List */}
      {posts.length === 0 ? (
        <Card padding="lg">
          <p className="text-center text-neutral-500">
            No blog posts yet. Create your first post to get started.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} variant="bordered" padding="none">
              <div className="flex flex-col sm:flex-row">
                {/* Thumbnail */}
                {post.featured_image_url && (
                  <div className="relative w-full sm:w-48 h-32 sm:h-auto shrink-0">
                    <Image
                      src={post.featured_image_url}
                      alt={post.title}
                      fill
                      className="object-cover sm:rounded-l-lg"
                      sizes="(max-width: 640px) 100vw, 192px"
                    />
                  </div>
                )}
                {/* Content */}
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-neutral-900">
                        {post.title}
                      </h3>
                      <p className="text-sm text-neutral-500 mt-1">
                        {post.category} · {post.author}
                        {post.published_at && (
                          <> · {new Date(post.published_at).toLocaleDateString()}</>
                        )}
                      </p>
                    </div>
                    <Badge variant={post.is_published ? "success" : "default"}>
                      {post.is_published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  {post.excerpt && (
                    <p className="text-sm text-neutral-600 mt-2 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-neutral-100">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/admin/blog/${post.id}/edit`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePublish(post)}
                    >
                      {post.is_published ? "Unpublish" : "Publish"}
                    </Button>
                    <div className="flex-1" />
                    <button
                      onClick={() => setDeleteTarget(post)}
                      className="p-1.5 text-neutral-400 hover:text-red-600 rounded transition-colors"
                      aria-label="Delete post"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Blog Post"
        size="sm"
      >
        <p className="text-neutral-600 mb-6">
          Are you sure you want to delete &ldquo;{deleteTarget?.title}&rdquo;? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" size="sm" onClick={() => setDeleteTarget(null)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleDelete}
            className="!bg-red-600 !text-white hover:!bg-red-700"
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
