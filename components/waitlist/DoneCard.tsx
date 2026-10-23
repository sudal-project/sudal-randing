"use client";

import { useEffect, useRef } from "react";
import { signupForm } from "@/lib/content";
import styles from "./forms.module.css";

/** 제출을 마친 폼 자리에 대신 보여 주는 카드. 나타나면 포커스를 옮겨 화면 읽기 프로그램이 읽게 한다. */
export default function DoneCard({ title, text }: { title: string; text: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div ref={ref} className={styles.done} tabIndex={-1}>
      <img src={signupForm.doneImage} alt="" />
      <div>
        <b>{title}</b>
        <span>{text}</span>
      </div>
    </div>
  );
}
