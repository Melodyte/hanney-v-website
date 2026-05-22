import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminHeader from "@/components/layout/AdminHeader";

// Prevent static generation for admin pages
export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if Supabase is configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-heading font-bold text-neutral-900 mb-4">
            Database Not Configured
          </h1>
          <p className="text-neutral-600 mb-2">
            Supabase environment variables are not configured.
          </p>
          <p className="text-sm text-neutral-500">
            Please set up your Supabase project and add the required environment variables to continue.
          </p>
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-neutral-50">
      <AdminSidebar />
      <div className="lg:pl-64 transition-all duration-300">
        <AdminHeader userEmail={user?.email} />
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
