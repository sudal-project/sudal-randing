# 수달공방 랜딩 페이지

데스크톱 공부 타이머 앱 "수달공방(Otter Workshop)"의 출시 알림 신청 페이지.
방문자가 이메일을 남기면 Supabase에 저장하고, 출시하는 날 Edge Function으로 알림 메일을 보낸다.

## 스택
- Next.js (App Router, TypeScript), Vercel 배포
- 스타일: `app/globals.css`의 CSS 변수(토큰) + 컴포넌트별 CSS Modules
- Supabase: Postgres(`waitlist` 테이블), Edge Functions(Deno)
- 메일 발송: Resend API (Edge Function에서만 호출)

## 명령
- `npm run dev` / `npm run build` / `npm run lint`
- `supabase db push` : 마이그레이션 적용
- `supabase functions deploy <이름>` : Edge Function 배포
- `supabase secrets set KEY=value` : 함수 비밀값 설정

## 폴더
- `app/` 페이지, 레이아웃, Server Action(`app/actions.ts`)
- `components/` 섹션 컴포넌트. 히어로 데모는 `components/desk/`, 자동 재생 장면은 `components/scenes/`
- `lib/` Supabase 클라이언트, 검증, 문구 데이터(`lib/content.ts`)
- `public/assets/` 이미지 (otter / house / screens)
- `supabase/migrations/` DB 정본. 테이블을 바꾸면 새 마이그레이션 파일을 추가한다. 기존 파일은 고치지 않는다.
- `supabase/functions/` Edge Functions
- `docs/` 기획·디자인·할 일. 작업 전 관련 문서를 먼저 읽는다.

## 반드시 지킬 것
1. **service_role 키는 Edge Function 안에서만 쓴다.** Next.js 코드, `.env.local`, 브라우저 어디에도 넣지 않는다.
2. Next.js는 `SUPABASE_URL`, `SUPABASE_ANON_KEY`만 쓰고, 신청 저장은 Server Action에서만 한다. `NEXT_PUBLIC_` 환경 변수는 만들지 않는다.
3. 메일을 보내는 함수는 `ADMIN_SECRET` 헤더가 맞지 않으면 401로 거절한다. 기본값은 `dry_run`(발송 없이 대상 수만 반환)이다.
4. 발송은 `sent_at is null`인 사람에게만 하고, 보낸 즉시 `sent_at`을 기록한다. 모든 메일에 수신 거부 링크를 넣는다.
5. 클라이언트 컴포넌트는 데모(`components/desk/`), 자동 재생 장면(`components/scenes/`), 신청 폼(`components/waitlist/`)만. 나머지는 서버 컴포넌트.
6. 문구는 "~해요" 체. 출시일을 약속하거나 기획서에 없는 기능을 쓰지 않는다. 문구 데이터는 `lib/content.ts`에 둔다.
7. 수달은 `public/assets/otter`의 프로젝트 그림만 쓴다. 새로 그리지 않는다.
8. 색상은 `globals.css` 토큰만 쓴다. 라이트·다크 둘 다 확인한다. `prefers-reduced-motion`이면 애니메이션을 멈춘다.

## 참고 문서
- 무엇을 말하는 페이지인지: `docs/PRODUCT.md`
- 어떻게 보이고 움직이는지: `docs/DESIGN.md`
- 신청·발송·수신 거부 동작: `docs/MAILING.md`
- 지금 할 일: `docs/PLAN.md` (끝난 항목은 체크하고, 새로 생긴 일은 추가한다)
- 디자인·동작 기준 시안: `docs/reference/prototype/index.html` (브라우저로 열어서 확인)
