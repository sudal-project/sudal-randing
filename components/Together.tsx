import LoopVideo from "@/components/scenes/LoopVideo";
import { together } from "@/lib/content";
import Lines from "./Lines";
import MacFrame from "./MacFrame";
import shared from "./shared.module.css";
import styles from "./Together.module.css";

export default function Together() {
  const { video } = together;

  return (
    <section className={shared.block} id="together">
      <div className={`wrap ${styles.split}`}>
        <div>
          <h2 className={shared.h2}>
            <Lines lines={together.heading} />
          </h2>
          <p className={shared.lead}>{together.lead}</p>
          <ul className={styles.facts}>
            {together.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>
        <MacFrame title={video.title}>
          <LoopVideo src={video.src} poster={video.poster} label={video.label} />
        </MacFrame>
      </div>
    </section>
  );
}
