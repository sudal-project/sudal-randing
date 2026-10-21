import { demoWindow } from "@/lib/content";
import styles from "./DemoWindow.module.css";

export default function DemoWindow({ className }: { className?: string }) {
  return (
    <div className={[styles.win, className].filter(Boolean).join(" ")} aria-hidden="true">
      <div className={styles.winBar}>
        <i /> <i /> <i />
        <span>{demoWindow.titlebar}</span>
      </div>
      <div className={styles.slide}>
        <b>{demoWindow.title}</b>
        <span>{demoWindow.subtitle}</span>
        <div className={styles.stack}>
          <div style={{ height: "30%" }} />
          <div style={{ height: "55%" }} />
          <div style={{ height: "80%" }} />
          <div style={{ height: "45%" }} />
        </div>
        <div className={styles.prog}>
          <i />
        </div>
      </div>
    </div>
  );
}
