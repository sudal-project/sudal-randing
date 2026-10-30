"use client";

import { useState } from "react";
import { launch, signupForm } from "@/lib/content";
import DoneCard from "./DoneCard";
import SignupForm, { type Done } from "./SignupForm";
import board from "./board.module.css";

/** 첫 화면 오른쪽의 나무 게시판 신청 상자. 처음부터 전체 폼을 펼쳐 둔다. */
export default function HeroSignup() {
  const [done, setDone] = useState<{ done: Done; email: string } | null>(null);

  return (
    <div className={`${board.box} ${board.inHero}`}>
      <img className={board.peek} src={launch.peek} alt="" />
      <div className={board.sign}>{launch.sign}</div>
      {done ? (
        done.done === "ok" ? (
          <DoneCard title={signupForm.doneTitle} text={signupForm.doneText(done.email)} />
        ) : (
          <DoneCard title={signupForm.duplicateTitle} text={signupForm.duplicateText} />
        )
      ) : (
        <SignupForm onDone={(d, email) => setDone({ done: d, email })} />
      )}
    </div>
  );
}
