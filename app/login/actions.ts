'use server'

import { headers } from 'next/headers'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export type SignInState =
  | { status: 'idle' }
  | { status: 'sent'; email: string }
  | { status: 'error'; message: string }

export async function sendMagicLink(
  _prev: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const rawEmail = formData.get('email')
  if (typeof rawEmail !== 'string' || !rawEmail.trim()) {
    return { status: 'error', message: 'Please enter your email.' }
  }
  const email = rawEmail.trim().toLowerCase()

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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
