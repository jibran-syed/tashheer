import type { Metadata } from "next";
import type { CSSProperties } from "react";
import brandColors from "@/config/tashheer-brand-colors.json";
import { LanguageProvider } from "@/components/language-provider";
import "./globals.css";

type BrandProperties = CSSProperties & Record<`--tashheer-${string}`, string>;

const brandProperties: BrandProperties = {
  "--tashheer-orange": brandColors.colors.primaryOrange.hex,
  "--tashheer-magenta": brandColors.colors.accentMagenta.hex,
  "--tashheer-purple": brandColors.colors.secondaryPurple.hex,
  "--tashheer-black": brandColors.colors.nearBlack.hex,
  "--tashheer-white": brandColors.colors.white.hex,
  "--tashheer-gray-50": brandColors.colors.lightGray.hex,
  "--tashheer-gradient": brandColors.gradients.brandGradient,
  "--tashheer-gradient-horizontal": brandColors.gradients.brandGradientHorizontal,
};

export const metadata: Metadata = {
  title: "Tashheer.pk — Apna Ad. Khud Chalao.",
  description:
    "Run Facebook and Instagram ads without the complexity of Ads Manager. Built for Pakistani small businesses.",
  keywords: [
    "Facebook ads Pakistan",
    "Instagram ads Pakistan",
    "small business advertising",
    "Tashheer",
  ],
  metadataBase: new URL("https://tashheer.pk"),
  openGraph: {
    title: "Tashheer.pk — Apna Ad. Khud Chalao.",
    description:
      "Facebook & Instagram ads launch karein — bina Ads Manager ki complexity ke.",
    url: "https://tashheer.pk",
    siteName: "Tashheer.pk",
    locale: "en_PK",
    type: "website",
    images: [
      {
        url: "/brand/tashheer-logo.png",
        width: 2048,
        height: 768,
        alt: "Tashheer.pk — Apna Ad. Khud Chalao.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tashheer.pk — Apna Ad. Khud Chalao.",
    description:
      "Simple Facebook and Instagram advertising for Pakistani businesses.",
    images: ["/brand/tashheer-logo.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full scroll-smooth" data-scroll-behavior="smooth" style={brandProperties}>
      <body className="min-h-full antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
