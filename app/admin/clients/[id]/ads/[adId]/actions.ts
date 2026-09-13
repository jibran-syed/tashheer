'use server'

import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { updateAdStatus, updateCampaignStatus } from '@/lib/meta/publish'
import { MetaApiError } from '@/lib/meta/errors'
import { getAdInsights } from '@/lib/meta/insights'

async function loadAd(adId: string) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('ads')
    .select('id, business_id, meta_ad_id, meta_campaign_id, status')
    .eq('id', adId)
    .single()
  if (error || !data) throw new Error('Ad not found.')
  return data
}

function metaError(err: unknown): string {
  if (err instanceof MetaApiError) {
    return err.userMsg ?? err.message
  }
  return err instanceof Error ? err.message : String(err)
}

export async function activateAdAction(formData: FormData) {
  await requireAdmin()
  const adId = String(formData.get('ad_id') ?? '')
  const ad = await loadAd(adId)
  if (!ad.meta_ad_id || !ad.meta_campaign_id) return
  const admin = createSupabaseAdminClient()

  try {
    await updateCampaignStatus(ad.meta_campaign_id, 'ACTIVE')
    await updateAdStatus(ad.meta_ad_id, 'ACTIVE')
    await admin.from('ads').update({ status: 'active', meta_last_error: null }).eq('id', adId)
  } catch (err) {
    await admin.from('ads').update({ meta_last_error: metaError(err) }).eq('id', adId)
  }

  revalidatePath(`/admin/clients/${ad.business_id}/ads/${adId}`)
  revalidatePath(`/admin/clients/${ad.business_id}/ads`)
}

export async function pauseAdAction(formData: FormData) {
  await requireAdmin()
  const adId = String(formData.get('ad_id') ?? '')
  const ad = await loadAd(adId)
  if (!ad.meta_ad_id) return
  const admin = createSupabaseAdminClient()

  try {
    await updateAdStatus(ad.meta_ad_id, 'PAUSED')
    await admin.from('ads').update({ status: 'paused', meta_last_error: null }).eq('id', adId)
  } catch (err) {
    await admin.from('ads').update({ meta_last_error: metaError(err) }).eq('id', adId)
  }

  revalidatePath(`/admin/clients/${ad.business_id}/ads/${adId}`)
  revalidatePath(`/admin/clients/${ad.business_id}/ads`)
}

export async function archiveAdAction(formData: FormData) {
  await requireAdmin()
  const adId = String(formData.get('ad_id') ?? '')
  const ad = await loadAd(adId)
  if (!ad.meta_ad_id) return
  const admin = createSupabaseAdminClient()

  try {
    await updateAdStatus(ad.meta_ad_id, 'ARCHIVED')
    await admin.from('ads').update({ status: 'archived', meta_last_error: null }).eq('id', adId)
  } catch (err) {
    await admin.from('ads').update({ meta_last_error: metaError(err) }).eq('id', adId)
  }

  revalidatePath(`/admin/clients/${ad.business_id}/ads/${adId}`)
  revalidatePath(`/admin/clients/${ad.business_id}/ads`)
}

export async function refreshInsightsAction(formData: FormData) {
  await requireAdmin()
  const adId = String(formData.get('ad_id') ?? '')
  const ad = await loadAd(adId)
  if (!ad.meta_ad_id) return
  const admin = createSupabaseAdminClient()

  try {
    const insights = await getAdInsights(ad.meta_ad_id, 'lifetime')
    await admin
      .from('insights')
      .upsert(
        {
          ad_id: ad.id,
          business_id: ad.business_id,
          snapshot_date: new Date().toISOString().slice(0, 10),
          impressions: insights.impressions,
          clicks: insights.clicks,
          results: insights.results,
          spend_pkr: insights.spendPkr,
          cost_per_result_pkr: insights.costPerResultPkr,
          raw: insights.raw,
          fetched_at: new Date().toISOString(),
        },
        { onConflict: 'ad_id,snapshot_date' },
      )
    await admin.from('ads').update({ meta_last_error: null }).eq('id', adId)
  } catch (err) {
    await admin.from('ads').update({ meta_last_error: metaError(err) }).eq('id', adId)
  }

  revalidatePath(`/admin/clients/${ad.business_id}/ads/${adId}`)
}
