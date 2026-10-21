# 수달공방 랜딩 페이지

수달공방(Otter Workshop) 출시 알림 신청 페이지. Next.js + Supabase + Vercel.

## 처음 시작
1. `CLAUDE.md`와 `docs/` 문서를 확인해요.
2. Claude Code에서 "docs/PLAN.md 1번부터 진행해줘"라고 시키면 단계별로 만들어요.
3. 디자인과 동작의 기준은 `docs/reference/prototype/index.html`이에요. 브라우저로 열어 보세요.

## 환경 변수
`.env.example`을 `.env.local`로 복사하고 값을 채워요.

| 이름 | 어디에 | 값 |
|---|---|---|
| SUPABASE_URL | Vercel, .env.local | Supabase Project URL |
| SUPABASE_ANON_KEY | Vercel, .env.local | anon(또는 publishable) 키 |

메일 발송용 비밀값(RESEND_API_KEY, ADMIN_SECRET 등)은 Next.js가 아니라 `supabase secrets set`으로 넣어요. 자세한 내용은 `docs/MAILING.md`에 있어요.

## 신청자 보기
Supabase 대시보드 → Table Editor → `waitlist`

## 출시 메일 보내기
`docs/MAILING.md`의 "출시 날 순서"를 따라요. 항상 `dry_run` → `test` → `send` 순서로 해요.
