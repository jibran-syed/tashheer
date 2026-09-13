"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { BusinessFormState } from "@/components/admin/business-form";

function readForm(formData: FormData) {
  const val = (key: string) => {
    const raw = formData.get(key);
    if (typeof raw !== "string") return null;
    const trimmed = raw.trim();
    return trimmed.length > 0 ? trimmed : null;
  };
  return {
    name: val("name"),
    urdu_name: val("urdu_name"),
    contact_name: val("contact_name"),
    whatsapp: val("whatsapp"),
    city: val("city"),
    facebook_page_id: val("facebook_page_id"),
    instagram_business_account_id: val("instagram_business_account_id"),
    meta_ad_account_id: val("meta_ad_account_id"),
    meta_partner_status: (val("meta_partner_status") ?? "pending") as "pending" | "granted" | "revoked",
    status: (val("status") ?? "active") as "active" | "paused" | "archived",
    notes: val("notes"),
  };
}

export async function updateBusinessAction(
  _prev: BusinessFormState,
  formData: FormData,
): Promise<BusinessFormState> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const values = readForm(formData);

  if (!id) {
    return { status: "error", message: "Missing client id.", values };
  }
  if (!values.name) {
    return { status: "error", message: "Business name is required.", values };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("businesses")
    .update({ ...values, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    return { status: "error", message: error.message, values };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/clients");
  revalidatePath(`/admin/clients/${id}`);
  return { status: "saved" };
}

export async function archiveBusinessAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createSupabaseServerClient();
  await supabase
    .from("businesses")
    .update({ status: "archived", updated_at: new Date().toISOString() })
    .eq("id", id);

  revalidatePath("/admin");
  revalidatePath("/admin/clients");
  redirect("/admin/clients");
}

export async function unarchiveBusinessAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createSupabaseServerClient();
  await supabase
    .from("businesses")
    .update({ status: "active", updated_at: new Date().toISOString() })
    .eq("id", id);

  revalidatePath("/admin");
  revalidatePath("/admin/clients");
  revalidatePath(`/admin/clients/${id}`);
}
