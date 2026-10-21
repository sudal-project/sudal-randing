import { createClient } from "@supabase/supabase-js";

export function createWaitlistClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("SUPABASE_URL / SUPABASE_ANON_KEY 환경 변수가 설정되지 않았어요.");
  }

  return createClient(url, key);
}
