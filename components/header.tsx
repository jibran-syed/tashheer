"use client";

import Link from "next/link";
import { LanguageToggle } from "@/components/language-toggle";
import { Logo } from "@/components/logo";
import { useLanguage } from "@/components/language-provider";

export function Header() {
  const { copy } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/[0.055] bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] max-w-[1200px] items-center justify-between px-5 sm:h-20 sm:px-8 xl:px-0">
        <Link href="/" aria-label="Tashheer.pk home" className="hidden sm:block">
          <Logo preload />
        </Link>
        <Link href="/" aria-label="Tashheer.pk home" className="sm:hidden">
          <Logo compact preload className="size-9" />
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <LanguageToggle compact />
          <Link
            href="/dashboard/create"
            className="dark-button-shadow whitespace-nowrap rounded-full bg-foreground px-3.5 py-3 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-orange sm:px-5 sm:text-sm"
          >
            {copy.header.create} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
