import { states } from "@/lib/content";
import Lines from "./Lines";
import shared from "./shared.module.css";
import styles from "./States.module.css";

export default function States() {
  return (
    <section className={`${shared.block} ${shared.paperBg}`}>
      <div className="wrap">
        <h2 className={shared.h2}>
          <Lines lines={states.heading} />
        </h2>
        <p className={shared.lead}>{states.lead}</p>
        <div className={styles.flow}>
          {states.items.map((item) => (
            <div className={styles.state} key={item.title}>
              <div className={styles.pic}>
                <img src={item.image} alt={item.alt} />
              </div>
              <h3>{item.title}</h3>
              <span className={styles.when}>{item.when}</span>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
