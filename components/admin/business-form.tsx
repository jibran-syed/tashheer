"use client";

import { useActionState } from "react";
import Link from "next/link";

export type BusinessFormValues = {
  name?: string | null;
  urdu_name?: string | null;
  contact_name?: string | null;
  whatsapp?: string | null;
  city?: string | null;
  facebook_page_id?: string | null;
  instagram_business_account_id?: string | null;
  meta_ad_account_id?: string | null;
  meta_partner_status?: "pending" | "granted" | "revoked" | null;
  status?: "active" | "paused" | "archived" | null;
  notes?: string | null;
};

export type BusinessFormState =
  | { status: "idle" }
  | { status: "saved" }
  | { status: "error"; message: string; values?: BusinessFormValues };

type Props = {
  action: (state: BusinessFormState, formData: FormData) => Promise<BusinessFormState>;
  initial?: BusinessFormValues;
  submitLabel: string;
  cancelHref: string;
  mode: "create" | "edit";
  hiddenFields?: Record<string, string>;
  savedNotice?: string;
};

const initialState: BusinessFormState = { status: "idle" };

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-sm font-semibold text-foreground">{label}</span>
        {hint && <span className="text-[11px] text-muted">{hint}</span>}
      </div>
      {children}
    </label>
  );
}

const inputCls =
  "block w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-foreground shadow-sm outline-none placeholder:text-soft/60 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20";

export function BusinessForm({ action, initial, submitLabel, cancelHref, mode, hiddenFields, savedNotice }: Props) {
  const [state, formAction, pending] = useActionState(action, initialState);

  const v = { ...initial, ...(state.status === "error" ? state.values : {}) };

  return (
    <form action={formAction} className="space-y-8">
      {hiddenFields &&
        Object.entries(hiddenFields).map(([k, val]) => (
          <input key={k} type="hidden" name={k} value={val} />
        ))}
      {state.status === "saved" && savedNotice && mode === "edit" && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {savedNotice}
        </div>
      )}
      <section className="space-y-4 rounded-2xl border border-line bg-white p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted">Business</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Business name" hint="Required">
            <input name="name" required defaultValue={v.name ?? ""} placeholder="Lahore Bakes" className={inputCls} />
          </Field>
          <Field label="Urdu name" hint="Optional">
            <input name="urdu_name" defaultValue={v.urdu_name ?? ""} placeholder="لاہور بیکس" className={inputCls} />
          </Field>
          <Field label="Contact person">
            <input name="contact_name" defaultValue={v.contact_name ?? ""} placeholder="Ahmed Khan" className={inputCls} />
          </Field>
          <Field label="WhatsApp number" hint="+92 …">
            <input name="whatsapp" defaultValue={v.whatsapp ?? ""} placeholder="+923001234567" className={inputCls} />
          </Field>
          <Field label="City">
            <input name="city" defaultValue={v.city ?? ""} placeholder="Lahore" className={inputCls} />
          </Field>
          {mode === "edit" && (
            <Field label="Status">
              <select name="status" defaultValue={v.status ?? "active"} className={inputCls}>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="archived">Archived</option>
              </select>
            </Field>
          )}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-line bg-white p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted">Meta connection</h2>
        <p className="text-xs text-soft">
          Client keeps their own ad account and card. Ask them to add Tashheer's Business Manager as a Partner on their Facebook Page and ad account, then paste the IDs here.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Facebook Page ID" hint="Numeric ID from meta.com/pages">
            <input name="facebook_page_id" defaultValue={v.facebook_page_id ?? ""} placeholder="1234567890" className={inputCls} />
          </Field>
          <Field label="Instagram business account ID" hint="Optional">
            <input
              name="instagram_business_account_id"
              defaultValue={v.instagram_business_account_id ?? ""}
              placeholder="17841400000000000"
              className={inputCls}
            />
          </Field>
          <Field label="Meta ad account ID" hint="Starts with act_">
            <input name="meta_ad_account_id" defaultValue={v.meta_ad_account_id ?? ""} placeholder="act_1234567890" className={inputCls} />
          </Field>
          <Field label="Partner access status">
            <select name="meta_partner_status" defaultValue={v.meta_partner_status ?? "pending"} className={inputCls}>
              <option value="pending">Pending</option>
              <option value="granted">Granted</option>
              <option value="revoked">Revoked</option>
            </select>
          </Field>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-line bg-white p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted">Internal notes</h2>
        <Field label="Notes" hint="Only visible to admins">
          <textarea
            name="notes"
            defaultValue={v.notes ?? ""}
            rows={4}
            placeholder="Onboarding call scheduled Monday. Payment method: JazzCash card ending 1234."
            className={inputCls}
          />
        </Field>
      </section>

      {state.status === "error" && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{state.message}</div>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
        <Link href={cancelHref} className="rounded-full px-5 py-2.5 text-sm font-semibold text-muted hover:text-foreground">
          Cancel
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 disabled:opacity-70"
        >
          {pending ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
