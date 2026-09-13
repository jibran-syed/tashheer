import { NextResponse, type NextRequest } from 'next/server'
import { metaFetch } from '@/lib/meta/client'
import { MetaApiError } from '@/lib/meta/errors'
import { publishWhatsAppAd } from '@/lib/meta/publish'

export const dynamic = 'force-dynamic'

const SAMPLE_IMAGE = 'https://picsum.photos/seed/tashheer/1024/1024'

async function guard() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ ok: false, error: 'Not available in production.' }, { status: 403 })
  }
  return null
}

async function discoverAssets() {
  const bmId = process.env.META_BUSINESS_ID!
  const [ownedPages, clientPages, ownedAdAccounts, clientAdAccounts] = await Promise.all([
    metaFetch<{ data: Array<{ id: string; name: string; instagram_business_account?: { id: string } }> }>(
      `/${bmId}/owned_pages`,
      { query: { fields: 'id,name,instagram_business_account' } },
    ).catch(() => ({ data: [] })),
    metaFetch<{ data: Array<{ id: string; name: string; instagram_business_account?: { id: string } }> }>(
      `/${bmId}/client_pages`,
      { query: { fields: 'id,name,instagram_business_account' } },
    ).catch(() => ({ data: [] })),
    metaFetch<{ data: Array<{ id: string; account_id: string; name: string; currency: string; account_status: number }> }>(
      `/${bmId}/owned_ad_accounts`,
      { query: { fields: 'id,account_id,name,currency,account_status' } },
    ).catch(() => ({ data: [] })),
    metaFetch<{ data: Array<{ id: string; account_id: string; name: string; currency: string; account_status: number }> }>(
      `/${bmId}/client_ad_accounts`,
      { query: { fields: 'id,account_id,name,currency,account_status' } },
    ).catch(() => ({ data: [] })),
  ])

  return {
    pages: [...(ownedPages.data ?? []), ...(clientPages.data ?? [])],
    adAccounts: [...(ownedAdAccounts.data ?? []), ...(clientAdAccounts.data ?? [])],
    ownedPages: ownedPages.data ?? [],
    clientPages: clientPages.data ?? [],
    ownedAdAccounts: ownedAdAccounts.data ?? [],
    clientAdAccounts: clientAdAccounts.data ?? [],
  }
}

// GET = dry-run: list Pages + Ad accounts + Instagram accounts visible to the system user.
export async function GET() {
  const blocked = await guard()
  if (blocked) return blocked

  try {
    const assets = await discoverAssets()
    return NextResponse.json({
      ok: true,
      ...assets,
      hint: 'POST to this endpoint with { pageId, adAccountId, instagramActorId? } to run publishWhatsAppAd against those assets with a sample image.',
    })
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof MetaApiError ? err.userMsg ?? err.message : String(err) },
      { status: 500 },
    )
  }
}

// POST = live publish (PAUSED). Auto-picks first Page + ad account if not provided.
export async function POST(request: NextRequest) {
  const blocked = await guard()
  if (blocked) return blocked

  let body: {
    pageId?: string
    adAccountId?: string
    instagramActorId?: string
    imageUrl?: string
    whatsappNumber?: string
  } = {}
  try {
    body = await request.json()
  } catch {}

  try {
    let pageId = body.pageId
    let adAccountId = body.adAccountId
    let instagramActorId = body.instagramActorId

    if (!pageId || !adAccountId) {
      const { pages, adAccounts } = await discoverAssets()

      pageId = pageId ?? pages[0]?.id
      adAccountId = adAccountId ?? adAccounts[0]?.id
      instagramActorId = instagramActorId ?? pages[0]?.instagram_business_account?.id
    }

    if (!pageId) return NextResponse.json({ ok: false, error: 'No Facebook Page available to the system user.' }, { status: 400 })
    if (!adAccountId) return NextResponse.json({ ok: false, error: 'No ad account available to the system user.' }, { status: 400 })

    const result = await publishWhatsAppAd({
      adAccountId,
      facebookPageId: pageId,
      instagramActorId,
      imageUrl: body.imageUrl ?? SAMPLE_IMAGE,
      imageFilename: 'tashheer-test.jpg',
      campaignName: `Tashheer smoke test ${new Date().toISOString().slice(0, 16)}`,
      headline: 'Test headline — Tashheer',
      primaryText:
        'This is a Tashheer plumbing test. The ad is paused. Ignore if you see it.',
      dailyBudgetPkr: 500,
      whatsappPhoneE164: body.whatsappNumber ?? '+923001234567',
      whatsappPrefillMessage: 'Hi, I saw your test ad.',
    })

    return NextResponse.json({
      ok: true,
      usedPageId: pageId,
      usedAdAccountId: adAccountId,
      usedInstagramActorId: instagramActorId ?? null,
      result,
      note: 'Ad is PAUSED. Delete it in Meta Ads Manager or via /:campaign_id DELETE if unwanted.',
    })
  } catch (err) {
    if (err instanceof MetaApiError) {
      return NextResponse.json(
        {
          ok: false,
          error: err.userMsg ?? err.message,
          code: err.code,
          subcode: err.subcode,
          fbtraceId: err.fbtraceId,
        },
        { status: 500 },
      )
    }
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    )
  }
}
