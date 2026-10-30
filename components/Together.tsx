import LoopVideo from "@/components/scenes/LoopVideo";
import { states, together } from "@/lib/content";
import Lines from "./Lines";
import MacFrame from "./MacFrame";
import Marked from "./Marked";
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
              <li key={fact}>
                <span>
                  <Marked text={fact} />
                </span>
              </li>
            ))}
          </ul>
        </div>
        <MacFrame title={video.title}>
          <LoopVideo src={video.src} poster={video.poster} label={video.label} />
        </MacFrame>
      </div>

      {/* 수달 상태: 영상 속 수달이 언제 무엇을 하는지 한 줄로 */}
      <div className={`wrap ${styles.states}`}>
        <h3 className={styles.statesHead}>
          {states.heading.join(" ")}
        </h3>
        <p className={styles.statesLead}>
          <Marked text={states.lead} />
        </p>
        <ol className={styles.flow}>
          {states.items.map((item) => (
            <li className={styles.state} key={item.title}>
              <img src={item.image} alt={item.alt} />
              <div>
                <b>{item.title}</b>
                <span className={styles.when}>{item.when}</span>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
