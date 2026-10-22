import { createClient } from "npm:@supabase/supabase-js@2";
import { buildLaunchMail } from "./template.ts";

type Mode = "dry_run" | "test" | "send";

interface RequestBody {
  mode?: Mode;
  to?: string;
}

// 엣지 함수 실행 시간 제한을 고려한 1회 처리 한도. 넘으면 send를 한 번 더 실행하면 나머지가 처리된다.
const SEND_BATCH_SIZE = 200;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function sendMail(params: {
  resendApiKey: string;
  from: string;
  to: string;
  subject: string;
  html: string;
  unsubscribeUrl: string;
  idempotencyKey?: string;
}): Promise<boolean> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${params.resendApiKey}`,
      "Content-Type": "application/json",
      // row id 기반 고정 키라, send를 중복 실행하거나(동시 호출) sent_at 기록이 실패해 같은 행이
      // 다음 send에서 다시 뽑혀도 Resend가 24시간 내 중복 발송을 막아준다.
      ...(params.idempotencyKey ? { "Idempotency-Key": params.idempotencyKey } : {}),
    },
    body: JSON.stringify({
      from: params.from,
      to: [params.to],
      subject: params.subject,
      html: params.html,
      headers: {
        "List-Unsubscribe": `<${params.unsubscribeUrl}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    }),
  });

  return res.ok;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return json({ error: "POST만 지원해요." }, 405);
  }

  const adminSecret = Deno.env.get("ADMIN_SECRET");
  if (!adminSecret || req.headers.get("x-admin-secret") !== adminSecret) {
    return json({ error: "unauthorized" }, 401);
  }

  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const mailFrom = Deno.env.get("MAIL_FROM");
  const siteUrl = Deno.env.get("SITE_URL");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!resendApiKey || !mailFrom || !siteUrl || !supabaseUrl || !serviceRoleKey) {
    return json({ error: "서버 환경 변수(secrets)가 설정되지 않았어요." }, 500);
  }

  let body: RequestBody = {};
  try {
    body = await req.json();
  } catch {
    // 본문 없이 호출하면 dry_run 기본값으로 처리
  }

  const mode: Mode = body.mode ?? "dry_run";
  if (mode !== "dry_run" && mode !== "test" && mode !== "send") {
    return json({ error: "mode는 dry_run / test / send 중 하나여야 해요." }, 400);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  // 발신 도메인(SITE_URL)과 링크 도메인을 맞추기 위해 사이트의 중계 경로를 거친다.
  const unsubscribeUrlFor = (token: string) => `${siteUrl}/api/unsubscribe?token=${token}`;

  if (mode === "dry_run") {
    const { count, error } = await supabase
      .from("waitlist")
      .select("id", { count: "exact", head: true })
      .is("sent_at", null);

    if (error) {
      return json({ error: error.message }, 500);
    }

    return json({ mode, targets: count ?? 0 });
  }

  if (mode === "test") {
    if (!body.to) {
      return json({ error: "test 모드는 to(수신 주소)가 필요해요." }, 400);
    }

    const { data, error: lookupError } = await supabase
      .from("waitlist")
      .select("unsubscribe_token")
      .eq("email", body.to.toLowerCase())
      .maybeSingle();

    if (lookupError) {
      return json({ error: lookupError.message }, 500);
    }

    const unsubscribeUrl = unsubscribeUrlFor(data?.unsubscribe_token ?? "test");
    const { subject, html } = buildLaunchMail({ siteUrl, unsubscribeUrl });

    const ok = await sendMail({ resendApiKey, from: mailFrom, to: body.to, subject, html, unsubscribeUrl });

    return json({ mode, to: body.to, sent: ok ? 1 : 0 }, ok ? 200 : 502);
  }

  // mode === "send"
  const { data: targets, error } = await supabase
    .from("waitlist")
    .select("id, email, unsubscribe_token")
    .is("sent_at", null)
    .limit(SEND_BATCH_SIZE);

  if (error) {
    return json({ error: error.message }, 500);
  }

  let sent = 0;
  let failed = 0;

  for (const row of targets ?? []) {
    const unsubscribeUrl = unsubscribeUrlFor(row.unsubscribe_token);
    const { subject, html } = buildLaunchMail({ siteUrl, unsubscribeUrl });

    const ok = await sendMail({
      resendApiKey,
      from: mailFrom,
      to: row.email,
      subject,
      html,
      unsubscribeUrl,
      idempotencyKey: `send-launch-mail:${row.id}`,
    });

    if (ok) {
      const { error: updateError } = await supabase
        .from("waitlist")
        .update({ sent_at: new Date().toISOString() })
        .eq("id", row.id);

      // 메일은 보냈지만 sent_at 기록에 실패하면 failed로 넣는다.
      // 다음 send에서 같은 행이 다시 뽑혀도, 위 Idempotency-Key 덕분에 24시간 내엔 실제로 두 번 나가진 않는다.
      if (updateError) {
        failed += 1;
      } else {
        sent += 1;
      }
    } else {
      failed += 1;
    }
  }

  return json({ mode, targets: targets?.length ?? 0, sent, failed });
});
