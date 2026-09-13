import Image from "next/image";
import { ImageOverlayCluster } from "@/components/image-overlay-cluster";
import { ProductAdOverlay } from "@/components/product-ad-overlay";
import { imageOverlays, type BusinessImageId } from "@/data/image-overlays";
import type { Language } from "@/lib/translations";

type BusinessImageProps = {
  id: BusinessImageId;
  language: Language;
  sizes: string;
  className?: string;
};

export function BusinessImage({ id, language, sizes, className = "" }: BusinessImageProps) {
  const config = imageOverlays[id];

  return (
    <div className={`relative isolate overflow-hidden rounded-[28px] border border-foreground/[0.08] bg-soft ${className}`}>
      <Image
        src={config.src}
        alt={config.alt[language]}
        fill
        sizes={sizes}
        className={`object-cover ${config.objectClass}`}
      />
      {config.overlayType === "product-ad" ? (
        <ProductAdOverlay config={config} language={language} />
      ) : (
        <ImageOverlayCluster config={config} language={language} />
      )}
    </div>
  );
}
