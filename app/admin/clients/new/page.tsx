import Link from "next/link";
import { BusinessForm } from "@/components/admin/business-form";
import { createBusinessAction } from "./actions";

export default function NewClientPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link href="/admin/clients" className="text-xs font-bold text-muted hover:text-foreground">
          ← Back to clients
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-foreground">Add a new client</h1>
        <p className="mt-1 text-sm text-soft">
          Only business name is required. You can leave Meta details blank and fill them in after the onboarding call.
        </p>
      </div>

      <BusinessForm
        action={createBusinessAction}
        submitLabel="Create client"
        cancelHref="/admin/clients"
        mode="create"
      />
    </div>
  );
}
