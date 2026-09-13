'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/auth'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { publishWhatsAppAd } from '@/lib/meta/publish'
import { MetaApiError } from '@/lib/meta/errors'
import { AD_MEDIA_BUCKET, adMediaObjectPath } from '@/lib/supabase/storage'

export type PublishAdState =
  | { status: 'idle' }
  | { status: 'error'; message: string; stage?: string }

export async function publishAdAction(
  _prev: PublishAdState,
  formData: FormData,
): Promise<PublishAdState> {
  const { user } = await requireAdmin()

  const businessId = String(formData.get('business_id') ?? '')
  const headline = String(formData.get('headline') ?? '').trim()
  const primaryText = String(formData.get('primary_text') ?? '').trim()
  const dailyBudgetPkr = Number.parseInt(String(formData.get('daily_budget_pkr') ?? ''), 10)
  const whatsappNumber = String(formData.get('whatsapp_number') ?? '').trim()
  const prefillMessage = String(formData.get('prefill_message') ?? '').trim() || undefined
  const image = formData.get('image')

  if (!businessId) return { status: 'error', message: 'Missing client id.', stage: 'validate' }
  if (!headline) return { status: 'error', message: 'Headline is required.', stage: 'validate' }
  if (!primaryText) return { status: 'error', message: 'Primary text is required.', stage: 'validate' }
  if (!dailyBudgetPkr || dailyBudgetPkr < 100)
    return { status: 'error', message: 'Daily budget must be at least PKR 100.', stage: 'validate' }
  if (!whatsappNumber || !/^\+?\d{10,15}$/.test(whatsappNumber.replace(/\s/g, '')))
    return { status: 'error', message: 'WhatsApp number should be like +923001234567.', stage: 'validate' }
  if (!(image instanceof File) || image.size === 0)
    return { status: 'error', message: 'Please select an image.', stage: 'validate' }
  if (image.size > 8 * 1024 * 1024)
    return { status: 'error', message: 'Image must be under 8 MB.', stage: 'validate' }

  const supabase = await createSupabaseServerClient()
  const { data: business, error: bizErr } = await supabase
    .from('businesses')
    .select('id, name, facebook_page_id, instagram_business_account_id, meta_ad_account_id, whatsapp')
    .eq('id', businessId)
    .single()

  if (bizErr || !business) {
    return { status: 'error', message: 'Client not found.', stage: 'lookup' }
  }
  if (!business.facebook_page_id) {
    return { status: 'error', message: 'This client has no Facebook Page ID. Add it on the client detail page.', stage: 'preflight' }
  }
  if (!business.meta_ad_account_id) {
    return { status: 'error', message: 'This client has no Meta ad account ID. Add it on the client detail page.', stage: 'preflight' }
  }

  const admin = createSupabaseAdminClient()

  const storagePath = adMediaObjectPath(businessId, image.name || 'ad.jpg')
  const bytes = new Uint8Array(await image.arrayBuffer())
  const { error: uploadErr } = await admin.storage
    .from(AD_MEDIA_BUCKET)
    .upload(storagePath, bytes, {
      contentType: image.type || 'image/jpeg',
      upsert: false,
    })
  if (uploadErr) {
    return { status: 'error', message: `Upload failed: ${uploadErr.message}`, stage: 'upload' }
  }

  const { data: mediaRow, error: mediaErr } = await admin
    .from('media_assets')
    .insert({
      business_id: businessId,
      uploader_id: user.id,
      storage_path: storagePath,
      kind: (image.type || '').startsWith('video') ? 'video' : 'image',
      original_filename: image.name || null,
      file_size_bytes: image.size,
    })
    .select('id')
    .single()
  if (mediaErr || !mediaRow) {
    return { status: 'error', message: `Media save failed: ${mediaErr?.message}`, stage: 'media' }
  }

  const { data: signed, error: signErr } = await admin.storage
    .from(AD_MEDIA_BUCKET)
    .createSignedUrl(storagePath, 600)
  if (signErr || !signed?.signedUrl) {
    return { status: 'error', message: `Could not sign upload URL: ${signErr?.message}`, stage: 'sign' }
  }

  let meta
  try {
    meta = await publishWhatsAppAd({
      adAccountId: business.meta_ad_account_id,
      facebookPageId: business.facebook_page_id,
      instagramActorId: business.instagram_business_account_id,
      imageUrl: signed.signedUrl,
      imageFilename: image.name || 'ad.jpg',
      campaignName: `${business.name} — ${headline.slice(0, 40)}`,
      headline,
      primaryText,
      dailyBudgetPkr,
      whatsappPhoneE164: whatsappNumber,
      whatsappPrefillMessage: prefillMessage,
    })
  } catch (err) {
    if (err instanceof MetaApiError) {
      const detail = [err.userMsg, err.message, err.fbtraceId && `fbtrace_id: ${err.fbtraceId}`]
        .filter(Boolean)
        .join(' — ')
      return { status: 'error', message: `Meta rejected the publish: ${detail}`, stage: 'meta' }
    }
    return {
      status: 'error',
      message: err instanceof Error ? err.message : String(err),
      stage: 'meta',
    }
  }

  const { data: adRow, error: adErr } = await admin
    .from('ads')
    .insert({
      business_id: businessId,
      created_by: user.id,
      headline,
      primary_text: primaryText,
      call_to_action: 'WHATSAPP_MESSAGE',
      media_asset_id: mediaRow.id,
      daily_budget_pkr: dailyBudgetPkr,
      result_type: 'whatsapp',
      whatsapp_number: whatsappNumber,
      status: 'paused',
      meta_campaign_id: meta.campaignId,
      meta_adset_id: meta.adsetId,
      meta_creative_id: meta.creativeId,
      meta_ad_id: meta.adId,
      published_at: new Date().toISOString(),
    })
    .select('id')
    .single()

  if (adErr || !adRow) {
    return {
      status: 'error',
      message: `Ad row save failed after Meta publish (ad exists in Meta as ${meta.adId}): ${adErr?.message}`,
      stage: 'db',
    }
  }

  revalidatePath(`/admin`)
  revalidatePath(`/admin/clients/${businessId}`)
  revalidatePath(`/admin/clients/${businessId}/ads`)
  redirect(`/admin/clients/${businessId}/ads/${adRow.id}`)
}
