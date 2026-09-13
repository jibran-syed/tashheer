import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const statusStyles: Record<string, string> = {
  draft: 'bg-slate-100 text-slate-600',
  pending: 'bg-amber-50 text-amber-700',
  paused: 'bg-amber-50 text-amber-700',
  active: 'bg-emerald-50 text-emerald-700',
  archived: 'bg-slate-100 text-slate-600',
  failed: 'bg-red-50 text-red-700',
}

export default async function ClientAdsPage({ params }: PageProps<'/admin/clients/[id]/ads'>) {
  const { id } = await params
  const supabase = await createSupabaseServerClient()

  const { data: business } = await supabase
    .from('businesses')
    .select('id, name')
    .eq('id', id)
    .maybeSingle()

  if (!business) notFound()

  const { data: ads } = await supabase
    .from('ads')
    .select('id, headline, status, daily_budget_pkr, created_at, published_at')
    .eq('business_id', id)
    .order('created_at', { ascending: false })

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link href={`/admin/clients/${id}`} className="text-xs font-bold text-muted hover:text-foreground">
            ← Back to {business.name}
          </Link>
          <h1 className="mt-2 text-2xl font-semibold text-foreground">Ads for {business.name}</h1>
        </div>
        <Link
          href={`/admin/clients/${id}/ads/new`}
          className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
        >
          + New ad
        </Link>
      </div>

      {(!ads || ads.length === 0) && (
        <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center">
          <p className="text-lg font-semibold text-foreground">No ads yet</p>
          <p className="mt-1 text-sm text-soft">Publish the first ad — it'll be created in PAUSED status for review.</p>
          <Link
            href={`/admin/clients/${id}/ads/new`}
            className="mt-5 inline-flex items-center justify-center rounded-full bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            + Create first ad
          </Link>
        </div>
      )}

      {ads && ads.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-line bg-white">
          <table className="w-full text-sm">
            <thead className="bg-soft text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-5 py-3 text-left font-bold">Headline</th>
                <th className="px-5 py-3 text-left font-bold">Status</th>
                <th className="px-5 py-3 text-left font-bold">Daily budget</th>
                <th className="px-5 py-3 text-left font-bold">Published</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {ads.map((ad) => (
                <tr key={ad.id} className="hover:bg-soft/60">
                  <td className="px-5 py-3 font-semibold text-foreground">
                    <Link href={`/admin/clients/${id}/ads/${ad.id}`} className="hover:text-brand-orange">
                      {ad.headline}
                    </Link>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase ${statusStyles[ad.status] ?? ''}`}>
                      {ad.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 font-mono text-xs text-soft">PKR {ad.daily_budget_pkr}</td>
                  <td className="px-5 py-3 text-soft">
                    {ad.published_at ? new Date(ad.published_at).toLocaleString() : '—'}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link href={`/admin/clients/${id}/ads/${ad.id}`} className="text-xs font-semibold text-brand-orange hover:underline">
                      Open →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
