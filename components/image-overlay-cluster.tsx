import { NotificationBubble } from "@/components/notification-bubble";
import type { NotificationOverlayConfig } from "@/data/image-overlays";
import type { Language } from "@/lib/translations";

type ImageOverlayClusterProps = {
  config: NotificationOverlayConfig;
  language: Language;
};

export function ImageOverlayCluster({ config, language }: ImageOverlayClusterProps) {
  return (
    <div className={`pointer-events-none absolute z-10 ${config.clusterClass}`} aria-hidden="true">
      <span className={`absolute z-0 h-px origin-left bg-brand-purple/35 ${config.connectorClass}`}>
        <span className="absolute -right-1 -top-1 size-2 rounded-full border border-brand-purple/40 bg-white" />
      </span>
      <div className="relative z-10 flex flex-col gap-1 sm:gap-1.5">
        {config.items.map((item, index) => (
          <NotificationBubble
            key={item.title.en}
            title={item.title[language]}
            subtitle={item.subtitle[language]}
            tone={item.tone}
            visibility={item.visibility}
            offset={index === 1}
          />
        ))}
      </div>
    </div>
  );
}
