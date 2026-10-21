# 할 일

Claude Code에게: 위에서부터 한 단계씩 진행한다. 단계를 마치면 체크하고 커밋한다. 막히거나 정할 게 생기면 멈추고 묻는다.

## 1. 프로젝트 뼈대
- [x] Next.js(App Router, TypeScript, ESLint) 생성. Tailwind 없이 CSS Modules
- [x] `app/globals.css`에 DESIGN.md 토큰 (라이트·다크)
- [x] `app/layout.tsx`: next/font로 Jua, IBM Plex Sans KR, Silkscreen / 한국어 메타데이터
- [x] `.env.example` 확인, `.gitignore`에 `.env.local`

## 2. 정적 섹션 옮기기 (시안 기준)
- [x] `lib/content.ts`: 상태 5개, 집 5단계, 4단계 흐름, 로드맵 문구
- [x] Header, Footer
- [x] HowItWorks 01·03 (02는 3단계에서 장면으로)
- [x] PrivacyNote, Roadmap
- [x] 900px · 520px 반응형, 다크 모드 확인

## 3. 수달 데모와 자동 재생 장면
- [x] `OtterSprite.tsx`: 프로젝트 수달 그림 + 상태별 CSS 움직임 (직접 그린 수달 쓰지 않음)
- [x] `useIdleState.ts`: 입력 감지와 상태 전환 (5초 / 10초 / 0.6초)
- [x] `DeskDemo.tsx`: 타이머, 집 진행도, 마을 카운트, 안내 문구 → Hero 조립
- [x] `ScenePlayer.tsx`: 장면 + 자막 바 + 아래 단계 카드, 자동 재생·일시정지·카드 클릭 이동
- [x] `RestScene.tsx`: 대기 → 작업 → 졸림 → 잠듦 → 깜짝 놀람 (States 섹션)
- [x] `HouseScene.tsx`: 터 다지기 → 뼈대 → 벽 → 지붕 → 완성 → 마을 (HowItWorks 02)
- [x] 데스크톱 1280px 브라우저로 확인 (라이트·다크, 재생/일시정지/카드 이동 모두 동작 확인). 모바일 390px은 이 환경의 브라우저 자동화 창 크기 조절이 반영되지 않아 라이브 비교는 못 함 — 미디어쿼리는 시안 그대로 포팅

## 4. 신청 저장
- [x] Supabase 프로젝트 생성, `supabase init`, `supabase link`
- [x] `supabase db push` (마이그레이션 2개)
- [x] `lib/supabase/server.ts`, `lib/validation.ts`(zod)
- [x] `app/actions.ts`: ok / duplicate / error
- [x] `WaitlistForm` (hero / full 두 가지), `ConsentDetails`
- [x] 직접 신청해 보고 Table Editor에서 확인. 같은 이메일 두 번 → "이미 신청" 확인

## 5. 출시 메일 (Supabase Edge Functions, Vercel 배포와 무관하게 먼저 준비 가능)
- [ ] Resend 가입, 도메인 인증(SPF·DKIM)
- [ ] `supabase/functions/send-launch-mail` (dry_run / test / send)
- [ ] `supabase/functions/unsubscribe` + `app/unsubscribed/page.tsx`
- [ ] secrets 설정: RESEND_API_KEY, ADMIN_SECRET, MAIL_FROM, SITE_URL (배포 전엔 임시값, 배포 후 실제 도메인으로 교체)
- [ ] 메일 템플릿 문구 (`supabase/functions/send-launch-mail/template.ts`)
- [ ] `scripts/send-launch-mail.sh`: 모드를 골라 함수를 호출하는 스크립트
- [ ] 리허설: 내 메일 몇 개로 신청 → dry_run → test → send → 수신 거부까지

## 6. 배포 (개발 마지막 단계)
- [ ] Vercel 연결, 환경 변수 `SUPABASE_URL`, `SUPABASE_ANON_KEY`
- [ ] 도메인 연결, SITE_URL secret을 실제 도메인으로 교체
- [ ] `app/opengraph-image.png`, `app/icon.png`
- [ ] 모바일 실기기에서 화면·폼 확인
- [ ] `app/privacy/page.tsx` 개인정보 안내 전문

## 나중에
- [ ] 방문·신청 수 분석 (Vercel Analytics 등)
- [ ] 관리자 페이지 `/admin` (필요해지면)
