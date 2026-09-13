import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { LoginForm } from '@/components/auth/login-form'
import { LanguageToggle } from '@/components/language-toggle'
import { getCurrentUser } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Sign in | Tashheer.pk',
  description: 'Sign in to your Tashheer account.',
}

export default async function LoginPage({
  searchParams,
}: PageProps<'/login'>) {
  const user = await getCurrentUser()
  if (user) redirect('/dashboard')

  const params = await searchParams
  const raw = params?.error
  const urlError = typeof raw === 'string' ? raw : Array.isArray(raw) ? raw[0] : undefined

  return (
    <main className="relative min-h-dvh bg-[var(--background)]">
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/brand/tashheer-logo.png"
            alt="Tashheer.pk"
            width={130}
            height={32}
            priority
            style={{ width: 'auto', height: '2rem' }}
          />
        </Link>
        <LanguageToggle />
      </div>

      <div className="mx-auto flex min-h-dvh max-w-md items-center justify-center px-6 py-24">
        <div className="w-full">
          <LoginForm urlError={urlError} />
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-soft transition hover:text-foreground">
              &larr; Back to Tashheer.pk
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
