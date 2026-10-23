import LoopVideo from "@/components/scenes/LoopVideo";
import { village } from "@/lib/content";
import MacFrame from "./MacFrame";
import shared from "./shared.module.css";
import styles from "./Village.module.css";

export default function Village() {
  return (
    <section className={`${shared.block} ${shared.paperBg}`}>
      <div className="wrap">
        <h2 className={shared.h2}>{village.heading}</h2>
        <p className={shared.lead}>{village.lead}</p>
        <div className={styles.shots}>
          {village.shots.map((shot) => (
            <figure key={shot.src} className={`${styles.shot} ${shot.wide ? styles.wide : ""}`}>
              <MacFrame title={shot.title}>
                {shot.kind === "video" ? (
                  <LoopVideo src={shot.src} poster={shot.poster} label={shot.label} />
                ) : (
                  <img src={shot.src} alt={shot.label} />
                )}
              </MacFrame>
              <figcaption>{shot.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
