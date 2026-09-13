'use client'

import { useActionState } from 'react'
import { useLanguage } from '@/components/language-provider'
import { sendMagicLink, type SignInState } from '@/app/login/actions'

const initialState: SignInState = { status: 'idle' }

const copy = {
  en: {
    heading: 'Sign in to Tashheer',
    sub: 'Enter your email and we’ll send a magic link. No password needed.',
    emailLabel: 'Email',
    emailPlaceholder: 'you@example.com',
    submit: 'Send magic link',
    submitting: 'Sending…',
    sentTitle: 'Check your email',
    sentBody: 'We sent a magic link to',
    sentHint: 'Click the link on this device to sign in.',
    sendAgain: 'Use a different email',
    back: '← Back to Tashheer.pk',
  },
  ur: {
    heading: 'Tashheer mein sign in karein',
    sub: 'Apna email likhein, hum aik magic link bhej dein ge. Password ki zaroorat nahi.',
    emailLabel: 'Email',
    emailPlaceholder: 'aap@example.com',
    submit: 'Magic link bhejein',
    submitting: 'Bhej rahay hain…',
    sentTitle: 'Apna email check karein',
    sentBody: 'Hum ne magic link bhej di hai:',
    sentHint: 'Sign in ke liye issi device par link kholein.',
    sendAgain: 'Doosra email use karein',
    back: '← Tashheer.pk par wapas jayen',
  },
} as const

export function LoginForm() {
  const { language } = useLanguage()
  const t = copy[language]
  const [state, formAction, pending] = useActionState(sendMagicLink, initialState)

  if (state.status === 'sent') {
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
          >
            <path d="m22 6-10 7L2 6" />
            <rect x="2" y="4" width="20" height="16" rx="2" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-foreground">{t.sentTitle}</h1>
        <p className="mt-2 text-soft">
          {t.sentBody} <span className="font-medium text-foreground">{state.email}</span>
        </p>
        <p className="mt-1 text-sm text-soft">{t.sentHint}</p>
        <form action={formAction} className="mt-6">
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

      <form action={formAction} className="mt-6 space-y-4">
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

        {state.status === 'error' && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {state.message}
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--brand-orange)] px-6 py-3 font-medium text-white shadow-sm transition hover:brightness-105 disabled:opacity-70"
        >
          {pending ? t.submitting : t.submit}
        </button>
      </form>
    </div>
  )
}
