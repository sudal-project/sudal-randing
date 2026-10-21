import { joinSection } from "@/lib/content";
import WaitlistForm from "@/components/waitlist/WaitlistForm";
import styles from "./Join.module.css";

export default function Join() {
  return (
    <section id="join" className={styles.cta} style={{ paddingBlock: 0 }}>
      <div className={`wrap ${styles.wrap}`}>
        <div>
          <span className={styles.pill}>
            <i />
            {joinSection.pill}
          </span>
          <h2 style={{ marginTop: 16 }}>
            {joinSection.heading.split("\n").map((line, index) => (
              <span key={line}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </h2>
          <p className={styles.lead}>{joinSection.lead}</p>
          <div className={styles.otters} aria-hidden="true">
            <img src="/assets/otter/idle.webp" alt="" />
            <img src="/assets/otter/work.webp" alt="" />
            <img src="/assets/otter/sleep.webp" alt="" />
          </div>
        </div>
        <WaitlistForm variant="footer" />
      </div>
    </section>
  );
}
