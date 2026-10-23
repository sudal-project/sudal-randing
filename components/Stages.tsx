import StageTrack from "@/components/scenes/StageTrack";
import { stages } from "@/lib/content";
import shared from "./shared.module.css";
import styles from "./Stages.module.css";

export default function Stages() {
  return (
    <section className={shared.block}>
      <div className="wrap">
        <h2 className={shared.h2}>{stages.heading}</h2>
        <p className={shared.lead}>{stages.lead}</p>
        <StageTrack />
        <p className={styles.note}>{stages.note}</p>
      </div>
    </section>
  );
}
