import BuildScene from "@/components/scenes/BuildScene";
import HeroSignupPreview from "@/components/waitlist/HeroSignupPreview";
import { downloadSection, hero } from "@/lib/content";
import { getDownloadUrl, isReleased } from "@/lib/release";
import shared from "./shared.module.css";
import styles from "./Hero.module.css";

export default function Hero() {
  const released = isReleased();
  const [l1, l2, l3] = hero.heading;

  return (
    <section className={styles.hero}>
      <div className={`wrap ${styles.grid}`}>
        <div>
          <span className={styles.tag}>{released ? hero.tagReleased : hero.tag}</span>
          <h1 className={styles.h1}>
            {l1}
            <br />
            <span className={styles.l2}>{l2}</span>
            <br />
            <span className={styles.l3}>{l3}</span>
          </h1>
        </div>
        <div className={styles.copy}>
          <p>{hero.lede}</p>
          {released ? (
            <a className={shared.btnGo} href={getDownloadUrl()}>
              {downloadSection.ctaLabel}
            </a>
          ) : (
            <HeroSignupPreview />
          )}
          <ul className={styles.promise}>
            {(released ? hero.promiseReleased : hero.promise).map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="wrap">
        <BuildScene />
      </div>
    </section>
  );
}
