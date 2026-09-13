'use client'

import Link from 'next/link'
import { useActionState, useState } from 'react'
import { publishAdAction, type PublishAdState } from '@/app/admin/clients/[id]/ads/new/actions'

const initial: PublishAdState = { status: 'idle' }

const inputCls =
  'block w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-foreground shadow-sm outline-none placeholder:text-soft/60 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20'

export function PublishAdForm({
  businessId,
  defaultWhatsapp,
  backHref,
}: {
  businessId: string
  defaultWhatsapp?: string | null
  backHref: string
}) {
  const [state, formAction, pending] = useActionState(publishAdAction, initial)
  const [preview, setPreview] = useState<string | null>(null)

  return (
    <form action={formAction} className="space-y-8" encType="multipart/form-data">
      <input type="hidden" name="business_id" value={businessId} />

      <section className="space-y-4 rounded-2xl border border-line bg-white p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted">Creative</h2>

        <label className="block">
          <span className="text-sm font-semibold text-foreground">Image</span>
          <p className="mb-2 text-xs text-soft">JPG, PNG, or WebP. Under 8 MB. Square (1:1) works best.</p>
          <input
            name="image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            required
            onChange={(e) => {
              const f = e.target.files?.[0]
              setPreview(f ? URL.createObjectURL(f) : null)
            }}
            className="block w-full text-sm text-foreground file:mr-3 file:rounded-full file:border-0 file:bg-foreground file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:brightness-110"
          />
          {preview && (
            <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Preview" className="max-h-[360px] w-full object-contain" />
            </div>
          )}
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-foreground">Headline</span>
          <p className="mb-2 text-xs text-soft">Short. Appears above the image.</p>
          <input
            name="headline"
            required
            maxLength={60}
            placeholder="Fresh cakes, delivered today"
            className={inputCls}
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-foreground">Primary text</span>
          <p className="mb-2 text-xs text-soft">The main copy. Keep it simple, warm, in Roman Urdu or English.</p>
          <textarea
            name="primary_text"
            required
            rows={4}
            maxLength={800}
            placeholder="Har celebration ke liye taza cakes. Order karein aur ghar par pahunchayein — same day delivery in Lahore."
            className={inputCls}
          />
        </label>
      </section>

      <section className="space-y-4 rounded-2xl border border-line bg-white p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted">WhatsApp destination</h2>
        <p className="text-xs text-soft">
          Clicking the ad opens WhatsApp with a new message to this number. Include country code, e.g. +923001234567.
        </p>

        <label className="block">
          <span className="text-sm font-semibold text-foreground">WhatsApp number</span>
          <input
            name="whatsapp_number"
            required
            defaultValue={defaultWhatsapp ?? ''}
            placeholder="+923001234567"
            className={inputCls}
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-foreground">Prefilled message (optional)</span>
          <p className="mb-2 text-xs text-soft">Auto-fills the WhatsApp chat when a customer taps the ad.</p>
          <input
            name="prefill_message"
            maxLength={200}
            placeholder="Hi, I saw your ad on Facebook and want to order."
            className={inputCls}
          />
        </label>
      </section>

      <section className="space-y-4 rounded-2xl border border-line bg-white p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted">Budget</h2>
        <p className="text-xs text-soft">
          Daily budget in PKR. Charged to the client's Meta ad account directly. You can pause any time.
        </p>

        <label className="block">
          <span className="text-sm font-semibold text-foreground">Daily budget (PKR)</span>
          <input
            name="daily_budget_pkr"
            type="number"
            min={100}
            step={50}
            required
            defaultValue={500}
            className={inputCls}
          />
        </label>
      </section>

      {state.status === 'error' && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <p className="font-semibold">Publish failed{state.stage ? ` (${state.stage})` : ''}</p>
          <p className="mt-1">{state.message}</p>
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 rounded-2xl border border-dashed border-line bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-soft">
          Your ad is published to Meta as <span className="font-bold text-foreground">PAUSED</span>. Review it in the next screen before activating.
        </div>
        <div className="flex items-center gap-3">
          <Link href={backHref} className="text-sm font-semibold text-muted hover:text-foreground">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 disabled:opacity-70"
          >
            {pending ? 'Publishing to Meta…' : 'Publish (PAUSED)'}
          </button>
        </div>
      </div>
    </form>
  )
}
