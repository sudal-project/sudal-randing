import { createClient } from "npm:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const siteUrl = Deno.env.get("SITE_URL");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!siteUrl || !supabaseUrl || !serviceRoleKey) {
    return new Response("서버 환경 변수(secrets)가 설정되지 않았어요.", { status: 500 });
  }

  const token = new URL(req.url).searchParams.get("token");

  if (token) {
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const { error } = await supabase.from("waitlist").delete().eq("unsubscribe_token", token);

    // 토큰이 uuid 형식이 아니면 22P02(invalid_text_representation)로 떨어지는데,
    // 이것도 "틀린 토큰"의 일종이라 같은 페이지로 보낸다. 그 외 오류만 진짜 DB 문제로 본다.
    if (error && error.code !== "22P02") {
      return new Response("수신 거부 처리 중 오류가 발생했어요.", { status: 500 });
    }
  }

  // 메일 클라이언트의 원클릭 수신 거부(List-Unsubscribe-Post)는 POST로 오고,
  // 화면 이동 없이 빈 응답만 기대한다 (RFC 8058).
  if (req.method === "POST") {
    return new Response(null, { status: 200 });
  }

  // 메일 속 링크를 직접 클릭한 경우. 토큰이 없거나 틀려도 가입 여부를 드러내지 않도록 같은 페이지로 보낸다.
  return Response.redirect(`${siteUrl}/unsubscribed`, 302);
});
