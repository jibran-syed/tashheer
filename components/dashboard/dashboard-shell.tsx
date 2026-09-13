"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/components/language-provider";

export type NavItem = readonly [label: string, href: string, icon: string];
export type NavConfig = {
  en: readonly NavItem[];
  ur: readonly NavItem[];
  ariaLabel?: { en: string; ur: string };
};

const defaultClientNav: NavConfig = {
  en: [
    ["Overview", "/dashboard", "⌂"],
    ["My Ads", "/dashboard/ads", "↗"],
    ["Create Ad", "/dashboard/create", "+"],
    ["Billing", "/dashboard/billing", "₨"],
    ["Settings", "/dashboard/settings", "⚙"],
  ],
  ur: [
    ["خلاصہ", "/dashboard", "⌂"],
    ["میرے اشتہارات", "/dashboard/ads", "↗"],
    ["اشتہار بنائیں", "/dashboard/create", "+"],
    ["بلنگ", "/dashboard/billing", "₨"],
    ["ترتیبات", "/dashboard/settings", "⚙"],
  ],
  ariaLabel: { en: "Customer dashboard", ur: "کسٹمر ڈیش بورڈ" },
};

const shellCopy = {
  en: {
    back: "Back to website",
    help: "Need help?",
    contact: "Contact support",
    previewClient: "Frontend preview — Meta connections, publishing, accounts, and payments are not live yet.",
    previewAdmin: "Admin console — Meta publishing goes live in Phase 4.",
    signOut: "Sign out",
    adminBadge: "Admin",
    switchToAdmin: "Switch to admin console →",
    viewAsCustomer: "View customer dashboard →",
  },
  ur: {
    back: "ویب سائٹ پر واپس",
    help: "مدد چاہیے؟",
    contact: "سپورٹ سے رابطہ",
    previewClient: "فرنٹ اینڈ نمونہ — میٹا کنکشن، اشاعت، اکاؤنٹس اور ادائیگی ابھی فعال نہیں۔",
    previewAdmin: "ایڈمن کنسول — Meta پبلشنگ Phase 4 میں لائیو ہو گی۔",
    signOut: "سائن آؤٹ",
    adminBadge: "ایڈمن",
    switchToAdmin: "ایڈمن کنسول پر جائیں ←",
    viewAsCustomer: "کسٹمر ڈیش بورڈ دیکھیں ←",
  },
} as const;

type ShellProps = {
  children: React.ReactNode;
  displayName?: string;
  role?: "admin" | "client";
  email?: string;
  nav?: NavConfig;
  variant?: "client" | "admin";
};

function initialsFrom(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function DashboardShell({
  children,
  displayName = "You",
  role = "client",
  email = "",
  nav,
  variant = "client",
}: ShellProps) {
  const pathname = usePathname();
  const { language } = useLanguage();
  const t = shellCopy[language];
  const initials = initialsFrom(displayName);
  const isAdmin = role === "admin";

  const navConfig = nav ?? defaultClientNav;
  const navItems = navConfig[language];
  const navAriaLabel =
    navConfig.ariaLabel?.[language] ?? (variant === "admin" ? "Admin" : "Dashboard");

  const previewLabel = variant === "admin" ? t.previewAdmin : t.previewClient;
  const rootBase = variant === "admin" ? "/admin" : "/dashboard";

  return (
    <div className="min-h-screen bg-soft lg:grid lg:grid-cols-[250px_1fr]">
      <aside className="border-b border-line bg-white lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-e">
        <div className="flex h-[74px] items-center justify-between px-5 lg:h-auto lg:px-6 lg:py-6">
          <Link href="/" aria-label="Tashheer.pk home"><Logo className="h-11 w-[118px]" /></Link>
          <div className="lg:hidden"><LanguageToggle compact /></div>
        </div>

        <nav className="flex gap-2 overflow-x-auto px-4 pb-4 lg:flex-col lg:overflow-visible lg:px-4 lg:pb-0" aria-label={navAriaLabel}>
          {navItems.map(([label, href, icon]) => {
            const active = href === rootBase ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-extrabold transition-colors ${
                  active ? "bg-foreground text-white" : "text-muted hover:bg-soft hover:text-foreground"
                }`}
              >
                <span className={`grid size-7 place-items-center rounded-lg text-sm ${active ? "bg-white/10" : "bg-foreground/5"}`} aria-hidden="true">{icon}</span>
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto hidden px-6 pb-6 pt-8 lg:block">
          <div className="rounded-2xl bg-soft p-4">
            <p className="text-xs font-extrabold text-foreground">{t.help}</p>
            <a href="mailto:hello@tashheer.pk" className="mt-2 inline-block text-xs font-bold text-brand-purple hover:text-brand-orange">{t.contact} →</a>
          </div>
          {isAdmin && variant === "client" && (
            <Link href="/admin" className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-brand-orange hover:brightness-110">
              {t.switchToAdmin}
            </Link>
          )}
          {isAdmin && variant === "admin" && (
            <Link href="/dashboard" className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-brand-orange hover:brightness-110">
              {t.viewAsCustomer}
            </Link>
          )}
          <form action="/auth/signout" method="post" className="mt-5">
            <button type="submit" className="inline-flex items-center gap-2 text-xs font-bold text-muted hover:text-foreground">
              ↩ {t.signOut}
            </button>
          </form>
          <Link href="/" className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-muted hover:text-foreground">← {t.back}</Link>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="hidden h-[74px] items-center justify-between border-b border-line bg-white px-7 lg:flex">
          <span className="rounded-full bg-brand-orange/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-brand-orange">{previewLabel}</span>
          <div className="flex items-center gap-4">
            <LanguageToggle compact />
            <div className="text-end">
              <p className="text-xs font-extrabold flex items-center justify-end gap-2">
                {displayName}
                {isAdmin && (
                  <span className="rounded-full bg-brand-orange/15 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-brand-orange">
                    {t.adminBadge}
                  </span>
                )}
              </p>
              <p className="text-[10px] text-muted">{email}</p>
            </div>
            <span className="grid size-9 place-items-center rounded-full bg-foreground text-[10px] font-black text-white">{initials}</span>
          </div>
        </header>
        <div className="border-b border-line bg-brand-orange/10 px-5 py-2.5 text-center text-[10px] font-bold text-brand-orange lg:hidden">{previewLabel}</div>
        <main className="p-5 sm:p-7 lg:p-9">{children}</main>
      </div>
    </div>
  );
}
