import { metaFetch } from './client'

// PKR is a 0-decimal currency in Meta's ad-account settings for accounts
// created with currency PKR — daily_budget is the whole-rupee integer.
// USD/EUR-style 2-decimal accounts multiply by 100. We only support PKR
// accounts for MVP. If a client's ad account is USD, this will be wrong
// and we'll surface it in Phase 4 diagnostics later.
function pkrToBudgetUnits(daily_pkr: number): number {
  return Math.max(1, Math.floor(daily_pkr))
}

type NormalisedAdAccount = string
function normaliseAdAccountId(id: string): NormalisedAdAccount {
  return id.startsWith('act_') ? id : `act_${id}`
}

export async function uploadImageFromUrl(params: {
  adAccountId: string
  imageUrl: string
  filename?: string
}): Promise<{ hash: string; url: string; filename: string }> {
  const account = normaliseAdAccountId(params.adAccountId)
  const filename = params.filename ?? `img-${Date.now()}.jpg`

  const res = await metaFetch<{ images: Record<string, { hash: string; url: string }> }>(
    `/${account}/adimages`,
    {
      method: 'POST',
      body: { url: params.imageUrl, filename },
    },
  )

  const entry = Object.values(res.images ?? {})[0]
  if (!entry?.hash) throw new Error('Meta accepted the image upload but returned no hash.')
  return { hash: entry.hash, url: entry.url, filename }
}

export async function createCampaign(params: {
  adAccountId: string
  name: string
}): Promise<{ id: string }> {
  const account = normaliseAdAccountId(params.adAccountId)
  return metaFetch<{ id: string }>(`/${account}/campaigns`, {
    method: 'POST',
    body: {
      name: params.name,
      objective: 'OUTCOME_ENGAGEMENT',
      status: 'PAUSED',
      buying_type: 'AUCTION',
      special_ad_categories: [],
    },
  })
}

export async function createWhatsAppAdSet(params: {
  adAccountId: string
  campaignId: string
  name: string
  dailyBudgetPkr: number
  facebookPageId: string
  countryCode?: string
  ageMin?: number
}): Promise<{ id: string }> {
  const account = normaliseAdAccountId(params.adAccountId)
  return metaFetch<{ id: string }>(`/${account}/adsets`, {
    method: 'POST',
    body: {
      name: params.name,
      campaign_id: params.campaignId,
      status: 'PAUSED',
      daily_budget: pkrToBudgetUnits(params.dailyBudgetPkr),
      billing_event: 'IMPRESSIONS',
      optimization_goal: 'CONVERSATIONS',
      destination_type: 'WHATSAPP',
      promoted_object: { page_id: params.facebookPageId },
      targeting: {
        geo_locations: { countries: [params.countryCode ?? 'PK'] },
        age_min: params.ageMin ?? 18,
        publisher_platforms: ['facebook', 'instagram'],
      },
    },
  })
}

function whatsappLink(phoneE164: string, message?: string): string {
  const phone = phoneE164.replace(/[^\d]/g, '')
  const query = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${phone}${query}`
}

export async function createWhatsAppAdCreative(params: {
  adAccountId: string
  facebookPageId: string
  instagramActorId?: string | null
  imageHash: string
  headline: string
  primaryText: string
  whatsappPhoneE164: string
  whatsappPrefillMessage?: string
  name?: string
}): Promise<{ id: string }> {
  const account = normaliseAdAccountId(params.adAccountId)
  const link = whatsappLink(params.whatsappPhoneE164, params.whatsappPrefillMessage)

  const storySpec: Record<string, unknown> = {
    page_id: params.facebookPageId,
    link_data: {
      image_hash: params.imageHash,
      link,
      message: params.primaryText,
      name: params.headline,
      call_to_action: {
        type: 'WHATSAPP_MESSAGE',
        value: {
          app_destination: 'WHATSAPP',
          link,
        },
      },
    },
  }
  if (params.instagramActorId) storySpec.instagram_actor_id = params.instagramActorId

  return metaFetch<{ id: string }>(`/${account}/adcreatives`, {
    method: 'POST',
    body: {
      name: params.name ?? `Tashheer creative ${Date.now()}`,
      object_story_spec: storySpec,
    },
  })
}

export async function createAd(params: {
  adAccountId: string
  name: string
  adsetId: string
  creativeId: string
}): Promise<{ id: string }> {
  const account = normaliseAdAccountId(params.adAccountId)
  return metaFetch<{ id: string }>(`/${account}/ads`, {
    method: 'POST',
    body: {
      name: params.name,
      adset_id: params.adsetId,
      creative: { creative_id: params.creativeId },
      status: 'PAUSED',
    },
  })
}

export type PublishInput = {
  adAccountId: string
  facebookPageId: string
  instagramActorId?: string | null
  imageUrl: string
  imageFilename?: string
  campaignName: string
  headline: string
  primaryText: string
  dailyBudgetPkr: number
  whatsappPhoneE164: string
  whatsappPrefillMessage?: string
  countryCode?: string
  ageMin?: number
}

export type PublishResult = {
  campaignId: string
  adsetId: string
  creativeId: string
  adId: string
  imageHash: string
}

/**
 * Full publish chain. Always creates in PAUSED status.
 * Caller activates via updateAdStatus once reviewed in Meta.
 */
export async function publishWhatsAppAd(input: PublishInput): Promise<PublishResult> {
  const image = await uploadImageFromUrl({
    adAccountId: input.adAccountId,
    imageUrl: input.imageUrl,
    filename: input.imageFilename,
  })

  const campaign = await createCampaign({
    adAccountId: input.adAccountId,
    name: input.campaignName,
  })

  const adset = await createWhatsAppAdSet({
    adAccountId: input.adAccountId,
    campaignId: campaign.id,
    name: `${input.campaignName} — ad set`,
    dailyBudgetPkr: input.dailyBudgetPkr,
    facebookPageId: input.facebookPageId,
    countryCode: input.countryCode,
    ageMin: input.ageMin,
  })

  const creative = await createWhatsAppAdCreative({
    adAccountId: input.adAccountId,
    facebookPageId: input.facebookPageId,
    instagramActorId: input.instagramActorId ?? null,
    imageHash: image.hash,
    headline: input.headline,
    primaryText: input.primaryText,
    whatsappPhoneE164: input.whatsappPhoneE164,
    whatsappPrefillMessage: input.whatsappPrefillMessage,
    name: `${input.campaignName} — creative`,
  })

  const ad = await createAd({
    adAccountId: input.adAccountId,
    name: `${input.campaignName} — ad`,
    adsetId: adset.id,
    creativeId: creative.id,
  })

  return {
    campaignId: campaign.id,
    adsetId: adset.id,
    creativeId: creative.id,
    adId: ad.id,
    imageHash: image.hash,
  }
}

export async function updateAdStatus(adId: string, status: 'ACTIVE' | 'PAUSED' | 'ARCHIVED') {
  return metaFetch<{ success: boolean }>(`/${adId}`, {
    method: 'POST',
    body: { status },
  })
}

export async function updateCampaignStatus(
  campaignId: string,
  status: 'ACTIVE' | 'PAUSED' | 'ARCHIVED',
) {
  return metaFetch<{ success: boolean }>(`/${campaignId}`, {
    method: 'POST',
    body: { status },
  })
}
