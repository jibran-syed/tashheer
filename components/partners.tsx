"use client";

import Image from "next/image";
import { useLanguage } from "@/components/language-provider";

type PartnerLogo = {
  name: string;
  src: string;
  className: string;
};

const technology: readonly PartnerLogo[] = [
  { name: "Meta", src: "/partners/meta.svg", className: "h-10 w-44" },
  { name: "Facebook", src: "/partners/facebook.svg", className: "h-9 w-44" },
  { name: "Instagram", src: "/partners/instagram.svg", className: "h-10 w-40" },
];

const payments: readonly PartnerLogo[] = [
  { name: "JazzCash", src: "/partners/jazzcash.svg", className: "h-16 w-24" },
  { name: "easypaisa", src: "/partners/easypaisa.png", className: "h-11 w-44" },
  { name: "Visa", src: "/partners/visa.svg", className: "h-10 w-28" },
  { name: "Mastercard", src: "/partners/mastercard.svg", className: "h-14 w-24" },
];

function PartnerRow({ items }: { items: readonly PartnerLogo[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-10 gap-y-8 sm:gap-x-12 lg:gap-x-14">
      {items.map((item) => (
        <div key={item.name} className={`relative shrink-0 ${item.className}`}>
          <Image
            src={item.src}
            alt={`${item.name} logo`}
            fill
            unoptimized
            sizes="176px"
            className="object-contain"
          />
        </div>
      ))}
    </div>
  );
}

export function Partners() {
  const { copy } = useLanguage();
  const t = copy.partners;

  return (
    <section className="border-y border-line bg-soft py-14 sm:py-16 lg:py-20" aria-labelledby="partners-heading">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 xl:px-0">
        <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand-purple">{t.eyebrow}</span>
            <h2 id="partners-heading" className="mt-4 text-4xl font-medium leading-[1.08] tracking-[-0.02em] sm:text-5xl">{t.title}</h2>
            <p className="mt-6 max-w-lg text-sm leading-7 text-muted sm:text-base">{t.description}</p>
          </div>
          <div className="space-y-7">
            <div>
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.12em] text-muted">{t.technology}</p>
              <PartnerRow items={technology} />
            </div>
            <div>
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.12em] text-muted">{t.payments}</p>
              <PartnerRow items={payments} />
            </div>
          </div>
        </div>
        <p className="mt-8 border-t border-line pt-6 text-xs leading-5 text-muted">{t.disclaimer}</p>
      </div>
    </section>
  );
}
