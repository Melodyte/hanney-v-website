"use client";

import { useState, useEffect, useCallback } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { exportSubscribersToCSV, downloadCSV } from "@/lib/utils/csv-export";
import type { NewsletterSubscriber } from "@/lib/types";

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const fetchSubscribers = useCallback(async () => {
    try {
      const res = await fetch("/api/newsletter");
      const data = await res.json();
      if (res.ok) {
        setSubscribers(data.subscribers || []);
      } else {
        addToast("Failed to load subscribers", "error");
      }
    } catch {
      addToast("Failed to load subscribers", "error");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchSubscribers();
  }, [fetchSubscribers]);

  const handleExportCSV = () => {
    if (subscribers.length === 0) {
      addToast("No subscribers to export", "warning");
      return;
    }

    const csv = exportSubscribersToCSV(subscribers);
    const date = new Date().toISOString().split("T")[0];
    downloadCSV(csv, `hanney-v-subscribers-${date}.csv`);
    addToast("CSV exported successfully", "success");
  };

  const activeCount = subscribers.filter((s) => s.is_active).length;
  const inactiveCount = subscribers.length - activeCount;

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
            Newsletter Subscribers
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            {subscribers.length} total · {activeCount} active · {inactiveCount} inactive
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={handleExportCSV}>
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export CSV
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card variant="elevated" padding="md">
          <p className="text-sm font-medium text-neutral-500">Total Subscribers</p>
          <p className="mt-1 text-2xl font-bold text-neutral-900">
            {subscribers.length}
          </p>
        </Card>
        <Card variant="elevated" padding="md">
          <p className="text-sm font-medium text-neutral-500">Active</p>
          <p className="mt-1 text-2xl font-bold text-green-600">{activeCount}</p>
        </Card>
        <Card variant="elevated" padding="md">
          <p className="text-sm font-medium text-neutral-500">Inactive</p>
          <p className="mt-1 text-2xl font-bold text-neutral-400">
            {inactiveCount}
          </p>
        </Card>
      </div>

      {/* Subscribers Table */}
      {subscribers.length === 0 ? (
        <Card padding="lg">
          <p className="text-center text-neutral-500">
            No subscribers yet. Subscribers will appear here when visitors sign up for the newsletter.
          </p>
        </Card>
      ) : (
        <Card variant="elevated" padding="none">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50">
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">
                    #
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">
                    Email
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">
                    Subscribed Date
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber, index) => (
                  <tr
                    key={subscriber.id}
                    className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50"
                  >
                    <td className="px-4 py-3 text-neutral-400">{index + 1}</td>
                    <td className="px-4 py-3 text-neutral-900 font-medium">
                      {subscriber.email}
                    </td>
                    <td className="px-4 py-3 text-neutral-600">
                      {new Date(subscriber.subscribed_at).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={subscriber.is_active ? "success" : "default"}
                      >
                        {subscriber.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
