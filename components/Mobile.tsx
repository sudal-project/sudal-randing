import { mobile } from "@/lib/content";
import Lines from "./Lines";
import Marked from "./Marked";
import shared from "./shared.module.css";
import styles from "./Mobile.module.css";

/** 로드맵 다음 이야기: 폰으로 이어 보기(V6). 아직 계획이라 예시 화면임을 밝힌다. */
export default function Mobile() {
  return (
    <section className={shared.block} id="mobile">
      <div className={`wrap ${styles.split}`}>
        <div>
          <span className={styles.tag}>{mobile.tag}</span>
          <h2 className={shared.h2}>
            <Lines lines={mobile.heading} />
          </h2>
          <p className={shared.lead}>{mobile.lead}</p>
          <ul className={styles.items}>
            {mobile.items.map((item) => (
              <li key={item}>
                <span>
                  <Marked text={item} />
                </span>
              </li>
            ))}
          </ul>
        </div>
        <figure className={styles.shot}>
          <img src={mobile.image} alt={mobile.alt} />
          <figcaption>{mobile.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
