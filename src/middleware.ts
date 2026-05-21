import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all admin routes except static files and images.
     * This guards /admin/* while allowing /admin/login through
     * (the redirect logic is handled in updateSession).
     */
    '/admin/:path*',
  ],
}
