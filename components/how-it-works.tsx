"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

const stepStyles = [
  "bg-brand-orange text-white",
  "bg-brand-purple text-white",
  "bg-brand-magenta text-white",
  "bg-foreground text-white",
];

export function HowItWorks() {
  const { copy, isUrdu } = useLanguage();
  const t = copy.how;

  return (
    <section id="how-it-works" className="bg-soft py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 xl:px-0">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand-orange">{t.eyebrow}</span>
          <h2 className="mt-4 text-4xl font-medium leading-[1.08] tracking-[-0.025em] text-foreground sm:text-5xl">
            {t.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            {t.description}
          </p>
        </div>

        <div className="relative mt-10 sm:mt-12">
          <div className="process-flow-line absolute inset-x-[9%] top-1/2 hidden h-0.5 -translate-y-1/2 lg:block" aria-hidden="true" />

          <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {t.steps.map((step, index) => (
              <article
                key={step[0]}
                className="process-circle relative mx-auto flex aspect-square w-full max-w-[290px] flex-col items-center justify-center rounded-full border border-foreground/[0.09] bg-white px-8 text-center shadow-[0_20px_50px_rgba(11,15,23,0.07)]"
                style={{ "--process-delay": `${index * 0.7}s` } as CSSProperties}
              >
                <div
                  className={`process-number grid size-16 place-items-center rounded-full text-lg font-bold shadow-lg ${stepStyles[index]}`}
                  aria-label={`${index + 1}`}
                >
                  {index + 1}
                </div>
                <h3 className="mt-5 text-xl font-semibold leading-tight tracking-[-0.015em] text-foreground">{step[0]}</h3>
                <p className="mt-3 max-w-[210px] text-sm leading-6 text-muted">{step[1]}</p>
                <p className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-brand-purple">
                  <span className="grid size-4 place-items-center rounded-full bg-brand-purple text-[9px] text-white" aria-hidden="true">✓</span>
                  {t.visuals[index]}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center sm:mt-12">
          <Link
            href="/dashboard/create"
            className="brand-button-shadow inline-flex min-h-14 w-full max-w-sm items-center justify-center rounded-full bg-brand-orange px-10 py-4 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:brightness-95 sm:min-h-16 sm:px-14 sm:text-lg"
          >
            {t.cta}
            <span className="ms-3" aria-hidden="true">{isUrdu ? "←" : "→"}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
