"use client";

import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import { FeatureVisual, type FeatureVisualKind } from "@/components/feature-visual";
import { useLanguage } from "@/components/language-provider";

const featureKinds: readonly FeatureVisualKind[] = [
  "creative",
  "model",
  "budget",
  "updates",
];

export function BusinessShowcase() {
  const { copy, isUrdu } = useLanguage();
  const t = copy.showcase;
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, pointerId: -1, startX: 0, startScrollLeft: 0 });

  function startDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: event.currentTarget.scrollLeft,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function continueDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag.active || drag.pointerId !== event.pointerId) return;

    event.preventDefault();
    event.currentTarget.scrollLeft = drag.startScrollLeft - (event.clientX - drag.startX);
  }

  function stopDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (!dragRef.current.active || dragRef.current.pointerId !== event.pointerId) return;

    dragRef.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="showcase-heading">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 xl:px-0">
        <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand-orange">{t.eyebrow}</span>
            <h2 id="showcase-heading" className="mt-4 text-3xl font-medium leading-[1.1] tracking-[-0.02em] text-foreground sm:text-4xl lg:text-[2.75rem]">
              {t.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">
              {t.description}
            </p>
        </div>

        <div
          ref={trackRef}
          dir="ltr"
          role="region"
          aria-label={t.eyebrow}
          aria-roledescription="carousel"
          tabIndex={0}
          onPointerDown={startDrag}
          onPointerMove={continueDrag}
          onPointerUp={stopDrag}
          onPointerCancel={stopDrag}
          onDragStart={(event) => event.preventDefault()}
          className="-mx-5 mt-10 flex cursor-grab snap-x snap-mandatory select-none gap-4 overflow-x-auto overscroll-x-contain px-5 pb-5 active:cursor-grabbing [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-purple sm:-mx-8 sm:mt-12 sm:gap-5 sm:px-8 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {featureKinds.map((kind, index) => (
            <article
              key={kind}
              dir={isUrdu ? "rtl" : "ltr"}
              className="flex w-[86vw] max-w-[360px] shrink-0 snap-start flex-col overflow-hidden rounded-[28px] border border-foreground/[0.08] bg-white shadow-[0_22px_58px_-44px_rgba(10,12,22,0.38)] sm:w-[340px] lg:w-[360px]"
            >
              <FeatureVisual kind={kind} alt={t.items[index][0]} />
              <div className="p-5 sm:p-6">
                <h3 className="text-[1.375rem] font-semibold leading-tight tracking-[-0.015em] text-foreground">
                  {t.items[index][0]}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">{t.items[index][1]}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-1 text-xs font-medium text-muted sm:hidden">{t.swipe}</p>
        <p className="mt-1 hidden text-xs font-medium text-muted sm:block">{t.drag}</p>
      </div>
    </section>
  );
}
