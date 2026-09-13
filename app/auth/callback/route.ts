import { NextResponse, type NextRequest } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

async function pickDestination(explicit: string | null): Promise<string> {
  if (explicit && explicit.startsWith('/')) return explicit
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return '/dashboard'
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single<{ role: 'admin' | 'client' }>()
  return profile?.role === 'admin' ? '/admin' : '/dashboard'
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const next = url.searchParams.get('next')

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

  const destination = await pickDestination(next)
  return NextResponse.redirect(new URL(destination, request.url))
}
