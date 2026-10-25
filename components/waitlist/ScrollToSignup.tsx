"use client";

import shared from "@/components/shared.module.css";
import styles from "./forms.module.css";

/** 첫 화면 버튼. 아래 신청 상자로 내려가 이메일 칸에 바로 입력할 수 있게 포커스를 옮긴다. */
export default function ScrollToSignup({ label, note }: { label: string; note: string }) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const section = document.getElementById("launch");
    const input = document.getElementById("launchEmail");
    if (!section || !input) return; // 못 찾으면 기본 #launch 이동에 맡긴다
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    section.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    input.focus({ preventScroll: true });
  }

  return (
    <div>
      <a className={shared.btnGo} href="#launch" onClick={handleClick}>
        {label} <span aria-hidden="true">↓</span>
      </a>
      <p className={styles.jumpNote}>{note}</p>
    </div>
  );
}
