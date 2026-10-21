-- 출시 알림 발송 추적과 수신 거부를 위한 컬럼
-- sent_at: 출시 메일을 보낸 시각. 비어 있으면 아직 안 보낸 사람.
-- unsubscribe_token: 메일 속 수신 거부 링크에 들어가는 값. 신청할 때 자동으로 만들어져요.

alter table public.waitlist
  add column if not exists sent_at timestamptz,
  add column if not exists unsubscribe_token uuid not null default gen_random_uuid();

create unique index if not exists waitlist_unsubscribe_token_unique
  on public.waitlist (unsubscribe_token);

-- 아직 안 보낸 사람을 빠르게 찾기 위한 인덱스
create index if not exists waitlist_unsent_idx
  on public.waitlist (created_at)
  where sent_at is null;

-- anon(방문자)은 여전히 insert만 가능해요.
-- sent_at, unsubscribe_token 은 방문자가 직접 채우지 못하게 막아요.
drop policy if exists "anyone can join the waitlist" on public.waitlist;
create policy "anyone can join the waitlist"
  on public.waitlist
  for insert
  to anon
  with check (
    char_length(email) between 5 and 254
    and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$'
    and (source is null or char_length(source) <= 20)
    and sent_at is null
  );

revoke insert on public.waitlist from anon;
grant insert (email, os, beta, source) on public.waitlist to anon;
