import Image from "next/image";
import type { ProductAdOverlayConfig } from "@/data/image-overlays";
import type { Language } from "@/lib/translations";

type ProductAdOverlayProps = {
  config: ProductAdOverlayConfig;
  language: Language;
};

export function ProductAdOverlay({ config, language }: ProductAdOverlayProps) {
  const product = config.product;

  return (
    <div
      className={`pointer-events-none absolute z-10 w-[188px] rounded-2xl border border-foreground/[0.08] bg-white/95 p-2.5 shadow-[0_16px_38px_rgba(10,12,22,0.16)] backdrop-blur-sm sm:w-[204px] ${config.panelClass}`}
      aria-hidden="true"
    >
      <div className="flex items-center gap-1.5">
        <span className="relative size-5 shrink-0 rounded-full bg-soft p-0.5">
          <Image src="/brand/tashheer-icon.png" alt="" fill sizes="20px" className="object-contain p-0.5" />
        </span>
        <span className="min-w-0 flex-1 leading-none">
          <span className="block truncate text-[8px] font-black text-foreground sm:text-[9px]">
            {product.label[language]}
          </span>
          <span className="mt-1 block text-[6px] font-bold text-muted sm:text-[7px]">
            {product.previewLabel[language]}
          </span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-purple/10 px-1.5 py-1 text-[6px] font-black text-brand-purple sm:text-[7px]">
          <span className="size-1 rounded-full bg-brand-purple" />
          {product.status[language]}
        </span>
      </div>

      <p className="mt-1.5 truncate text-[7px] font-semibold text-foreground sm:text-[8px]">
        {product.supporting[language]}
      </p>

      <div className="mt-1.5 flex overflow-hidden rounded-xl border border-line bg-soft">
        <span className="relative h-[54px] w-[66px] shrink-0 overflow-hidden bg-white sm:h-[58px] sm:w-[72px]">
          <Image
            src={config.src}
            alt=""
            fill
            sizes="72px"
            className="origin-[82%_42%] scale-[1.65] object-cover object-[88%_41%]"
          />
        </span>
        <span className="flex min-w-0 flex-1 flex-col justify-center px-2 py-1.5">
          <span className="truncate text-[7px] font-black leading-tight text-foreground sm:text-[8px]">
            {product.name[language]}
          </span>
          <span className="mt-1 text-[8px] font-black text-brand-orange sm:text-[9px]">
            {product.price}
          </span>
          <span className="mt-1 inline-flex w-fit rounded-full bg-foreground px-1.5 py-1 text-[6px] font-extrabold text-white">
            {product.cta[language]}
          </span>
        </span>
      </div>

      <div className="mt-1.5 grid grid-cols-3 gap-1 border-t border-line pt-1.5 text-center">
        {[product.photoStep[language], product.budgetStep[language], product.liveStep[language]].map(
          (step, index) => (
            <span key={step} className="min-w-0">
              <span
                className={`mx-auto grid size-3 place-items-center rounded-full text-[6px] font-black text-white ${
                  index === 1 ? "bg-brand-orange" : "bg-brand-purple"
                }`}
              >
                ✓
              </span>
              <span className="mt-0.5 block truncate text-[6px] font-extrabold text-muted sm:text-[7px]">
                {step}
              </span>
            </span>
          ),
        )}
      </div>
    </div>
  );
}
