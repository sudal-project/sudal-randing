# 신청 · 출시 메일 · 수신 거부

## 전체 흐름
```
[방문자] 폼 제출
   → app/actions.ts (Server Action, anon 키)
   → waitlist 테이블 insert  ── RLS: anon은 insert만, 목록 조회 불가

[관리자] 출시 날 함수 호출 (x-admin-secret 헤더)
   → supabase/functions/send-launch-mail (service_role 키)
   → sent_at is null 인 사람 조회 → Resend로 발송 → sent_at 기록

[수신자] 메일 속 "수신 거부" 클릭
   → 사이트 /api/unsubscribe?token=... (발신 도메인 SITE_URL과 링크 도메인을 맞춰 스팸 필터 회피)
   → supabase/functions/unsubscribe 호출 → 해당 행 삭제 → 사이트 /unsubscribed 로 이동
```

## 테이블 `waitlist`
| 컬럼 | 설명 |
|---|---|
| id | 자동 번호 |
| email | 소문자로 저장. lower(email) 고유 |
| os | 'windows' / 'macos' / null |
| beta | 출시 전 테스트 참여 의향 |
| source | 'hero' / 'footer' (어느 폼에서 신청했는지) |
| created_at | 신청 시각 |
| sent_at | 출시 메일 보낸 시각. null이면 아직 안 보냄 |
| unsubscribe_token | 수신 거부 링크용 uuid. 자동 생성 |

방문자(anon)는 email, os, beta, source만 넣을 수 있다.

## 신청 저장 (`app/actions.ts`)
- 숨은 칸(website)에 값이 있으면 봇으로 보고 저장하지 않음 → `{ status: "ignored" }` (화면에 메시지 없이 조용히 무시)
- zod로 검증: 이메일 형식, 동의 체크, os 값
- 성공 → `{ status: "ok" }`
- Postgres 고유 제약 위반(23505) → `{ status: "duplicate" }` → "이미 신청하신 이메일이에요."
- 그 밖의 오류(검증 실패 포함) → `{ status: "error" }` → "신청을 저장하지 못했어요. 잠시 뒤 다시 눌러 주세요."

## 발송 함수 `send-launch-mail`
요청: `POST`, 헤더 `x-admin-secret: <ADMIN_SECRET>`, 본문 JSON

| mode | 동작 |
|---|---|
| `dry_run` (기본) | 발송하지 않고 대상 인원수만 반환 |
| `test` | `to`로 지정한 주소 한 곳에만 실제 메일 1통 (sent_at 기록 안 함) |
| `send` | 실제 발송. `sent_at is null`인 사람만, 보낸 즉시 sent_at 기록 |

- 한 번에 묶음 단위로 보내고, 실패한 주소는 sent_at을 남기지 않아 다시 실행하면 재시도된다.
- 응답 예: `{ "mode": "send", "targets": 120, "sent": 118, "failed": 2 }`
- 헤더가 틀리면 401. 비밀값은 코드에 적지 않는다.

필요한 secrets (`supabase secrets set`)
- `RESEND_API_KEY`
- `ADMIN_SECRET` (길고 무작위인 값)
- `MAIL_FROM` (예: `수달공방 <hello@내도메인>`)
- `SITE_URL` (예: `https://내도메인`)
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`는 Supabase가 함수 환경에 자동으로 넣어준다.

## 수신 거부 함수 `unsubscribe`
- `GET ?token=<uuid>` → 해당 행 삭제 → `SITE_URL/unsubscribed`로 302
- `POST ?token=<uuid>` → 해당 행 삭제 → 빈 응답 200 (메일 클라이언트의 원클릭 수신 거부, List-Unsubscribe-Post용)
- 토큰이 없거나 틀려도 같은 결과를 보낸다 (가입 여부를 드러내지 않음).
- 이 함수는 JWT 검증 없이 공개로 배포한다.
- 메일 속 링크는 이 함수를 직접 가리키지 않고 `app/api/unsubscribe`(Next.js)를 거친다. 발신 도메인(SITE_URL)과 메일 속 링크 도메인이 다르면 스팸 필터가 의심하기 때문.

## 출시 메일 내용
- 제목 예: "수달공방이 출시됐어요"
- 본문: 한 줄 소개, 다운로드 링크(Windows / macOS), 신청해 줘서 고맙다는 말
- 맨 아래: 왜 이 메일을 받았는지 + 수신 거부 링크
- 테스트 참여 의향(beta=true)인 사람에게 다른 문구를 보낼지는 출시 전에 정한다.

## 출시 날 순서
1. Supabase Table Editor에서 목록 확인 (필요하면 CSV 백업)
2. `dry_run`으로 인원수 확인
3. `test`로 내 메일에 한 통 받아서 확인 (스팸함, 링크, 모바일 화면)
4. `send` 실행 → 결과 숫자 확인. 실패가 있으면 한 번 더 `send`
5. 동의서 내용대로 목록 파기: `delete from public.waitlist where sent_at is not null;`

## 발송 전에 준비할 것
- 보내는 도메인 인증(SPF, DKIM)을 Resend에서 설정. 안 하면 스팸함으로 가기 쉽다.
- 동의서의 보유 기간 문구가 실제 운영과 맞는지 확인. 테스트 참여자에게 출시 뒤에도 연락할 계획이면 문구를 먼저 바꾼다.
