import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { requireAuth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Dashboard | Tashheer.pk",
  description: "Manage Tashheer.pk ads and understand performance in simple language.",
};

export default async function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  const { user, profile } = await requireAuth();

  return (
    <DashboardShell
      displayName={profile.full_name ?? user.email ?? "You"}
      role={profile.role}
      email={user.email ?? ""}
    >
      {children}
    </DashboardShell>
  );
}
