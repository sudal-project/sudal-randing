import DeskDemo from "@/components/desk/DeskDemo";
import WaitlistForm from "@/components/waitlist/WaitlistForm";
import { hero } from "@/lib/content";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} style={{ paddingBlock: 0 }}>
      <div className={`wrap ${styles.grid}`}>
        <div>
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className={styles.heading}>
            {hero.heading.map((line, index) => (
              <span key={line.text}>
                {index > 0 && <br />}
                <span className={line.mark ? "mark" : undefined}>{line.text}</span>
              </span>
            ))}
          </h1>
          <p className={styles.lede}>{hero.lede}</p>

          <WaitlistForm variant="hero" />

          <ul className={styles.ticks}>
            {hero.ticks.map((tick) => (
              <li key={tick}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
                {tick}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <DeskDemo />
        </div>
      </div>
    </section>
  );
}
