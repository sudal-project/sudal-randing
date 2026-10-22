export interface WaitlistRow {
  id: number;
  email: string;
  os: "windows" | "macos" | null;
  beta: boolean;
  source: string | null;
  created_at: string;
  sent_at: string | null;
}

export type WaitlistFilter = "all" | "sent" | "unsent";

export interface WaitlistCounts {
  all: number;
  sent: number;
  unsent: number;
}

interface ListWaitlistResult {
  rows?: WaitlistRow[];
  total?: number;
  page?: number;
  pageSize?: number;
  counts?: WaitlistCounts;
  error?: string;
}

export async function callListWaitlist(params: { filter?: WaitlistFilter; page?: number }) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const adminSecret = process.env.ADMIN_SECRET;

  if (!supabaseUrl || !adminSecret) {
    throw new Error("SUPABASE_URL / ADMIN_SECRET 환경 변수가 설정되지 않았어요.");
  }

  const res = await fetch(`${supabaseUrl}/functions/v1/list-waitlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-secret": adminSecret,
    },
    body: JSON.stringify(params),
    cache: "no-store",
  });

  const data = (await res.json()) as ListWaitlistResult;
  return { ok: res.ok, data };
}
