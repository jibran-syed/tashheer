import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type BusinessRow = {
  id: string;
  name: string;
  slug: string;
  whatsapp: string | null;
  city: string | null;
  status: "active" | "paused" | "archived";
  meta_partner_status: "pending" | "granted" | "revoked";
  meta_ad_account_id: string | null;
  facebook_page_id: string | null;
  created_at: string;
};

const statusStyles: Record<BusinessRow["status"], string> = {
  active: "bg-emerald-50 text-emerald-700",
  paused: "bg-amber-50 text-amber-700",
  archived: "bg-slate-100 text-slate-600",
};

const metaStatusStyles: Record<BusinessRow["meta_partner_status"], string> = {
  pending: "bg-amber-50 text-amber-700",
  granted: "bg-emerald-50 text-emerald-700",
  revoked: "bg-red-50 text-red-700",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function AdminClientsPage() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("businesses")
    .select(
      "id, name, slug, whatsapp, city, status, meta_partner_status, meta_ad_account_id, facebook_page_id, created_at",
    )
    .order("created_at", { ascending: false });

  const businesses = (data ?? []) as BusinessRow[];

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-wide text-muted">Admin</p>
          <h1 className="mt-1 text-2xl font-semibold text-foreground">Clients</h1>
          <p className="mt-1 text-sm text-soft">Every business you run ads for in Tashheer.</p>
        </div>
        <Link
          href="/admin/clients/new"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
        >
          + New client
        </Link>
      </header>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          Failed to load clients: {error.message}
        </div>
      )}

      {!error && businesses.length === 0 && (
        <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center">
          <p className="text-lg font-semibold text-foreground">No clients yet</p>
          <p className="mt-1 text-sm text-soft">Add your first client to start running their ads through Tashheer.</p>
          <Link
            href="/admin/clients/new"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            + Add first client
          </Link>
        </div>
      )}

      {businesses.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-line bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-soft text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-5 py-3 text-left font-bold">Business</th>
                  <th className="px-5 py-3 text-left font-bold">City</th>
                  <th className="px-5 py-3 text-left font-bold">WhatsApp</th>
                  <th className="px-5 py-3 text-left font-bold">Status</th>
                  <th className="px-5 py-3 text-left font-bold">Meta partner</th>
                  <th className="px-5 py-3 text-left font-bold">Ad account</th>
                  <th className="px-5 py-3 text-left font-bold">Added</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {businesses.map((b) => (
                  <tr key={b.id} className="hover:bg-soft/60">
                    <td className="px-5 py-3">
                      <Link href={`/admin/clients/${b.id}`} className="font-semibold text-foreground hover:text-brand-orange">
                        {b.name}
                      </Link>
                      <p className="text-[11px] text-muted">/{b.slug}</p>
                    </td>
                    <td className="px-5 py-3 text-soft">{b.city ?? "—"}</td>
                    <td className="px-5 py-3 text-soft">{b.whatsapp ?? "—"}</td>
                    <td className="px-5 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase ${statusStyles[b.status]}`}>{b.status}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase ${metaStatusStyles[b.meta_partner_status]}`}>{b.meta_partner_status}</span>
                    </td>
                    <td className="px-5 py-3 font-mono text-[11px] text-soft">{b.meta_ad_account_id ?? "—"}</td>
                    <td className="px-5 py-3 text-soft">{formatDate(b.created_at)}</td>
                    <td className="px-5 py-3 text-right">
                      <Link href={`/admin/clients/${b.id}`} className="text-xs font-semibold text-brand-orange hover:underline">
                        Open →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
