import { downloadSection, joinSection } from "@/lib/content";
import { getDownloadUrl, isReleased } from "@/lib/release";
import WaitlistForm from "@/components/waitlist/WaitlistForm";
import styles from "./Join.module.css";

export default function Join() {
  const released = isReleased();
  const copy = released ? downloadSection : joinSection;

  return (
    <section id="join" className={styles.cta} style={{ paddingBlock: 0 }}>
      <div className={`wrap ${styles.wrap}`}>
        <div>
          <span className={styles.pill}>
            <i />
            {copy.pill}
          </span>
          <h2 style={{ marginTop: 16 }}>
            {copy.heading.split("\n").map((line, index) => (
              <span key={line}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </h2>
          <p className={styles.lead}>{copy.lead}</p>
          <div className={styles.otters} aria-hidden="true">
            <img src="/assets/otter/idle.webp" alt="" />
            <img src="/assets/otter/work.webp" alt="" />
            <img src="/assets/otter/sleep.webp" alt="" />
          </div>
        </div>

        {released ? (
          <div className={styles.downloadCard}>
            <a className={styles.downloadBtn} href={getDownloadUrl()}>
              {downloadSection.ctaLabel}
            </a>
          </div>
        ) : (
          <WaitlistForm variant="footer" />
        )}
      </div>
    </section>
  );
}
