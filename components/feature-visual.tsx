import Image from "next/image";

export type FeatureVisualKind = "creative" | "model" | "budget" | "updates";

type FeatureVisualProps = {
  kind: FeatureVisualKind;
  alt: string;
};

const visualImages: Record<FeatureVisualKind, { src: string; position: string }> = {
  creative: {
    src: "/images/tashheer-feature-photo-to-ad.png",
    position: "object-center",
  },
  model: {
    src: "/images/tashheer-feature-ai-model.png",
    position: "object-center",
  },
  budget: {
    src: "/images/tashheer-feature-budget.png",
    position: "object-center",
  },
  updates: {
    src: "/images/tashheer-feature-live-results.png",
    position: "object-[38%_center]",
  },
};

export function FeatureVisual({ kind, alt }: FeatureVisualProps) {
  const image = visualImages[kind];

  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-soft">
      <Image
        src={image.src}
        alt={alt}
        fill
        sizes="(min-width: 640px) 360px, 86vw"
        className={`object-cover ${image.position}`}
      />
    </div>
  );
}
