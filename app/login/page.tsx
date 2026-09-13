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

export default async function LoginPage() {
  const user = await getCurrentUser()
  if (user) redirect('/dashboard')

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
            className="h-8 w-auto"
          />
        </Link>
        <LanguageToggle />
      </div>

      <div className="mx-auto flex min-h-dvh max-w-md items-center justify-center px-6 py-24">
        <div className="w-full">
          <LoginForm />
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-soft transition hover:text-foreground"
            >
              &larr; Back to Tashheer.pk
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
