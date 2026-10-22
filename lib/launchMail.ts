type LaunchMailMode = "dry_run" | "test" | "send";

interface LaunchMailResult {
  mode?: LaunchMailMode;
  targets?: number;
  to?: string;
  sent?: number;
  failed?: number;
  error?: string;
}

export async function callSendLaunchMail(body: { mode: LaunchMailMode; to?: string }) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const adminSecret = process.env.ADMIN_SECRET;

  if (!supabaseUrl || !adminSecret) {
    throw new Error("SUPABASE_URL / ADMIN_SECRET 환경 변수가 설정되지 않았어요.");
  }

  const res = await fetch(`${supabaseUrl}/functions/v1/send-launch-mail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-secret": adminSecret,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const data = (await res.json()) as LaunchMailResult;
  return { ok: res.ok, data };
}
