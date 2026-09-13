"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { useLanguage } from "@/components/language-provider";

export function Footer() {
  const { copy } = useLanguage();
  const t = copy.footer;

  return (
    <footer className="border-t border-line bg-soft">
      <div className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8 sm:py-12 xl:px-0">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" aria-label="Back to Tashheer.pk home" className="inline-flex items-center gap-4">
            <Logo />
            <span className="border-l border-line pl-4 text-sm font-bold text-muted" lang="ur" dir="rtl">تشہیر.pk</span>
          </Link>
          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-muted" aria-label="Footer navigation">
            <Link href="/#how-it-works" className="transition-colors hover:text-brand-orange">{t.how}</Link>
            <Link href="/#pricing" className="transition-colors hover:text-brand-orange">{t.pricing}</Link>
            <Link href="/#faq" className="transition-colors hover:text-brand-orange">{t.faq}</Link>
            <Link href="/privacy" className="transition-colors hover:text-brand-orange">{t.privacy}</Link>
            <Link href="/terms" className="transition-colors hover:text-brand-orange">{t.terms}</Link>
            <Link href="/dashboard" className="transition-colors hover:text-brand-orange">{t.dashboard}</Link>
            <a href="mailto:hello@tashheer.pk" className="transition-colors hover:text-brand-orange">{t.contact}</a>
          </nav>
        </div>

        <div className="mt-9 flex flex-col gap-3 border-t border-line pt-7 text-xs leading-5 text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Tashheer.pk. {t.rights}</p>
          <p className="max-w-xl sm:text-end">{t.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
