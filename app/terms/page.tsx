import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions | Tashheer.pk",
  description: "Terms governing use of Tashheer.pk advertising software.",
};

export default function TermsPage() {
  return <LegalPage type="terms" />;
}
