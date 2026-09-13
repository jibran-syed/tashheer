import { Logo } from "@/components/logo";
import type { OverlayTone, OverlayVisibility } from "@/data/image-overlays";

const toneStyles: Record<OverlayTone, string> = {
  orange: "bg-brand-orange/10 text-brand-orange",
  purple: "bg-brand-purple/10 text-brand-purple",
  magenta: "bg-brand-magenta/10 text-brand-magenta",
};

const visibilityStyles: Record<OverlayVisibility, string> = {
  always: "flex",
  tablet: "hidden sm:flex",
  desktop: "hidden lg:flex",
};

type NotificationBubbleProps = {
  title: string;
  subtitle: string;
  tone: OverlayTone;
  visibility: OverlayVisibility;
  offset?: boolean;
};

export function NotificationBubble({ title, subtitle, tone, visibility, offset = false }: NotificationBubbleProps) {
  return (
    <div
      className={`relative z-10 min-w-[136px] items-center gap-2 rounded-xl border border-white/80 bg-white/95 px-2.5 py-2 shadow-[0_16px_36px_-20px_color-mix(in_srgb,var(--tashheer-black)_55%,transparent)] backdrop-blur-md sm:min-w-[154px] sm:px-3 sm:py-2.5 ${visibilityStyles[visibility]} ${offset ? "translate-x-3" : ""}`}
    >
      <span className={`grid size-7 shrink-0 place-items-center rounded-lg ${toneStyles[tone]}`}>
        <Logo compact className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="block whitespace-nowrap text-[10px] font-extrabold leading-4 text-foreground sm:text-[11px]">{title}</span>
        <span className="block text-[8px] font-semibold leading-3 text-muted sm:text-[9px]">{subtitle}</span>
      </span>
    </div>
  );
}
