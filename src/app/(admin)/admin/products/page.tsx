"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Badge from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import type { Product } from "@/lib/types";

const AVAILABILITY_OPTIONS = [
  { value: "available", label: "Available" },
  { value: "made-to-order", label: "Made to Order" },
  { value: "sold-out", label: "Sold Out" },
];

const CATEGORY_OPTIONS = [
  { value: "Bespoke", label: "Bespoke" },
  { value: "Bridal", label: "Bridal" },
  { value: "Traditional", label: "Traditional" },
  { value: "Event", label: "Event" },
  { value: "Accessories", label: "Accessories" },
];

interface ProductFormData {
  name: string;
  description: string;
  price_naira: number;
  category: string;
  availability: string;
  image_urls: string[];
  is_visible: boolean;
}

const emptyForm: ProductFormData = {
  name: "",
  description: "",
  price_naira: 0,
  category: "Bespoke",
  availability: "available",
  image_urls: [],
  is_visible: true,
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { addToast } = useToast();

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/api/products?all=true");
      const data = await res.json();
      if (res.ok) {
        setProducts(data.products || []);
      } else {
        addToast("Failed to load products", "error");
      }
    } catch {
      addToast("Failed to load products", "error");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const openCreateForm = () => {
    setEditingProduct(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price_naira: product.price_naira,
      category: product.category,
      availability: product.availability,
      image_urls: product.image_urls,
      is_visible: product.is_visible,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.description || formData.price_naira <= 0) {
      addToast("Please fill in all required fields", "warning");
      return;
    }

    if (formData.image_urls.length === 0) {
      addToast("Please add at least one image", "warning");
      return;
    }

    setSaving(true);
    try {
      const url = editingProduct
        ? `/api/products/${editingProduct.id}`
        : "/api/products";
      const method = editingProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        addToast(
          editingProduct ? "Product updated" : "Product created",
          "success"
        );
        setShowForm(false);
        await fetchProducts();
      } else {
        const err = await res.json();
        addToast(err.error || "Failed to save product", "error");
      }
    } catch {
      addToast("Failed to save product", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/products/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
        addToast("Product deleted", "success");
      } else {
        addToast("Failed to delete product", "error");
      }
    } catch {
      addToast("Failed to delete product", "error");
    } finally {
      setDeleteTarget(null);
    }
  };

  const toggleVisibility = async (product: Product) => {
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product, is_visible: !product.is_visible }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === product.id ? { ...p, is_visible: !p.is_visible } : p
          )
        );
        addToast(
          product.is_visible ? "Product hidden" : "Product visible",
          "success"
        );
      } else {
        addToast("Failed to update visibility", "error");
      }
    } catch {
      addToast("Failed to update visibility", "error");
    }
  };

  const addImageUrl = () => {
    if (imageUrl && imageUrl.startsWith("http")) {
      setFormData((prev) => ({
        ...prev,
        image_urls: [...prev.image_urls, imageUrl],
      }));
      setImageUrl("");
    }
  };

  const removeImageUrl = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      image_urls: prev.image_urls.filter((_, i) => i !== index),
    }));
  };

  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
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
            Products
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Manage your product catalog ({products.length} products)
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={openCreateForm}>
          Add Product
        </Button>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <Card padding="lg">
          <p className="text-center text-neutral-500">
            No products yet. Add your first product to get started.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Card key={product.id} padding="none" variant="bordered">
              <div className="relative aspect-[4/3]">
                {product.image_urls[0] ? (
                  <Image
                    src={product.image_urls[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                    No image
                  </div>
                )}
                {!product.is_visible && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="warning">Hidden</Badge>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-neutral-900 truncate">
                  {product.name}
                </h3>
                <p className="text-sm text-neutral-500 mt-1">
                  {product.category} · {formatPrice(product.price_naira)}
                </p>
                <div className="mt-2">
                  <Badge
                    variant={
                      product.availability === "available"
                        ? "success"
                        : product.availability === "made-to-order"
                        ? "info"
                        : "error"
                    }
                  >
                    {product.availability}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-neutral-100">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditForm(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleVisibility(product)}
                  >
                    {product.is_visible ? "Hide" : "Show"}
                  </Button>
                  <div className="flex-1" />
                  <button
                    onClick={() => setDeleteTarget(product)}
                    className="p-1.5 text-neutral-400 hover:text-red-600 rounded transition-colors"
                    aria-label="Delete product"
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

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={editingProduct ? "Edit Product" : "Add Product"}
        size="lg"
      >
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          <Input
            label="Product Name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Enter product name"
            required
          />
          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Enter product description"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price (₦)"
              type="number"
              value={formData.price_naira || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  price_naira: parseInt(e.target.value) || 0,
                }))
              }
              placeholder="0"
              required
            />
            <Select
              label="Category"
              options={CATEGORY_OPTIONS}
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Availability"
              options={AVAILABILITY_OPTIONS}
              value={formData.availability}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  availability: e.target.value,
                }))
              }
            />
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_visible}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      is_visible: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 rounded border-neutral-300 text-gold focus:ring-gold"
                />
                <span className="text-sm text-neutral-700">Visible on site</span>
              </label>
            </div>
          </div>

          {/* Image URLs */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              Images
            </label>
            <div className="flex gap-2">
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Paste image URL"
              />
              <Button variant="secondary" size="sm" onClick={addImageUrl}>
                Add
              </Button>
            </div>
            {formData.image_urls.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.image_urls.map((url, i) => (
                  <div
                    key={i}
                    className="relative w-16 h-16 rounded border border-neutral-200 overflow-hidden group"
                  >
                    <Image
                      src={url}
                      alt={`Product image ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={() => removeImageUrl(i)}
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                      aria-label="Remove image"
                    >
                      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-neutral-200">
          <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            isLoading={saving}
          >
            {editingProduct ? "Update" : "Create"}
          </Button>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Product"
        size="sm"
      >
        <p className="text-neutral-600 mb-6">
          Are you sure you want to delete &ldquo;{deleteTarget?.name}&rdquo;? This action cannot be undone.
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
