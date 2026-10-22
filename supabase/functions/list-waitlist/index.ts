import { createClient } from "npm:@supabase/supabase-js@2";

type Filter = "all" | "sent" | "unsent";

const DEFAULT_PAGE_SIZE = 50;
const MAX_PAGE_SIZE = 200;

interface RequestBody {
  filter?: Filter;
  page?: number;
  pageSize?: number;
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return json({ error: "POST만 지원해요." }, 405);
  }

  const adminSecret = Deno.env.get("ADMIN_SECRET");
  if (!adminSecret || req.headers.get("x-admin-secret") !== adminSecret) {
    return json({ error: "unauthorized" }, 401);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    return json({ error: "서버 환경 변수(secrets)가 설정되지 않았어요." }, 500);
  }

  let body: RequestBody = {};
  try {
    body = await req.json();
  } catch {
    // 본문 없이 호출하면 기본값(all, 1페이지)으로 처리
  }

  const filter: Filter = body.filter === "sent" || body.filter === "unsent" ? body.filter : "all";
  const page = Math.max(1, Math.trunc(body.page ?? 1));
  const pageSize = Math.min(MAX_PAGE_SIZE, Math.max(1, Math.trunc(body.pageSize ?? DEFAULT_PAGE_SIZE)));

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  // sent/unsent 개수는 탭 배지와 "발송 대상" 수에 공통으로 쓴다. all은 둘의 합이라 따로 세지 않는다.
  const [sentCountRes, unsentCountRes] = await Promise.all([
    supabase.from("waitlist").select("id", { count: "exact", head: true }).not("sent_at", "is", null),
    supabase.from("waitlist").select("id", { count: "exact", head: true }).is("sent_at", null),
  ]);

  if (sentCountRes.error) {
    return json({ error: sentCountRes.error.message }, 500);
  }
  if (unsentCountRes.error) {
    return json({ error: unsentCountRes.error.message }, 500);
  }

  const counts = {
    sent: sentCountRes.count ?? 0,
    unsent: unsentCountRes.count ?? 0,
    all: (sentCountRes.count ?? 0) + (unsentCountRes.count ?? 0),
  };
  const total = counts[filter];

  const offset = (page - 1) * pageSize;
  let query = supabase
    .from("waitlist")
    .select("id, email, os, beta, source, created_at, sent_at")
    .order("created_at", { ascending: false })
    .range(offset, offset + pageSize - 1);

  if (filter === "sent") {
    query = query.not("sent_at", "is", null);
  } else if (filter === "unsent") {
    query = query.is("sent_at", null);
  }

  const { data, error } = await query;

  if (error) {
    return json({ error: error.message }, 500);
  }

  return json({ rows: data ?? [], total, page, pageSize, counts });
});
