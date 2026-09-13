import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export type Profile = {
  id: string
  role: 'admin' | 'client'
  full_name: string | null
  whatsapp: string | null
}

export async function getCurrentUser() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getCurrentProfile(): Promise<{
  user: NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>
  profile: Profile
} | null> {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, role, full_name, whatsapp')
    .eq('id', user.id)
    .single<Profile>()

  if (!profile) return null
  return { user, profile }
}

export async function requireAuth() {
  const result = await getCurrentProfile()
  if (!result) redirect('/login')
  return result
}

export async function requireAdmin() {
  const result = await requireAuth()
  if (result.profile.role !== 'admin') redirect('/dashboard')
  return result
}
