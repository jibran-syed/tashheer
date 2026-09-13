// Server-only admin client. Uses the service-role key which bypasses RLS,
// so it must never be imported into a Client Component. The env var is
// SUPABASE_SERVICE_ROLE_KEY (no NEXT_PUBLIC_ prefix) so Next.js will not
// include it in browser bundles — but do not import this module from
// anything that runs in the browser.

import { createClient } from '@supabase/supabase-js'

export function createSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) {
    throw new Error(
      'Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.',
    )
  }
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
