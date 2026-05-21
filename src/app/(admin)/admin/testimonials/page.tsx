"use client";

import { useState, useEffect, useCallback } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Badge from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import type { Testimonial } from "@/lib/types";

const SERVICE_TYPE_OPTIONS = [
  { value: "Bespoke Fashion", label: "Bespoke Fashion" },
  { value: "Bridal & Traditional Wear", label: "Bridal & Traditional Wear" },
  { value: "Event Styling", label: "Event Styling" },
];

interface TestimonialFormData {
  client_name: string;
  service_type: string;
  review_text: string;
  rating: number;
  screenshot_url: string;
  is_visible: boolean;
}

const emptyForm: TestimonialFormData = {
  client_name: "",
  service_type: "Bespoke Fashion",
  review_text: "",
  rating: 5,
  screenshot_url: "",
  is_visible: true,
};

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState<TestimonialFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const { addToast } = useToast();

  const fetchTestimonials = useCallback(async () => {
    try {
      const res = await fetch("/api/testimonials?all=true");
      const data = await res.json();
      if (res.ok) {
        setTestimonials(data.testimonials || []);
      } else {
        addToast("Failed to load testimonials", "error");
      }
    } catch {
      addToast("Failed to load testimonials", "error");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const openCreateForm = () => {
    setEditingTestimonial(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      client_name: testimonial.client_name,
      service_type: testimonial.service_type,
      review_text: testimonial.review_text,
      rating: testimonial.rating,
      screenshot_url: testimonial.screenshot_url || "",
      is_visible: testimonial.is_visible,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!formData.client_name || !formData.review_text) {
      addToast("Please fill in all required fields", "warning");
      return;
    }

    setSaving(true);
    try {
      const url = editingTestimonial
        ? `/api/testimonials/${editingTestimonial.id}`
        : "/api/testimonials";
      const method = editingTestimonial ? "PUT" : "POST";

      const payload = {
        ...formData,
        screenshot_url: formData.screenshot_url || undefined,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        addToast(
          editingTestimonial ? "Testimonial updated" : "Testimonial created",
          "success"
        );
        setShowForm(false);
        await fetchTestimonials();
      } else {
        const err = await res.json();
        addToast(err.error || "Failed to save testimonial", "error");
      }
    } catch {
      addToast("Failed to save testimonial", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/testimonials/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTestimonials((prev) => prev.filter((t) => t.id !== deleteTarget.id));
        addToast("Testimonial deleted", "success");
      } else {
        addToast("Failed to delete testimonial", "error");
      }
    } catch {
      addToast("Failed to delete testimonial", "error");
    } finally {
      setDeleteTarget(null);
    }
  };

  const toggleVisibility = async (testimonial: Testimonial) => {
    try {
      const res = await fetch(`/api/testimonials/${testimonial.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...testimonial,
          is_visible: !testimonial.is_visible,
        }),
      });
      if (res.ok) {
        setTestimonials((prev) =>
          prev.map((t) =>
            t.id === testimonial.id ? { ...t, is_visible: !t.is_visible } : t
          )
        );
        addToast(
          testimonial.is_visible ? "Testimonial hidden" : "Testimonial visible",
          "success"
        );
      } else {
        addToast("Failed to update visibility", "error");
      }
    } catch {
      addToast("Failed to update visibility", "error");
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= rating ? "text-amber-400 fill-amber-400" : "text-neutral-300"}`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
    );
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
            Testimonials
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Manage client testimonials ({testimonials.length} total)
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={openCreateForm}>
          Add Testimonial
        </Button>
      </div>

      {/* Testimonials List */}
      {testimonials.length === 0 ? (
        <Card padding="lg">
          <p className="text-center text-neutral-500">
            No testimonials yet. Add your first testimonial to get started.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} variant="bordered" padding="md">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-neutral-900">
                      {testimonial.client_name}
                    </h3>
                    {!testimonial.is_visible && (
                      <Badge variant="warning">Hidden</Badge>
                    )}
                  </div>
                  <p className="text-sm text-neutral-500 mb-2">
                    {testimonial.service_type}
                  </p>
                  {renderStars(testimonial.rating)}
                  <p className="mt-2 text-sm text-neutral-700 line-clamp-3">
                    &ldquo;{testimonial.review_text}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditForm(testimonial)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleVisibility(testimonial)}
                  >
                    {testimonial.is_visible ? "Hide" : "Show"}
                  </Button>
                  <button
                    onClick={() => setDeleteTarget(testimonial)}
                    className="p-1.5 text-neutral-400 hover:text-red-600 rounded transition-colors"
                    aria-label="Delete testimonial"
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
        title={editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Client Name"
            value={formData.client_name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, client_name: e.target.value }))
            }
            placeholder="Enter client name"
            required
          />
          <Select
            label="Service Type"
            options={SERVICE_TYPE_OPTIONS}
            value={formData.service_type}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, service_type: e.target.value }))
            }
          />
          <Textarea
            label="Review Text"
            value={formData.review_text}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, review_text: e.target.value }))
            }
            placeholder="Enter the client's review"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, rating: star }))
                    }
                    className="p-1"
                    aria-label={`Set rating to ${star}`}
                  >
                    <svg
                      className={`w-6 h-6 ${
                        star <= formData.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-neutral-300"
                      }`}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
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
          <Input
            label="Screenshot URL (optional)"
            value={formData.screenshot_url}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, screenshot_url: e.target.value }))
            }
            placeholder="https://..."
          />
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
            {editingTestimonial ? "Update" : "Create"}
          </Button>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Testimonial"
        size="sm"
      >
        <p className="text-neutral-600 mb-6">
          Are you sure you want to delete the testimonial from &ldquo;{deleteTarget?.client_name}&rdquo;? This action cannot be undone.
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
