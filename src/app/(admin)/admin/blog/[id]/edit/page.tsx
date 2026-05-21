"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Card from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";
import RichTextEditor from "@/components/shared/RichTextEditor";

const CATEGORY_OPTIONS = [
  { value: "Fashion Tips", label: "Fashion Tips" },
  { value: "Behind the Scenes", label: "Behind the Scenes" },
  { value: "Cultural Fashion", label: "Cultural Fashion" },
  { value: "Style Guide", label: "Style Guide" },
  { value: "News", label: "News" },
];

interface BlogFormData {
  title: string;
  excerpt: string;
  body_html: string;
  category: string;
  featured_image_url: string;
  author: string;
  is_published: boolean;
}

const emptyForm: BlogFormData = {
  title: "",
  excerpt: "",
  body_html: "",
  category: "Fashion Tips",
  featured_image_url: "",
  author: "Hanney-V",
  is_published: false,
};

export default function AdminBlogEditPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;
  const isNew = postId === "new";

  const [formData, setFormData] = useState<BlogFormData>(emptyForm);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const { addToast } = useToast();

  const fetchPost = useCallback(async () => {
    if (isNew) return;
    try {
      const res = await fetch(`/api/blog/${postId}`);
      const data = await res.json();
      if (res.ok && data.post) {
        setFormData({
          title: data.post.title,
          excerpt: data.post.excerpt || "",
          body_html: data.post.body_html,
          category: data.post.category,
          featured_image_url: data.post.featured_image_url,
          author: data.post.author,
          is_published: data.post.is_published,
        });
      } else {
        addToast("Failed to load blog post", "error");
        router.push("/admin/blog");
      }
    } catch {
      addToast("Failed to load blog post", "error");
      router.push("/admin/blog");
    } finally {
      setLoading(false);
    }
  }, [isNew, postId, addToast, router]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleSave = async (publish?: boolean) => {
    if (!formData.title || !formData.body_html || !formData.featured_image_url) {
      addToast("Please fill in title, content, and featured image", "warning");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...formData,
        is_published: publish !== undefined ? publish : formData.is_published,
        published_at:
          (publish !== undefined ? publish : formData.is_published)
            ? new Date().toISOString()
            : undefined,
      };

      const url = isNew ? "/api/blog" : `/api/blog/${postId}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        addToast(isNew ? "Post created" : "Post saved", "success");
        router.push("/admin/blog");
      } else {
        const err = await res.json();
        addToast(err.error || "Failed to save post", "error");
      }
    } catch {
      addToast("Failed to save post", "error");
    } finally {
      setSaving(false);
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
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-neutral-900">
            {isNew ? "New Blog Post" : "Edit Blog Post"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/admin/blog")}
          >
            Cancel
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleSave(false)}
            isLoading={saving}
          >
            Save Draft
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleSave(true)}
            isLoading={saving}
          >
            Publish
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <Input
          label="Title"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Enter post title"
          required
        />

        {/* Meta row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select
            label="Category"
            options={CATEGORY_OPTIONS}
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, category: e.target.value }))
            }
          />
          <Input
            label="Author"
            value={formData.author}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, author: e.target.value }))
            }
            placeholder="Author name"
          />
          <Input
            label="Featured Image URL"
            value={formData.featured_image_url}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                featured_image_url: e.target.value,
              }))
            }
            placeholder="https://..."
            required
          />
        </div>

        {/* Excerpt */}
        <Input
          label="Excerpt (optional)"
          value={formData.excerpt}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
          }
          placeholder="Brief summary of the post (max 200 characters)"
          helperText={`${formData.excerpt.length}/200 characters`}
        />

        {/* Rich Text Editor */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            Content
          </label>
          <RichTextEditor
            content={formData.body_html}
            onChange={(html) =>
              setFormData((prev) => ({ ...prev, body_html: html }))
            }
            placeholder="Write your blog post content here..."
          />
        </div>
      </div>
    </div>
  );
}
