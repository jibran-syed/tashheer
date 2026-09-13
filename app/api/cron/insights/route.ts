import { NextResponse, type NextRequest } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { getAdInsights } from '@/lib/meta/insights'
import { MetaApiError } from '@/lib/meta/errors'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

function authorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  const header = request.headers.get('authorization')
  return header === `Bearer ${secret}`
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const admin = createSupabaseAdminClient()
  const { data: ads, error } = await admin
    .from('ads')
    .select('id, business_id, meta_ad_id, status')
    .in('status', ['active', 'paused'])
    .not('meta_ad_id', 'is', null)

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }

  const today = new Date().toISOString().slice(0, 10)
  const nowIso = new Date().toISOString()
  const results: Array<{ adId: string; ok: boolean; error?: string }> = []

  for (const ad of ads ?? []) {
    if (!ad.meta_ad_id) continue
    try {
      const insights = await getAdInsights(ad.meta_ad_id, 'lifetime')
      const { error: upsertErr } = await admin.from('insights').upsert(
        {
          ad_id: ad.id,
          business_id: ad.business_id,
          snapshot_date: today,
          impressions: insights.impressions,
          clicks: insights.clicks,
          results: insights.results,
          spend_pkr: insights.spendPkr,
          cost_per_result_pkr: insights.costPerResultPkr,
          raw: insights.raw,
          fetched_at: nowIso,
        },
        { onConflict: 'ad_id,snapshot_date' },
      )
      if (upsertErr) throw new Error(upsertErr.message)
      await admin.from('ads').update({ meta_last_error: null }).eq('id', ad.id)
      results.push({ adId: ad.id, ok: true })
    } catch (err) {
      const message = err instanceof MetaApiError ? err.userMsg ?? err.message : err instanceof Error ? err.message : String(err)
      await admin.from('ads').update({ meta_last_error: message }).eq('id', ad.id)
      results.push({ adId: ad.id, ok: false, error: message })
    }
  }

  return NextResponse.json({
    ok: true,
    scanned: results.length,
    succeeded: results.filter((r) => r.ok).length,
    failed: results.filter((r) => !r.ok).length,
    results,
  })
}
