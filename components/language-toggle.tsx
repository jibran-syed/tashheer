"use client";

import { useLanguage } from "@/components/language-provider";

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { language, copy, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label={copy.language.label}
      className="inline-flex rounded-full border border-line bg-soft p-1"
    >
      <button
        type="button"
        aria-pressed={language === "en"}
        onClick={() => setLanguage("en")}
        className={`rounded-full px-3 py-1.5 text-xs font-extrabold transition-colors ${
          language === "en" ? "bg-foreground text-white" : "text-muted hover:text-foreground"
        } ${compact ? "min-w-10" : "min-w-11"}`}
      >
        {copy.language.english}
      </button>
      <button
        type="button"
        aria-pressed={language === "ur"}
        onClick={() => setLanguage("ur")}
        className={`rounded-full px-3 py-1.5 text-xs font-extrabold transition-colors ${
          language === "ur" ? "bg-brand-orange text-white" : "text-muted hover:text-foreground"
        } ${compact ? "min-w-12" : "min-w-14"}`}
      >
        {copy.language.urdu}
      </button>
    </div>
  );
}
