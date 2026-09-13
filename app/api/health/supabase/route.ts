import { NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

export async function GET() {
  const stages: Record<string, string> = {}

  try {
    stages.env = 'ok'
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) throw new Error('NEXT_PUBLIC_SUPABASE_URL missing')
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) throw new Error('SUPABASE_SERVICE_ROLE_KEY missing')

    const supabase = createSupabaseAdminClient()
    stages.client = 'ok'

    const { error: usersErr } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1 })
    if (usersErr) throw new Error(`auth check: ${usersErr.message}`)
    stages.auth = 'ok'

    const { error: tableErr } = await supabase.from('businesses').select('id').limit(1)
    if (tableErr) {
      stages.schema = `pending: ${tableErr.message}`
      return NextResponse.json(
        {
          ok: false,
          message: 'Connected to Supabase, but the schema migration has not been applied yet.',
          nextStep:
            'Open Supabase Dashboard -> SQL Editor -> New query, paste supabase/migrations/0001_init.sql, and Run.',
          stages,
        },
        { status: 503 },
      )
    }
    stages.schema = 'ok'

    return NextResponse.json({ ok: true, stages })
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : String(err),
        stages,
      },
      { status: 500 },
    )
  }
}
