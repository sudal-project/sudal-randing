import { roadmapIntro, roadmapStages } from "@/lib/content";
import styles from "./Roadmap.module.css";

export default function Roadmap() {
  return (
    <section id="roadmap" style={{ paddingTop: 24 }}>
      <div className="wrap">
        <div className="secHead">
          <p className="eyebrow">{roadmapIntro.eyebrow}</p>
          <h2>{roadmapIntro.heading}</h2>
          <p>{roadmapIntro.lead}</p>
        </div>
        <div className={styles.road}>
          {roadmapStages.map((stage) => (
            <article key={stage.version} className={stage.highlight ? styles.now : undefined}>
              <span className={styles.version}>{stage.version}</span>
              <h3>{stage.title}</h3>
              <ul>
                {stage.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
