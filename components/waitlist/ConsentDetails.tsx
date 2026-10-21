import { Fragment } from "react";
import { consentDetails } from "@/lib/content";
import styles from "./ConsentDetails.module.css";

export default function ConsentDetails() {
  return (
    <details className={styles.policy}>
      <summary>{consentDetails.summary}</summary>
      <dl className={styles.grid}>
        {consentDetails.rows.map((row) => (
          <Fragment key={row.term}>
            <dt>{row.term}</dt>
            <dd>{row.desc}</dd>
          </Fragment>
        ))}
      </dl>
    </details>
  );
}
