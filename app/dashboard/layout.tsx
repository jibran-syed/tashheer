import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export const metadata: Metadata = {
  title: "Customer Dashboard | Tashheer.pk",
  description: "Manage Tashheer.pk ads and understand performance in simple language.",
};

export default function CustomerDashboardLayout({ children }: LayoutProps<"/dashboard">) {
  return <DashboardShell>{children}</DashboardShell>;
}
