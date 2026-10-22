"use server";

import { redirect } from "next/navigation";
import { callSendLaunchMail } from "@/lib/launchMail";

function redirectWithResult(result: "ok" | "error", message: string): never {
  const params = new URLSearchParams({ result, message });
  redirect(`/admin?${params.toString()}`);
}

export async function sendTestMail(formData: FormData) {
  const to = formData.get("to");
  if (typeof to !== "string" || !to.trim()) {
    redirectWithResult("error", "받는 사람 이메일을 입력해 주세요.");
  }

  const { ok, data } = await callSendLaunchMail({ mode: "test", to: to.trim() });
  if (!ok || !data.sent) {
    redirectWithResult("error", data.error ?? "테스트 발송에 실패했어요.");
  }

  redirectWithResult("ok", `${to.trim()}로 테스트 메일을 보냈어요.`);
}

export async function sendLaunchMail(formData: FormData) {
  const confirm = formData.get("confirm");
  if (confirm !== "SEND") {
    redirectWithResult("error", "SEND를 정확히 입력해야 발송돼요.");
  }

  const { ok, data } = await callSendLaunchMail({ mode: "send" });
  if (!ok) {
    redirectWithResult("error", data.error ?? "발송에 실패했어요.");
  }

  redirectWithResult("ok", `${data.sent ?? 0}명에게 보냈어요. (실패 ${data.failed ?? 0}건)`);
}
