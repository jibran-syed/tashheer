'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export type SignInState =
  | { status: 'idle' }
  | { status: 'sent'; email: string }
  | { status: 'error'; message: string }

export type VerifyState = { status: 'idle' } | { status: 'error'; message: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function sendMagicLink(
  _prev: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const rawEmail = formData.get('email')
  if (typeof rawEmail !== 'string' || !rawEmail.trim()) {
    return { status: 'error', message: 'Please enter your email.' }
  }
  const email = rawEmail.trim().toLowerCase()

  if (!EMAIL_RE.test(email)) {
    return { status: 'error', message: 'That does not look like a valid email.' }
  }

  const supabase = await createSupabaseServerClient()

  const hdrs = await headers()
  const origin =
    process.env.NEXT_PUBLIC_APP_URL ||
    `${hdrs.get('x-forwarded-proto') ?? 'http'}://${hdrs.get('host') ?? 'localhost:3000'}`

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    return { status: 'error', message: error.message }
  }

  return { status: 'sent', email }
}

export async function verifyOtp(_prev: VerifyState, formData: FormData): Promise<VerifyState> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const token = String(formData.get('token') ?? '').replace(/\s+/g, '')

  if (!EMAIL_RE.test(email)) {
    return { status: 'error', message: 'Missing or invalid email.' }
  }
  if (!/^\d{6}$/.test(token)) {
    return { status: 'error', message: 'Enter the 6-digit code from your email.' }
  }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.verifyOtp({ email, token, type: 'email' })

  if (error) {
    return { status: 'error', message: error.message }
  }

  const { data: { user } } = await supabase.auth.getUser()
  let destination = '/dashboard'
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single<{ role: 'admin' | 'client' }>()
    if (profile?.role === 'admin') destination = '/admin'
  }
  redirect(destination)
}
