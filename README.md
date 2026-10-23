# 수달공방 랜딩 페이지

수달공방(Otter Workshop) 출시 알림 신청 페이지. Next.js + Supabase + Vercel.

## 처음 시작
1. `CLAUDE.md`와 `docs/` 문서를 확인해요.
2. Claude Code에서 "docs/PLAN.md 1번부터 진행해줘"라고 시키면 단계별로 만들어요.
3. 디자인과 동작의 기준은 `docs/reference/prototype/index.html`이에요. 그림은 `public/assets`에 있어서 실제 모습은 `npm run dev`로 확인해요.

## 명령
- `npm run dev` : 개발 서버
- `npm run build` : 프로덕션 빌드
- `npm run lint` : ESLint

## 환경 변수
`.env.example`을 `.env.local`로 복사하고 값을 채워요.

| 이름 | 어디에 | 값 |
|---|---|---|
| SUPABASE_URL | Vercel, .env.local | Supabase Project URL |
| SUPABASE_ANON_KEY | Vercel, .env.local | anon(또는 publishable) 키 |
| ADMIN_SECRET | Vercel, .env.local, Supabase secrets | `/admin` 접근(Basic Auth)과 출시 메일 함수 호출에 씀. 세 곳 모두 같은 값으로 맞춰요 |
| RELEASE_STAGE | Vercel, .env.local | 기본 `waitlist`. 출시일에 `released`로 바꿔요 |
| DOWNLOAD_URL | Vercel, .env.local | `RELEASE_STAGE=released`일 때 쓸 실제 다운로드 링크 |

메일 발송용 비밀값(RESEND_API_KEY, MAIL_FROM, SITE_URL)은 Next.js가 아니라 `supabase secrets set`으로만 넣어요. 자세한 내용은 `docs/MAILING.md`에 있어요.

## 신청자 보기 · 출시 메일 보내기
`/admin`(Basic Auth, `ADMIN_SECRET`)에서 신청자 목록 확인·테스트 발송·실제 발송을 해요.
대상 수만 먼저 확인하려면 `scripts/send-launch-mail.sh dry_run`도 같은 결과를 줘요.

순서는 `docs/MAILING.md`의 "출시 날 순서"를 따라요. 항상 `dry_run` → `test` → `send` 순서로 해요.

원본 데이터는 Supabase 대시보드 → Table Editor → `waitlist`에서도 볼 수 있어요.
