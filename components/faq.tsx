"use client";

import { useLanguage } from "@/components/language-provider";

export function Faq() {
  const { copy } = useLanguage();
  const t = copy.faq;

  return (
    <section id="faq" className="border-t border-line bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="faq-heading">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 sm:px-8 lg:grid-cols-[.78fr_1.22fr] lg:gap-16 xl:px-0">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand-magenta">{t.eyebrow}</span>
          <h2 id="faq-heading" className="mt-4 max-w-lg text-4xl font-medium leading-[1.08] tracking-[-0.02em] text-foreground sm:text-5xl">
            {t.title}
          </h2>
          <p className="mt-6 max-w-md text-base leading-8 text-muted sm:text-lg">{t.description}</p>
        </div>

        <div className="border-t border-line">
          {t.items.map((item) => (
            <details key={item[0]} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-start sm:py-7 [&::-webkit-details-marker]:hidden">
                <span className="text-lg font-semibold leading-snug tracking-[-0.01em] text-foreground sm:text-xl">{item[0]}</span>
                <span className="relative mt-1 grid size-9 shrink-0 place-items-center rounded-full border border-line bg-soft text-foreground transition-colors group-open:bg-foreground group-open:text-white" aria-hidden="true">
                  <span className="absolute h-0.5 w-3.5 rounded-full bg-current" />
                  <span className="absolute h-3.5 w-0.5 rounded-full bg-current transition-transform group-open:rotate-90" />
                </span>
              </summary>
              <p className="max-w-2xl pb-8 pe-12 text-sm leading-7 text-muted sm:pb-10 sm:text-base sm:leading-8">
                {item[1]}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
