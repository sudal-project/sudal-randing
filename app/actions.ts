"use server";

import { createWaitlistClient } from "@/lib/supabase/server";
import { parseWaitlistForm } from "@/lib/validation";

export type WaitlistResult =
  | { status: "ok" }
  | { status: "duplicate" }
  | { status: "error" }
  | { status: "ignored" };

export async function joinWaitlist(
  _prev: WaitlistResult | null,
  formData: FormData
): Promise<WaitlistResult> {
  if (formData.get("website")) {
    return { status: "ignored" };
  }

  const parsed = parseWaitlistForm(formData);
  if (!parsed.success) {
    return { status: "error" };
  }

  const { email, os, beta, source } = parsed.data;
  const supabase = createWaitlistClient();
  const { error } = await supabase.from("waitlist").insert({ email, os, beta, source });

  if (error) {
    if (error.code === "23505") {
      return { status: "duplicate" };
    }
    return { status: "error" };
  }

  return { status: "ok" };
}
