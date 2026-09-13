import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { activateAdAction, archiveAdAction, pauseAdAction, refreshInsightsAction } from './actions'
import { AD_MEDIA_BUCKET } from '@/lib/supabase/storage'

export const dynamic = 'force-dynamic'

type Ad = {
  id: string
  business_id: string
  headline: string
  primary_text: string
  daily_budget_pkr: number
  whatsapp_number: string | null
  status: 'draft' | 'pending' | 'paused' | 'active' | 'archived' | 'failed'
  meta_ad_id: string | null
  meta_campaign_id: string | null
  meta_last_error: string | null
  published_at: string | null
  created_at: string
  media_asset_id: string | null
}

type Insight = {
  impressions: number
  clicks: number
  results: number
  spend_pkr: number
  cost_per_result_pkr: number | null
  fetched_at: string
}

const statusColour: Record<Ad['status'], string> = {
  draft: 'bg-slate-100 text-slate-700',
  pending: 'bg-amber-50 text-amber-800',
  paused: 'bg-amber-50 text-amber-800',
  active: 'bg-emerald-50 text-emerald-800',
  archived: 'bg-slate-100 text-slate-600',
  failed: 'bg-red-50 text-red-800',
}

export default async function AdDetailPage({ params }: PageProps<'/admin/clients/[id]/ads/[adId]'>) {
  const { id, adId } = await params
  const supabase = await createSupabaseServerClient()

  const { data: business } = await supabase.from('businesses').select('id, name').eq('id', id).maybeSingle()
  if (!business) notFound()

  const { data: ad, error } = await supabase
    .from('ads')
    .select(
      'id, business_id, headline, primary_text, daily_budget_pkr, whatsapp_number, status, meta_ad_id, meta_campaign_id, meta_last_error, published_at, created_at, media_asset_id',
    )
    .eq('id', adId)
    .eq('business_id', id)
    .maybeSingle<Ad>()

  if (error || !ad) notFound()

  let mediaSignedUrl: string | null = null
  if (ad.media_asset_id) {
    const { data: media } = await supabase
      .from('media_assets')
      .select('storage_path')
      .eq('id', ad.media_asset_id)
      .maybeSingle()
    if (media?.storage_path) {
      const admin = createSupabaseAdminClient()
      const { data: signed } = await admin.storage
        .from(AD_MEDIA_BUCKET)
        .createSignedUrl(media.storage_path, 3600)
      mediaSignedUrl = signed?.signedUrl ?? null
    }
  }

  const { data: insightsData } = await supabase
    .from('insights')
    .select('impressions, clicks, results, spend_pkr, cost_per_result_pkr, fetched_at')
    .eq('ad_id', ad.id)
    .order('fetched_at', { ascending: false })
    .limit(1)
    .maybeSingle<Insight>()

  const canActivate = ad.status !== 'active' && ad.status !== 'archived'
  const canPause = ad.status === 'active'
  const canArchive = ad.status !== 'archived'

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link href={`/admin/clients/${id}/ads`} className="text-xs font-bold text-muted hover:text-foreground">
            ← All ads for {business.name}
          </Link>
          <h1 className="mt-2 text-2xl font-semibold text-foreground">{ad.headline}</h1>
          <p className="text-xs text-muted">
            Published {ad.published_at ? new Date(ad.published_at).toLocaleString() : '—'}
          </p>
        </div>
        <span className={`self-start rounded-full px-3 py-1 text-[10px] font-black uppercase ${statusColour[ad.status]}`}>
          {ad.status}
        </span>
      </div>

      {ad.meta_last_error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <span className="font-semibold">Last Meta error:</span> {ad.meta_last_error}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-line bg-white p-5 sm:col-span-2 space-y-4">
          {mediaSignedUrl && (
            <div className="overflow-hidden rounded-2xl border border-line bg-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={mediaSignedUrl} alt={ad.headline} className="max-h-[420px] w-full object-contain" />
            </div>
          )}
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-muted">Primary text</p>
            <p className="mt-2 whitespace-pre-line text-sm text-foreground">{ad.primary_text}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 text-sm">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-muted">WhatsApp</p>
              <p className="mt-1 font-mono">{ad.whatsapp_number ?? '—'}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-muted">Daily budget</p>
              <p className="mt-1 font-mono">PKR {ad.daily_budget_pkr}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-muted">Meta ad id</p>
              <p className="mt-1 break-all font-mono text-xs text-soft">{ad.meta_ad_id ?? '—'}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-muted">Meta campaign id</p>
              <p className="mt-1 break-all font-mono text-xs text-soft">{ad.meta_campaign_id ?? '—'}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-line bg-white p-5 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wide text-muted">Controls</p>
            <div className="grid gap-2">
              {canActivate && (
                <form action={activateAdAction}>
                  <input type="hidden" name="ad_id" value={ad.id} />
                  <button className="w-full rounded-full bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:brightness-110">
                    ▶ Activate
                  </button>
                </form>
              )}
              {canPause && (
                <form action={pauseAdAction}>
                  <input type="hidden" name="ad_id" value={ad.id} />
                  <button className="w-full rounded-full border border-line px-4 py-2 text-sm font-semibold text-foreground hover:bg-soft">
                    ⏸ Pause
                  </button>
                </form>
              )}
              {canArchive && (
                <form action={archiveAdAction}>
                  <input type="hidden" name="ad_id" value={ad.id} />
                  <button className="w-full rounded-full border border-line px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50">
                    Archive
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-white p-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wide text-muted">Results</p>
              <form action={refreshInsightsAction}>
                <input type="hidden" name="ad_id" value={ad.id} />
                <button className="text-xs font-semibold text-brand-orange hover:underline">Refresh</button>
              </form>
            </div>
            {insightsData ? (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted">Impressions</span><span className="font-mono">{insightsData.impressions.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted">Clicks</span><span className="font-mono">{insightsData.clicks.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted">WhatsApp opens</span><span className="font-mono">{insightsData.results.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted">Spent</span><span className="font-mono">PKR {Number(insightsData.spend_pkr).toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-muted">Cost/result</span><span className="font-mono">{insightsData.cost_per_result_pkr ? `PKR ${Number(insightsData.cost_per_result_pkr).toFixed(2)}` : '—'}</span></div>
                <p className="pt-1 text-[10px] text-muted">Updated {new Date(insightsData.fetched_at).toLocaleString()}</p>
              </div>
            ) : (
              <p className="text-xs text-soft">No insights yet. Click Refresh once the ad has been active for a few minutes.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
