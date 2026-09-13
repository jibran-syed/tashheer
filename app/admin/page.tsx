import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const supabase = await createSupabaseServerClient();

  const [{ count: total }, { count: active }, { count: paused }, { count: pendingMeta }] =
    await Promise.all([
      supabase.from("businesses").select("id", { count: "exact", head: true }),
      supabase.from("businesses").select("id", { count: "exact", head: true }).eq("status", "active"),
      supabase.from("businesses").select("id", { count: "exact", head: true }).eq("status", "paused"),
      supabase
        .from("businesses")
        .select("id", { count: "exact", head: true })
        .eq("meta_partner_status", "pending"),
    ]);

  const stats = [
    { label: "Total clients", value: total ?? 0, tint: "bg-brand-orange/10 text-brand-orange" },
    { label: "Active", value: active ?? 0, tint: "bg-emerald-50 text-emerald-700" },
    { label: "Paused", value: paused ?? 0, tint: "bg-amber-50 text-amber-700" },
    { label: "Awaiting Meta partner grant", value: pendingMeta ?? 0, tint: "bg-brand-purple/10 text-brand-purple" },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-wide text-muted">Admin Console</p>
          <h1 className="mt-1 text-2xl font-semibold text-foreground">Overview</h1>
          <p className="mt-1 text-sm text-soft">Snapshot of your Tashheer clients. Detailed spend and results roll in during Phase 6.</p>
        </div>
        <Link
          href="/admin/clients/new"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
        >
          + New client
        </Link>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-line bg-white p-5">
            <p className="text-xs font-bold text-muted">{s.label}</p>
            <p className={`mt-3 inline-flex rounded-full px-3 py-1 text-2xl font-black ${s.tint}`}>{s.value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-dashed border-line bg-white p-6">
        <p className="text-sm font-semibold text-foreground">What's next</p>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-soft">
          <li>Add your first client under <Link href="/admin/clients" className="text-brand-orange hover:underline">Clients</Link>.</li>
          <li>Do a 15-minute onboarding call: they add Tashheer's Business Manager as a Partner on their Facebook Page and ad account.</li>
          <li>Fill in their Facebook Page ID, Instagram business account ID, and Meta ad account ID on the client detail page.</li>
          <li>Once Phase 4 ships, publish their first PAUSED-first ad from the create wizard.</li>
        </ol>
      </section>
    </div>
  );
}
