import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { PublishAdForm } from '@/components/admin/publish-ad-form'

export const dynamic = 'force-dynamic'

export default async function NewAdPage({ params }: PageProps<'/admin/clients/[id]/ads/new'>) {
  const { id } = await params
  const supabase = await createSupabaseServerClient()
  const { data: business, error } = await supabase
    .from('businesses')
    .select('id, name, whatsapp, facebook_page_id, meta_ad_account_id')
    .eq('id', id)
    .maybeSingle()

  if (error || !business) notFound()

  const missingIds =
    !business.facebook_page_id || !business.meta_ad_account_id
      ? [
          !business.facebook_page_id && 'Facebook Page ID',
          !business.meta_ad_account_id && 'Meta ad account ID',
        ].filter(Boolean)
      : []

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link href={`/admin/clients/${id}`} className="text-xs font-bold text-muted hover:text-foreground">
          ← Back to {business.name}
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-foreground">
          Publish a WhatsApp ad for {business.name}
        </h1>
        <p className="mt-1 text-sm text-soft">
          Published to Meta in PAUSED status. You'll review it, then activate.
        </p>
      </div>

      {missingIds.length > 0 && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <p className="font-semibold">Client is missing Meta IDs</p>
          <p className="mt-1">
            Add {missingIds.join(' and ')} on the{' '}
            <Link href={`/admin/clients/${id}`} className="font-semibold underline">
              client detail page
            </Link>{' '}
            before publishing.
          </p>
        </div>
      )}

      <PublishAdForm
        businessId={business.id}
        defaultWhatsapp={business.whatsapp}
        backHref={`/admin/clients/${id}`}
      />
    </div>
  )
}
