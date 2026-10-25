"use client";

import { useSyncExternalStore } from "react";
import { signupForm } from "@/lib/content";
import ScrollToSignup from "./ScrollToSignup";
import SignupForm from "./SignupForm";

/** 시안 비교용: ?hero=2면 아래로 가기 버튼, 아니면 펼치는 폼. 하나를 고르면 이 파일은 지운다. */
export default function HeroSignupPreview() {
  const preview = useSyncExternalStore(
    () => () => {},
    () => new URLSearchParams(window.location.search).get("hero") ?? "1",
    () => "1"
  );

  return preview === "2" ? (
    <ScrollToSignup label={signupForm.heroCta} note={signupForm.heroScrollNote} />
  ) : (
    <SignupForm variant="hero" />
  );
}
