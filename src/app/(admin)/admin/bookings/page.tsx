"use client";

import { useState, useEffect, useCallback } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import type { Booking } from "@/lib/types";

const STATUS_OPTIONS = ["pending", "confirmed", "completed", "cancelled"] as const;

const STATUS_BADGE_VARIANT: Record<string, "warning" | "info" | "success" | "error"> = {
  pending: "warning",
  confirmed: "info",
  completed: "success",
  cancelled: "error",
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const { addToast } = useToast();

  const fetchBookings = useCallback(async () => {
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      if (res.ok) {
        setBookings(data.bookings || []);
      } else {
        addToast("Failed to load bookings", "error");
      }
    } catch {
      addToast("Failed to load bookings", "error");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const updateStatus = async (booking: Booking, newStatus: string) => {
    try {
      const res = await fetch(`/api/bookings/${booking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) =>
            b.id === booking.id
              ? { ...b, status: newStatus as Booking["status"] }
              : b
          )
        );
        addToast(`Booking status updated to ${newStatus}`, "success");
      } else {
        addToast("Failed to update status", "error");
      }
    } catch {
      addToast("Failed to update status", "error");
    }
  };

  const filteredBookings =
    filterStatus === "all"
      ? bookings
      : bookings.filter((b) => b.status === filterStatus);

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
            Bookings
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Manage appointment bookings ({bookings.length} total)
          </p>
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["all", ...STATUS_OPTIONS].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 text-sm rounded-full border transition-colors capitalize ${
              filterStatus === status
                ? "bg-gold/10 border-gold text-gold-700 font-medium"
                : "border-neutral-200 text-neutral-600 hover:border-neutral-400"
            }`}
          >
            {status}
            {status !== "all" && (
              <span className="ml-1 text-xs">
                ({bookings.filter((b) => b.status === status).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Bookings Table */}
      {filteredBookings.length === 0 ? (
        <Card padding="lg">
          <p className="text-center text-neutral-500">
            No bookings{filterStatus !== "all" ? ` with status "${filterStatus}"` : ""}.
          </p>
        </Card>
      ) : (
        <Card variant="elevated" padding="none">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50">
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">
                    Client
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-600 hidden md:table-cell">
                    Email
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-600 hidden lg:table-cell">
                    Phone
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">
                    Service
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-600 hidden md:table-cell">
                    Date
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-neutral-900">
                          {booking.full_name}
                        </p>
                        <p className="text-xs text-neutral-500 md:hidden">
                          {booking.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-neutral-600 hidden md:table-cell">
                      {booking.email}
                    </td>
                    <td className="px-4 py-3 text-neutral-600 hidden lg:table-cell">
                      {booking.phone}
                    </td>
                    <td className="px-4 py-3 text-neutral-600 capitalize">
                      {booking.service_category}
                    </td>
                    <td className="px-4 py-3 text-neutral-600 hidden md:table-cell">
                      {new Date(booking.preferred_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={STATUS_BADGE_VARIANT[booking.status]}>
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={booking.status}
                        onChange={(e) => updateStatus(booking, e.target.value)}
                        className="text-xs border border-neutral-200 rounded px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-gold"
                        aria-label={`Update status for ${booking.full_name}`}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Booking Details - Expandable on mobile */}
      {filteredBookings.length > 0 && (
        <div className="mt-4 text-xs text-neutral-400 text-center">
          Showing {filteredBookings.length} of {bookings.length} bookings
        </div>
      )}
    </div>
  );
}
