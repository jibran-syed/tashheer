import type { Language } from "@/lib/translations";

export type OverlayTone = "orange" | "purple" | "magenta";
export type OverlayVisibility = "always" | "tablet" | "desktop";
export type BusinessImageId = "home-baker" | "boutique" | "beauty" | "shop-owner";

export type LocalizedText = Record<Language, string>;

export type ImageOverlayItem = {
  title: LocalizedText;
  subtitle: LocalizedText;
  tone: OverlayTone;
  visibility: OverlayVisibility;
};

type ImageOverlayBase = {
  src: string;
  alt: LocalizedText;
  objectClass: string;
};

export type NotificationOverlayConfig = ImageOverlayBase & {
  overlayType: "notifications";
  clusterClass: string;
  connectorClass: string;
  items: readonly ImageOverlayItem[];
};

export type ProductAdOverlayConfig = ImageOverlayBase & {
  overlayType: "product-ad";
  panelClass: string;
  product: {
    label: LocalizedText;
    name: LocalizedText;
    price: string;
    supporting: LocalizedText;
    status: LocalizedText;
    previewLabel: LocalizedText;
    cta: LocalizedText;
    photoStep: LocalizedText;
    budgetStep: LocalizedText;
    liveStep: LocalizedText;
  };
};

export type ImageOverlayConfig = NotificationOverlayConfig | ProductAdOverlayConfig;

export const imageOverlays = {
  "home-baker": {
    overlayType: "notifications",
    src: "/images/tashheer-business-home-baker.png",
    alt: {
      en: "Pakistani home baker checking customer updates while decorating a cake",
      ur: "پاکستانی ہوم بیکر کیک سجاتے ہوئے گاہکوں کی تازہ معلومات دیکھ رہی ہیں",
    },
    objectClass: "object-[47%_center]",
    clusterClass: "right-3 top-4 sm:right-5 sm:top-6",
    connectorClass: "left-5 top-[calc(100%+2px)] w-24 rotate-[132deg] sm:w-32",
    items: [
      {
        title: { en: "21 New Orders", ur: "21 نئے آرڈرز" },
        subtitle: { en: "Today", ur: "آج" },
        tone: "orange",
        visibility: "always",
      },
      {
        title: { en: "12 WhatsApp Messages", ur: "12 واٹس ایپ پیغامات" },
        subtitle: { en: "This week", ur: "اس ہفتے" },
        tone: "purple",
        visibility: "tablet",
      },
      {
        title: { en: "Ad Performing Well", ur: "اشتہار اچھی کارکردگی دکھا رہا ہے" },
        subtitle: { en: "Keep it up", ur: "جاری رکھیں" },
        tone: "magenta",
        visibility: "desktop",
      },
    ],
  },
  boutique: {
    overlayType: "product-ad",
    src: "/images/tashheer-business-boutique.png",
    alt: {
      en: "Pakistani boutique owner preparing a new clothing collection with her phone in hand",
      ur: "پاکستانی بوتیک مالکہ فون ہاتھ میں لیے نیا ملبوساتی کلیکشن تیار کر رہی ہیں",
    },
    objectClass: "object-[58%_center]",
    panelClass: "left-3 top-3 sm:left-4 sm:top-4",
    product: {
      label: { en: "Noor Boutique", ur: "نور بوتیک" },
      name: { en: "Summer Lawn Kurta", ur: "سمر لان کُرتا" },
      price: "PKR 3,490",
      supporting: {
        en: "Fresh summer lawn, ready to order.",
        ur: "نیا سمر لان، آرڈر کے لیے تیار۔",
      },
      status: { en: "Ad is live", ur: "اشتہار لائیو ہے" },
      previewLabel: { en: "Sponsored", ur: "پروموٹڈ" },
      cta: { en: "Shop now", ur: "ابھی خریدیں" },
      photoStep: { en: "Photo added", ur: "تصویر شامل" },
      budgetStep: { en: "PKR 1,000/day", ur: "PKR 1,000 روزانہ" },
      liveStep: { en: "Ad is live", ur: "اشتہار لائیو ہے" },
    },
  },
  beauty: {
    overlayType: "notifications",
    src: "/images/tashheer-business-beauty.png",
    alt: {
      en: "Pakistani salon owner reviewing new inquiries on her phone",
      ur: "پاکستانی سیلون مالکہ فون پر نئی انکوائریز دیکھ رہی ہیں",
    },
    objectClass: "object-[57%_center]",
    clusterClass: "left-3 top-4 sm:left-4 sm:top-5",
    connectorClass: "left-[72%] top-[calc(100%+2px)] w-16 rotate-[52deg] sm:w-24",
    items: [
      {
        title: { en: "5 New Bookings", ur: "5 نئی بکنگز" },
        subtitle: { en: "Today", ur: "آج" },
        tone: "orange",
        visibility: "always",
      },
      {
        title: { en: "9 WhatsApp Inquiries", ur: "9 واٹس ایپ انکوائریز" },
        subtitle: { en: "People are interested", ur: "لوگ دلچسپی لے رہے ہیں" },
        tone: "purple",
        visibility: "tablet",
      },
      {
        title: { en: "Budget on Track", ur: "بجٹ درست سمت میں" },
        subtitle: { en: "Everything looks good", ur: "سب کچھ درست ہے" },
        tone: "magenta",
        visibility: "desktop",
      },
    ],
  },
  "shop-owner": {
    overlayType: "notifications",
    src: "/images/tashheer-how-it-works-owner.png",
    alt: {
      en: "Pakistani shop owner following guided ad updates on his phone",
      ur: "پاکستانی دکاندار فون پر اشتہار کی آسان رہنمائی اور تازہ معلومات دیکھ رہے ہیں",
    },
    objectClass: "object-[55%_center]",
    clusterClass: "left-3 top-4 sm:left-5 sm:top-6",
    connectorClass: "left-[68%] top-[calc(100%+2px)] w-20 rotate-[56deg] sm:w-28",
    items: [
      {
        title: { en: "Campaign Live", ur: "اشتہار لائیو ہے" },
        subtitle: { en: "Your ad is running", ur: "آپ کا اشتہار چل رہا ہے" },
        tone: "orange",
        visibility: "always",
      },
      {
        title: { en: "14 New Orders", ur: "14 نئے آرڈرز" },
        subtitle: { en: "This week", ur: "اس ہفتے" },
        tone: "purple",
        visibility: "tablet",
      },
      {
        title: { en: "PKR 980 Spent", ur: "PKR 980 خرچ" },
        subtitle: { en: "Within budget", ur: "بجٹ کے اندر" },
        tone: "magenta",
        visibility: "desktop",
      },
    ],
  },
} as const satisfies Record<BusinessImageId, ImageOverlayConfig>;
