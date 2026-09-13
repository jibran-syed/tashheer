import Image from "next/image";

type LogoProps = {
  compact?: boolean;
  preload?: boolean;
  className?: string;
};

export function Logo({ compact = false, preload = false, className = "" }: LogoProps) {
  if (compact) {
    return (
      <span className={`relative block size-10 shrink-0 ${className}`}>
        <Image
          src="/brand/tashheer-icon.png"
          alt="Tashheer.pk"
          fill
          sizes="40px"
          className="object-contain"
          preload={preload}
        />
      </span>
    );
  }

  return (
    <span className={`relative block h-12 w-32 shrink-0 sm:h-14 sm:w-[150px] ${className}`}>
      <Image
        src="/brand/tashheer-logo.png"
        alt="Tashheer.pk — Apna Ad. Khud Chalao."
        fill
        sizes="(min-width: 640px) 150px, 128px"
        className="object-contain"
        preload={preload}
      />
    </span>
  );
}
