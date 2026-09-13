'use client'

import { useActionState, useEffect, useState } from 'react'
import { useLanguage } from '@/components/language-provider'
import { sendMagicLink, verifyOtp, type SignInState, type VerifyState } from '@/app/login/actions'

const initialSend: SignInState = { status: 'idle' }
const initialVerify: VerifyState = { status: 'idle' }

const copy = {
  en: {
    heading: 'Sign in to Tashheer',
    sub: "Enter your email and we'll send a 6-digit code (and a magic link).",
    emailLabel: 'Email',
    emailPlaceholder: 'you@example.com',
    submit: 'Send code',
    submitting: 'Sending…',
    sentTitle: 'Check your email',
    sentBody: 'We sent a code to',
    codeLabel: '6-digit code',
    codePlaceholder: '123456',
    codeHint:
      'The code is the fastest way to sign in. Or click the magic link in the email — but if your inbox pre-scans links (Gmail Safe Links, Outlook), the code is more reliable.',
    verify: 'Sign in',
    verifying: 'Verifying…',
    sendAgain: 'Use a different email',
    back: '← Back to Tashheer.pk',
  },
  ur: {
    heading: 'Tashheer mein sign in karein',
    sub: 'Apna email likhein — hum 6-digit ka code (aur magic link) bhejein ge.',
    emailLabel: 'Email',
    emailPlaceholder: 'aap@example.com',
    submit: 'Code bhejein',
    submitting: 'Bhej rahay hain…',
    sentTitle: 'Apna email check karein',
    sentBody: 'Hum ne code bhej diya hai:',
    codeLabel: '6-digit code',
    codePlaceholder: '123456',
    codeHint:
      'Code sign in ka sab se aasaan tareeqa hai. Magic link bhi kaam karega, magar agar aap ka email link scan karta hai to code zyada reliable hai.',
    verify: 'Sign in karein',
    verifying: 'Verify ho raha hai…',
    sendAgain: 'Doosra email use karein',
    back: '← Tashheer.pk par wapas jayen',
  },
} as const

export function LoginForm({ urlError }: { urlError?: string }) {
  const { language } = useLanguage()
  const t = copy[language]
  const [sendState, sendAction, sending] = useActionState(sendMagicLink, initialSend)
  const [verifyState, verifyAction, verifying] = useActionState(verifyOtp, initialVerify)
  const [showUrlError, setShowUrlError] = useState(Boolean(urlError))

  useEffect(() => {
    if (sendState.status === 'sent' || verifyState.status === 'error') setShowUrlError(false)
  }, [sendState, verifyState])

  if (sendState.status === 'sent') {
    return (
      <div className="rounded-3xl border border-line bg-white p-8 shadow-sm">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-orange)]/10 text-[var(--brand-orange)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m22 6-10 7L2 6" />
            <rect x="2" y="4" width="20" height="16" rx="2" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-foreground">{t.sentTitle}</h1>
        <p className="mt-2 text-soft">
          {t.sentBody} <span className="font-medium text-foreground">{sendState.email}</span>
        </p>

        <form action={verifyAction} className="mt-6 space-y-4">
          <input type="hidden" name="email" value={sendState.email} />
          <div>
            <label htmlFor="token" className="block text-sm font-medium text-foreground">
              {t.codeLabel}
            </label>
            <input
              id="token"
              name="token"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="\d{6}"
              maxLength={6}
              required
              placeholder={t.codePlaceholder}
              className="mt-2 block w-full rounded-xl border border-line bg-white px-4 py-3 text-center text-xl tracking-[0.4em] text-foreground shadow-sm outline-none placeholder:text-soft/50 focus:border-[var(--brand-orange)] focus:ring-2 focus:ring-[var(--brand-orange)]/20"
            />
          </div>

          {verifyState.status === 'error' && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {verifyState.message}
            </div>
          )}

          <button
            type="submit"
            disabled={verifying}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--brand-orange)] px-6 py-3 font-medium text-white shadow-sm transition hover:brightness-105 disabled:opacity-70"
          >
            {verifying ? t.verifying : t.verify}
          </button>
        </form>

        <p className="mt-4 text-xs text-soft">{t.codeHint}</p>

        <form action={sendAction} className="mt-6">
          <button
            type="submit"
            name="email"
            value=""
            className="text-sm font-medium text-[var(--brand-orange)] hover:underline"
          >
            {t.sendAgain}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-line bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-semibold text-foreground">{t.heading}</h1>
      <p className="mt-2 text-soft">{t.sub}</p>

      <form action={sendAction} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground">
            {t.emailLabel}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={t.emailPlaceholder}
            className="mt-2 block w-full rounded-xl border border-line bg-white px-4 py-3 text-foreground shadow-sm outline-none placeholder:text-soft/70 focus:border-[var(--brand-orange)] focus:ring-2 focus:ring-[var(--brand-orange)]/20"
          />
        </div>

        {showUrlError && urlError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {urlError}
          </div>
        )}

        {sendState.status === 'error' && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {sendState.message}
          </div>
        )}

        <button
          type="submit"
          disabled={sending}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--brand-orange)] px-6 py-3 font-medium text-white shadow-sm transition hover:brightness-105 disabled:opacity-70"
        >
          {sending ? t.submitting : t.submit}
        </button>
      </form>
    </div>
  )
}
