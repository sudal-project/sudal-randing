import SignupForm from "@/components/waitlist/SignupForm";
import { downloadSection, launch } from "@/lib/content";
import { getDownloadUrl, isReleased } from "@/lib/release";
import Lines from "./Lines";
import shared from "./shared.module.css";
import styles from "./Launch.module.css";

export default function Launch() {
  const released = isReleased();
  const copy = released ? downloadSection : launch;

  return (
    <section className={styles.launch} id="launch">
      <div className="wrap">
        <div className={styles.box}>
          <img className={styles.peek} src={launch.peek} alt="" />
          <div className={styles.sign}>{copy.sign}</div>
          <h2 className={`${shared.h2} ${styles.h2}`}>
            <Lines lines={copy.heading} />
          </h2>
          <p className={`${shared.lead} ${styles.lead}`}>{copy.lead}</p>

          {released ? (
            <a className={`${shared.btnGo} ${styles.download}`} href={getDownloadUrl()}>
              {downloadSection.ctaLabel}
            </a>
          ) : (
            <SignupForm variant="launch" />
          )}
        </div>
      </div>
    </section>
  );
}
