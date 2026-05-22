import { createClient } from "@/lib/supabase/server";
import Card from "@/components/ui/Card";

function CalendarIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ShoppingBagIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
}

function StatCard({ title, value, icon, description }: StatCardProps) {
  return (
    <Card variant="elevated" padding="md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-neutral-900">{value}</p>
          <p className="mt-1 text-xs text-neutral-400">{description}</p>
        </div>
        <div className="p-3 bg-gold/10 rounded-lg text-gold-600">
          {icon}
        </div>
      </div>
    </Card>
  );
}

export default async function AdminDashboardPage() {
  // Check if Supabase is configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card variant="elevated" padding="lg">
          <div className="text-center max-w-md">
            <h2 className="text-xl font-heading font-bold text-neutral-900 mb-2">
              Database Not Configured
            </h2>
            <p className="text-neutral-600 mb-4">
              Supabase environment variables are not configured. Please set up your Supabase project and add the required environment variables.
            </p>
            <p className="text-sm text-neutral-500">
              Required: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
            </p>
          </div>
        </Card>
      </div>
    );
  }

  const supabase = await createClient();

  // Calculate date 7 days ago
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const sevenDaysAgoISO = sevenDaysAgo.toISOString();

  // Fetch summary stats in parallel
  const [bookingsResult, productsResult, subscribersResult, recentBookingsResult] =
    await Promise.all([
      supabase.from("bookings").select("id", { count: "exact", head: true }),
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase
        .from("newsletter_subscribers")
        .select("id", { count: "exact", head: true })
        .eq("is_active", true),
      supabase
        .from("bookings")
        .select("id, full_name, service_category, status, created_at")
        .gte("created_at", sevenDaysAgoISO)
        .order("created_at", { ascending: false })
        .limit(10),
    ]);

  const bookingsCount = bookingsResult.count ?? 0;
  const productsCount = productsResult.count ?? 0;
  const subscribersCount = subscribersResult.count ?? 0;
  const recentBookings = recentBookingsResult.data ?? [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-neutral-900">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Welcome back. Here&apos;s what&apos;s happening with your business.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Bookings"
          value={bookingsCount}
          icon={<CalendarIcon />}
          description="All time bookings"
        />
        <StatCard
          title="Products"
          value={productsCount}
          icon={<ShoppingBagIcon />}
          description="Active products"
        />
        <StatCard
          title="Subscribers"
          value={subscribersCount}
          icon={<MailIcon />}
          description="Active newsletter subscribers"
        />
        <StatCard
          title="Recent Activity"
          value={recentBookings.length}
          icon={<ActivityIcon />}
          description="Bookings in last 7 days"
        />
      </div>

      {/* Recent Activity */}
      <Card variant="elevated" padding="none">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-900">
            Recent Bookings (Last 7 Days)
          </h2>
        </div>
        <div className="overflow-x-auto">
          {recentBookings.length === 0 ? (
            <div className="px-6 py-12 text-center text-neutral-500">
              No bookings in the last 7 days.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50">
                  <th className="text-left px-6 py-3 font-medium text-neutral-600">
                    Client
                  </th>
                  <th className="text-left px-6 py-3 font-medium text-neutral-600">
                    Service
                  </th>
                  <th className="text-left px-6 py-3 font-medium text-neutral-600">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 font-medium text-neutral-600">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map(
                  (booking: {
                    id: string;
                    full_name: string;
                    service_category: string;
                    status: string;
                    created_at: string;
                  }) => (
                    <tr
                      key={booking.id}
                      className="border-b border-neutral-100 last:border-0"
                    >
                      <td className="px-6 py-3 text-neutral-900 font-medium">
                        {booking.full_name}
                      </td>
                      <td className="px-6 py-3 text-neutral-600 capitalize">
                        {booking.service_category}
                      </td>
                      <td className="px-6 py-3">
                        <StatusBadge status={booking.status} />
                      </td>
                      <td className="px-6 py-3 text-neutral-500">
                        {new Date(booking.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    confirmed: "bg-blue-50 text-blue-700 border-blue-200",
    completed: "bg-green-50 text-green-700 border-green-200",
    cancelled: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        styles[status] || styles.pending
      }`}
    >
      {status}
    </span>
  );
}
