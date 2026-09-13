"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export function Hero() {
  const { copy, isUrdu } = useLanguage();
  const t = copy.hero;
  const arrow = isUrdu ? "←" : "→";

  return (
    <section className="hero-glow relative isolate flex min-h-[calc(100svh-75px)] overflow-hidden sm:min-h-[calc(100svh-81px)]">
      <div className="absolute left-[6%] top-12 size-2 rounded-full bg-brand-orange/50" aria-hidden="true" />
      <div className="absolute bottom-10 left-[42%] size-3 rounded-full bg-brand-purple/25" aria-hidden="true" />

      <div className="grid w-full lg:grid-cols-[.96fr_1.04fr]" dir="ltr">
        <div
          className="order-2 flex items-center px-5 py-7 sm:px-8 sm:py-10 lg:order-1 lg:py-10 lg:pe-12 lg:ps-[max(2rem,calc((100vw-1200px)/2))]"
          dir={isUrdu ? "rtl" : "ltr"}
        >
          <div className={`relative z-10 w-full max-w-[610px] text-center ${isUrdu ? "lg:text-right" : "lg:text-left"}`}>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-orange/25 bg-white/80 px-3 py-1.5 text-[11px] font-bold text-brand-orange backdrop-blur-sm sm:px-3.5 sm:py-2 sm:text-sm">
              <span className="size-2 rounded-full bg-brand-orange" />
              {t.badge}
            </div>

            <h1 className="mt-4 text-[2.5rem] font-medium leading-[1.03] tracking-[-0.025em] text-foreground sm:mt-5 sm:text-[3.35rem] lg:text-[clamp(3.15rem,4vw,3.75rem)]">
              {t.titleOne}
              <br />
              <span className="inline-block whitespace-nowrap">
                {t.titleTwoLead}<span className="brand-gradient-text">{t.titleTwoAccent}</span>
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-[560px] text-sm font-normal leading-6 text-muted sm:text-lg sm:leading-7 lg:mx-0">
              {t.supporting}
            </p>
            <ul className="mx-auto mt-4 max-w-[520px] space-y-1.5 text-start text-xs font-medium leading-5 text-muted sm:text-sm lg:mx-0">
              {t.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5">
                  <span className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-brand-orange" aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col justify-center gap-2.5 sm:mt-7 sm:flex-row sm:gap-3 lg:justify-start">
              <Link
                href="/dashboard/create"
                className="brand-button-shadow flex min-h-12 items-center justify-center whitespace-nowrap rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:brightness-95 sm:min-h-14 sm:px-7 sm:py-4 sm:text-base"
              >
                {t.primary} <span className="ms-2" aria-hidden="true">{arrow}</span>
              </Link>
              <Link
                href="/#how-it-works"
                className="flex min-h-12 items-center justify-center whitespace-nowrap rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-foreground sm:min-h-14 sm:px-7 sm:py-4 sm:text-base"
              >
                <span className="me-2 grid size-5 place-items-center rounded-full bg-brand-purple/10 text-[9px] text-brand-purple sm:size-6 sm:text-[10px]" aria-hidden="true">▶</span>
                {t.secondary}
              </Link>
            </div>

          </div>
        </div>

        <div className="relative order-1 h-[26svh] min-h-[180px] overflow-hidden sm:h-[31svh] sm:min-h-[230px] lg:order-2 lg:h-auto lg:min-h-0">
          <Image
            src="/images/tashheer-hero-baker.png"
            alt="Pakistani home baker preparing customer orders with Tashheer performance insights"
            fill
            preload
            sizes="(max-width: 1023px) 100vw, 52vw"
            className="object-cover object-[center_43%] lg:object-[52%_center]"
          />
          <div className="absolute inset-x-0 bottom-0 h-14 bg-[linear-gradient(to_top,var(--tashheer-white),transparent)] lg:inset-y-0 lg:left-0 lg:h-auto lg:w-20 lg:bg-[linear-gradient(to_right,var(--tashheer-white),transparent)]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
