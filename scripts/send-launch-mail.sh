#!/usr/bin/env bash
set -euo pipefail

# send-launch-mail 함수를 모드별로 호출하는 스크립트.
#
# 사용법:
#   ./scripts/send-launch-mail.sh dry_run
#   ./scripts/send-launch-mail.sh test someone@example.com
#   ./scripts/send-launch-mail.sh send
#
# 필요한 환경 변수 (scripts/.env 파일에 둬도 된다. .env는 .gitignore 처리돼 있다):
#   ADMIN_SECRET           supabase secrets set ADMIN_SECRET=... 과 같은 값
#   SUPABASE_FUNCTIONS_URL 예: https://<project-ref>.supabase.co/functions/v1

mode="${1:-}"
to="${2:-}"

if [[ -z "$mode" ]]; then
  echo "사용법: $0 <dry_run|test|send> [test 모드일 때 받는 사람 이메일]" >&2
  exit 1
fi

if [[ "$mode" != "dry_run" && "$mode" != "test" && "$mode" != "send" ]]; then
  echo "mode는 dry_run / test / send 중 하나여야 해요." >&2
  exit 1
fi

if [[ "$mode" == "test" && -z "$to" ]]; then
  echo "test 모드는 받는 사람 이메일이 필요해요: $0 test someone@example.com" >&2
  exit 1
fi

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
env_file="$script_dir/.env"
if [[ -f "$env_file" ]]; then
  # shellcheck disable=SC1090
  source "$env_file"
fi

: "${ADMIN_SECRET:?ADMIN_SECRET 환경 변수가 필요해요}"
: "${SUPABASE_FUNCTIONS_URL:?SUPABASE_FUNCTIONS_URL 환경 변수가 필요해요 (예: https://<project-ref>.supabase.co/functions/v1)}"

if [[ "$mode" == "send" ]]; then
  echo "실제 발송이에요. sent_at이 비어 있는 모든 사람에게 메일이 나가요."
  read -r -p "계속하려면 SEND 를 입력하세요: " confirm
  if [[ "$confirm" != "SEND" ]]; then
    echo "취소했어요."
    exit 1
  fi
fi

json_escape() {
  local s=$1
  s=${s//\\/\\\\}
  s=${s//\"/\\\"}
  printf '%s' "$s"
}

body="{\"mode\":\"$(json_escape "$mode")\""
if [[ "$mode" == "test" ]]; then
  body="$body,\"to\":\"$(json_escape "$to")\""
fi
body="$body}"

echo "-> $mode 모드로 호출해요..."

curl -sS -w "\n(HTTP %{http_code})\n" \
  -X POST "$SUPABASE_FUNCTIONS_URL/send-launch-mail" \
  -H "x-admin-secret: $ADMIN_SECRET" \
  -H "Content-Type: application/json" \
  -d "$body"
