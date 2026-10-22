import type { Metadata } from "next";
import Link from "next/link";
import { unsubscribedPage } from "@/lib/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: `수달공방 - ${unsubscribedPage.title}`,
};

export default function UnsubscribedPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <h1>{unsubscribedPage.heading}</h1>
        <p className={styles.lead}>{unsubscribedPage.lead}</p>
        <Link href={unsubscribedPage.backHref} className={styles.back}>
          {unsubscribedPage.backLabel}
        </Link>
      </div>
    </div>
  );
}
