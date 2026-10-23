import type { ReactNode } from "react";
import styles from "./MacFrame.module.css";

/** 앱 화면을 감싸는 창 테두리 (제목 막대 + 화면) */
export default function MacFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={styles.mac}>
      <div className={styles.bar}>
        <i className={styles.r} />
        <i className={styles.y} />
        <i className={styles.g} />
        <span>{title}</span>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
