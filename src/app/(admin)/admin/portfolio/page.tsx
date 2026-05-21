"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import { useToast } from "@/components/ui/Toast";
import type { PortfolioItem } from "@/lib/types";

const CATEGORIES = ["Bespoke", "Bridal", "Traditional", "Event"] as const;

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<PortfolioItem | null>(null);
  const [filterCategory, setFilterCategory] = useState("All");
  const { addToast } = useToast();

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch("/api/portfolio");
      const data = await res.json();
      if (res.ok) {
        setItems(data.items || []);
      } else {
        addToast("Failed to load portfolio items", "error");
      }
    } catch {
      addToast("Failed to load portfolio items", "error");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload?bucket=portfolio-images", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const err = await uploadRes.json();
        addToast(err.error || "Upload failed", "error");
        return;
      }

      const { url } = await uploadRes.json();

      // Create portfolio item with default category
      const createRes = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_url: url,
          alt_text: file.name.replace(/\.[^/.]+$/, ""),
          category: "Bespoke",
        }),
      });

      if (createRes.ok) {
        addToast("Image uploaded successfully", "success");
        await fetchItems();
        triggerRevalidation();
      } else {
        addToast("Failed to save portfolio item", "error");
      }
    } catch {
      addToast("Upload failed. Please try again.", "error");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleCategoryChange = async (item: PortfolioItem, newCategory: string) => {
    try {
      const res = await fetch(`/api/portfolio/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: newCategory }),
      });

      if (res.ok) {
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id ? { ...i, category: newCategory as PortfolioItem["category"] } : i
          )
        );
        addToast("Category updated", "success");
        triggerRevalidation();
      } else {
        addToast("Failed to update category", "error");
      }
    } catch {
      addToast("Failed to update category", "error");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      const res = await fetch(`/api/portfolio/${deleteTarget.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
        addToast("Image deleted", "success");
        triggerRevalidation();
      } else {
        addToast("Failed to delete image", "error");
      }
    } catch {
      addToast("Failed to delete image", "error");
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleMoveUp = async (item: PortfolioItem, index: number) => {
    if (index === 0) return;
    const prevItem = filteredItems[index - 1];
    await swapSortOrder(item, prevItem);
  };

  const handleMoveDown = async (item: PortfolioItem, index: number) => {
    if (index === filteredItems.length - 1) return;
    const nextItem = filteredItems[index + 1];
    await swapSortOrder(item, nextItem);
  };

  const swapSortOrder = async (itemA: PortfolioItem, itemB: PortfolioItem) => {
    try {
      await Promise.all([
        fetch(`/api/portfolio/${itemA.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sort_order: itemB.sort_order }),
        }),
        fetch(`/api/portfolio/${itemB.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sort_order: itemA.sort_order }),
        }),
      ]);
      await fetchItems();
      triggerRevalidation();
    } catch {
      addToast("Failed to reorder items", "error");
    }
  };

  const triggerRevalidation = async () => {
    try {
      await fetch("/api/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paths: ["/portfolio", "/"],
          secret: process.env.NEXT_PUBLIC_REVALIDATION_SECRET || "",
        }),
      });
    } catch {
      // Revalidation failure is non-critical
    }
  };

  const filteredItems =
    filterCategory === "All"
      ? items
      : items.filter((i) => i.category === filterCategory);

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
            Portfolio
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Manage your portfolio images ({items.length} total)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label className="cursor-pointer">
            <Button variant="primary" size="sm" isLoading={uploading} disabled={uploading}>
              {uploading ? "Uploading..." : "Upload Image"}
            </Button>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["All", ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
              filterCategory === cat
                ? "bg-gold/10 border-gold text-gold-700 font-medium"
                : "border-neutral-200 text-neutral-600 hover:border-neutral-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      {filteredItems.length === 0 ? (
        <Card padding="lg">
          <p className="text-center text-neutral-500">
            No portfolio images{filterCategory !== "All" ? ` in ${filterCategory}` : ""}. Upload one to get started.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((item, index) => (
            <Card key={item.id} padding="none" variant="bordered">
              <div className="relative aspect-square">
                <Image
                  src={item.image_url}
                  alt={item.alt_text}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-3 space-y-2">
                <Select
                  options={CATEGORIES.map((c) => ({ value: c, label: c }))}
                  value={item.category}
                  onChange={(e) => handleCategoryChange(item, e.target.value)}
                />
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleMoveUp(item, index)}
                    disabled={index === 0}
                    className="p-1.5 text-neutral-400 hover:text-neutral-700 disabled:opacity-30 rounded transition-colors"
                    aria-label="Move up"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <polyline points="18 15 12 9 6 15" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleMoveDown(item, index)}
                    disabled={index === filteredItems.length - 1}
                    className="p-1.5 text-neutral-400 hover:text-neutral-700 disabled:opacity-30 rounded transition-colors"
                    aria-label="Move down"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <div className="flex-1" />
                  <button
                    onClick={() => setDeleteTarget(item)}
                    className="p-1.5 text-neutral-400 hover:text-red-600 rounded transition-colors"
                    aria-label="Delete image"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
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
        title="Delete Image"
        size="sm"
      >
        <p className="text-neutral-600 mb-6">
          Are you sure you want to delete this portfolio image? This action cannot be undone.
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
