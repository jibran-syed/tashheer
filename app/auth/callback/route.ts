import { NextResponse, type NextRequest } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const next = url.searchParams.get('next') ?? '/dashboard'

  // Supabase returns error info as query params when the OTP is expired,
  // reused, or otherwise invalid.
  const err = url.searchParams.get('error')
  const errDesc = url.searchParams.get('error_description')
  const errCode = url.searchParams.get('error_code')

  if (err || errCode) {
    const message = errDesc || err || 'Sign-in link is invalid or expired.'
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(message)}`, request.url),
    )
  }

  if (!code) {
    return NextResponse.redirect(
      new URL('/login?error=Sign-in%20link%20is%20missing%20its%20code.', request.url),
    )
  }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(error.message)}`, request.url),
    )
  }

  return NextResponse.redirect(new URL(next, request.url))
}
