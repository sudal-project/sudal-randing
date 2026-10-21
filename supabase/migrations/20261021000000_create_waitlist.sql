-- 수달공방 출시 알림 신청 테이블
-- Supabase 대시보드 → SQL Editor 에 붙여넣고 Run 하세요.

create table if not exists public.waitlist (
  id          bigint generated always as identity primary key,
  email       text        not null,
  os          text        check (os in ('windows', 'macos')),
  beta        boolean     not null default false,
  source      text,
  created_at  timestamptz not null default now()
);

-- 같은 이메일은 한 번만 (대소문자 무시). 중복 신청은 409로 돌아와 페이지에서 "이미 신청" 안내가 나와요.
create unique index if not exists waitlist_email_unique on public.waitlist (lower(email));

-- 행 단위 보안: 방문자(anon)는 "추가"만 할 수 있고, 목록을 읽거나 고치거나 지울 수 없어요.
alter table public.waitlist enable row level security;

drop policy if exists "anyone can join the waitlist" on public.waitlist;
create policy "anyone can join the waitlist"
  on public.waitlist
  for insert
  to anon
  with check (
    char_length(email) between 5 and 254
    and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$'
    and (source is null or char_length(source) <= 20)
  );

grant insert on public.waitlist to anon;

-- 신청 목록 보기 (대시보드 SQL Editor에서 실행)
-- select email, os, beta, created_at from public.waitlist order by created_at;

-- 출시 알림 발송 후 파기 (동의서에 적은 보유 기간)
-- delete from public.waitlist;
