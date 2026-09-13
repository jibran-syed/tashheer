import type { Metadata } from "next";
import { DashboardShell, type NavConfig } from "@/components/dashboard/dashboard-shell";
import { requireAdmin } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin | Tashheer.pk",
  description: "Tashheer admin console",
};

const adminNav: NavConfig = {
  en: [
    ["Overview", "/admin", "⌂"],
    ["Clients", "/admin/clients", "▤"],
  ],
  ur: [
    ["خلاصہ", "/admin", "⌂"],
    ["کلائنٹس", "/admin/clients", "▤"],
  ],
  ariaLabel: { en: "Admin console", ur: "ایڈمن کنسول" },
};

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const { user, profile } = await requireAdmin();
  return (
    <DashboardShell
      displayName={profile.full_name ?? user.email ?? "Admin"}
      role="admin"
      email={user.email ?? ""}
      nav={adminNav}
      variant="admin"
    >
      {children}
    </DashboardShell>
  );
}
