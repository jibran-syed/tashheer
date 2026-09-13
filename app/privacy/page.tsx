import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Tashheer.pk",
  description: "How Tashheer.pk handles and protects customer information.",
};

export default function PrivacyPage() {
  return <LegalPage type="privacy" />;
}
