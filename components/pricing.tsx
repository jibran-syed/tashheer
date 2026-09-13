"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export function Pricing() {
  const { copy, isUrdu } = useLanguage();
  const t = copy.pricing;

  return (
    <section id="pricing" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 xl:px-0">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand-orange">{t.eyebrow}</span>
          <h2 className="mt-4 text-4xl font-medium leading-[1.08] tracking-[-0.02em] text-foreground sm:text-5xl">{t.title}</h2>
          <p className="mt-6 text-base leading-8 text-muted sm:text-lg">{t.description}</p>
        </div>

        <div className="relative mx-auto mt-12 max-w-[630px] sm:mt-16">
          <div className="brand-gradient-horizontal absolute inset-x-5 -top-3 h-10 rounded-[28px] opacity-90" aria-hidden="true" />
          <div className="mockup-shadow relative overflow-hidden rounded-[26px] border border-foreground/[0.09] bg-white p-6 sm:p-9">
            <div className="flex flex-col gap-7 border-b border-line pb-8 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold tracking-[-0.01em]">{t.plan}</h3>
                  <span className="rounded-full bg-brand-orange/10 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-brand-orange">{t.badge}</span>
                </div>
                <p className="mt-2 text-sm text-muted">{t.activeAds}</p>
              </div>
              <div className="sm:text-right">
                <div><span className="text-sm font-bold text-muted">PKR</span> <span className="text-4xl font-semibold tracking-[-0.025em]">1,499</span></div>
                <p className="mt-1 text-xs font-semibold text-muted">{t.perMonth}</p>
              </div>
            </div>

            <div className="py-8">
              <p className="text-sm font-extrabold">{t.includes}</p>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {t.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm font-semibold text-muted">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-purple/10 text-[10px] font-black text-brand-purple">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/dashboard/create"
              className="dark-button-shadow flex min-h-14 w-full items-center justify-center rounded-full bg-foreground px-7 py-4 text-base font-extrabold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-orange"
            >
              {t.create} <span className="ms-2" aria-hidden="true">{isUrdu ? "←" : "→"}</span>
            </Link>

            <div className="mt-5 flex items-start gap-3 rounded-2xl bg-soft p-4 text-xs leading-5 text-muted">
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-white font-black text-brand-purple">i</span>
              <span><strong className="text-foreground">{t.metaSpend}</strong> {t.control}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
