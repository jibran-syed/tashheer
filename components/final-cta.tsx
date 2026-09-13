"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export function FinalCta() {
  const { copy, isUrdu } = useLanguage();
  const t = copy.finalCta;

  return (
    <section id="final-cta" className="bg-white pb-16 pt-2 sm:pb-20 sm:pt-4 lg:pb-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 xl:px-0">
        <div className="relative overflow-hidden rounded-[28px] bg-soft px-6 py-12 text-center sm:rounded-[36px] sm:px-12 sm:py-16">
          <div className="absolute -right-24 -top-32 size-72 rounded-full bg-brand-purple/15 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-32 -left-16 size-72 rounded-full bg-brand-orange/20 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto max-w-2xl">
            <span className="brand-gradient mx-auto grid size-12 place-items-center rounded-2xl text-lg font-black text-white shadow-lg" aria-hidden="true">↗</span>
            <h2 className="mt-6 text-4xl font-medium leading-[1.08] tracking-[-0.02em] text-foreground sm:text-5xl">{t.title}</h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg">{t.description}</p>
            <Link
              href="/dashboard/create"
              className="brand-button-shadow mt-7 inline-flex min-h-14 items-center justify-center rounded-full bg-brand-orange px-8 py-4 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:brightness-95"
            >
              {t.button} <span className="ms-2" aria-hidden="true">{isUrdu ? "←" : "→"}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
