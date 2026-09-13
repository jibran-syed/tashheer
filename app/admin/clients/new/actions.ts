"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slug";
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
    notes: val("notes"),
  };
}

export async function createBusinessAction(
  _prev: BusinessFormState,
  formData: FormData,
): Promise<BusinessFormState> {
  await requireAdmin();
  const values = readForm(formData);

  if (!values.name) {
    return { status: "error", message: "Business name is required.", values };
  }

  const supabase = await createSupabaseServerClient();

  const baseSlug = slugify(values.name);
  let slug = baseSlug;

  for (let attempt = 0; attempt < 5; attempt++) {
    const { data, error } = await supabase
      .from("businesses")
      .insert({ ...values, slug })
      .select("id")
      .single();

    if (!error && data) {
      revalidatePath("/admin");
      revalidatePath("/admin/clients");
      redirect(`/admin/clients/${data.id}`);
    }

    if (error && error.code === "23505" && error.message.includes("slug")) {
      slug = `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`;
      continue;
    }

    return { status: "error", message: error?.message ?? "Could not create client.", values };
  }

  return { status: "error", message: "Could not generate a unique slug. Try renaming.", values };
}
