import Link from "next/link";
import { notFound } from "next/navigation";
import { BusinessForm } from "@/components/admin/business-form";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { archiveBusinessAction, unarchiveBusinessAction, updateBusinessAction } from "./actions";

export const dynamic = "force-dynamic";

type Business = {
  id: string;
  name: string;
  slug: string;
  urdu_name: string | null;
  contact_name: string | null;
  whatsapp: string | null;
  city: string | null;
  facebook_page_id: string | null;
  instagram_business_account_id: string | null;
  meta_ad_account_id: string | null;
  meta_partner_status: "pending" | "granted" | "revoked";
  status: "active" | "paused" | "archived";
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export default async function ClientDetailPage({ params }: PageProps<"/admin/clients/[id]">) {
  const { id } = await params;

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("id", id)
    .maybeSingle<Business>();

  if (error || !data) notFound();

  const b = data;
  const isArchived = b.status === "archived";

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="space-y-2">
        <Link href="/admin/clients" className="text-xs font-bold text-muted hover:text-foreground">
          ← Back to clients
        </Link>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">{b.name}</h1>
            <p className="text-xs text-muted">
              /{b.slug} · added {new Date(b.created_at).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}
            </p>
          </div>
          {!isArchived && (
            <form action={archiveBusinessAction}>
              <input type="hidden" name="id" value={b.id} />
              <button
                type="submit"
                className="rounded-full border border-line px-4 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-50"
              >
                Archive client
              </button>
            </form>
          )}
          {isArchived && (
            <form action={unarchiveBusinessAction}>
              <input type="hidden" name="id" value={b.id} />
              <button
                type="submit"
                className="rounded-full border border-line px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-soft"
              >
                Restore client
              </button>
            </form>
          )}
        </div>
      </div>

      <section className="rounded-2xl border border-dashed border-line bg-white p-5 text-xs text-soft">
        <p className="font-semibold text-foreground">Onboarding checklist</p>
        <ul className="mt-2 space-y-1">
          <li>{b.facebook_page_id ? "✓" : "○"} Facebook Page ID added</li>
          <li>{b.meta_ad_account_id ? "✓" : "○"} Ad account ID added</li>
          <li>{b.meta_partner_status === "granted" ? "✓" : "○"} Partner access granted in Meta Business Suite</li>
          <li>{b.instagram_business_account_id ? "✓" : "○"} Instagram business account linked (optional but recommended)</li>
        </ul>
      </section>

      <BusinessForm
        action={updateBusinessAction}
        initial={b}
        submitLabel="Save changes"
        cancelHref="/admin/clients"
        mode="edit"
        hiddenFields={{ id: b.id }}
        savedNotice="Saved."
      />
    </div>
  );
}
