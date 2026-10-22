import { NextRequest, NextResponse } from "next/server";

// 메일 속 수신 거부 링크는 발신 도메인(SITE_URL)과 맞춰야 스팸 필터에 덜 걸린다.
// 실제 삭제 로직은 service_role 키가 필요해서 Supabase Edge Function에만 둔다.
async function forwardToUnsubscribeFunction(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const supabaseUrl = process.env.SUPABASE_URL;

  if (!supabaseUrl) {
    return new Response("서버 환경 변수가 설정되지 않았어요.", { status: 500 });
  }

  const target = new URL("/functions/v1/unsubscribe", supabaseUrl);
  if (token) {
    target.searchParams.set("token", token);
  }

  let ok: boolean;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    // Supabase 함수의 성공 응답은 GET일 땐 302라서, fetch가 그 Location(SITE_URL)을
    // 실제로 따라가 버리면 안 된다. 상태 코드만 보고 우리가 직접 판단한다.
    const res = await fetch(target, { method: req.method, signal: controller.signal, redirect: "manual" });
    clearTimeout(timeout);
    ok = res.status < 500;
  } catch {
    ok = false;
  }

  // 토큰이 없거나 틀린 건 Supabase 함수가 이미 같은 결과(200/302)로 처리한다.
  // 여기서 ok가 false인 건 네트워크 오류·타임아웃·5xx 같은 진짜 인프라 실패다.
  if (!ok) {
    return new Response("수신 거부 처리 중 오류가 발생했어요. 잠시 뒤 다시 시도해 주세요.", { status: 502 });
  }

  if (req.method === "POST") {
    // 메일 클라이언트의 원클릭 수신 거부(List-Unsubscribe-Post)는 화면 이동 없이 빈 응답만 기대한다.
    return new Response(null, { status: 200 });
  }

  return NextResponse.redirect(new URL("/unsubscribed", req.url));
}

export const GET = forwardToUnsubscribeFunction;
export const POST = forwardToUnsubscribeFunction;
