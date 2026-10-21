import HouseScene from "@/components/scenes/HouseScene";
import { howItWorks } from "@/lib/content";
import styles from "./HowItWorks.module.css";

export default function HowItWorks() {
  const { stepStart, stepHouse, stepRecord } = howItWorks;

  return (
    <section className={styles.how} id="how">
      <div className="wrap">
        <div className="secHead">
          <p className="eyebrow">{howItWorks.eyebrow}</p>
          <h2 style={{ whiteSpace: "pre-line" }}>{howItWorks.heading}</h2>
        </div>

        <div className={styles.step}>
          <div className={styles.txt}>
            <span className={styles.num}>{stepStart.num}</span>
            <h3 style={{ whiteSpace: "pre-line" }}>{stepStart.heading}</h3>
            <p>{stepStart.body}</p>
            <div className={styles.facts}>
              {stepStart.facts?.map((fact) => (
                <span key={fact} className="chip">
                  {fact}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.panel}>
            <div className={styles.mini} aria-hidden="true">
              <div className={styles.miniWindow} />
              <img className={`sprite work ${styles.miniOtter}`} src="/assets/otter/work.webp" alt="" />
            </div>
            <div className={styles.btns} aria-hidden="true">
              <span className={`${styles.fake} ${styles.fakeGo}`}>▶ 공부 시작</span>
              <span className={styles.fake}>휴식</span>
              <span className={styles.fake}>종료</span>
            </div>
          </div>
        </div>

        <div className={`${styles.step} ${styles.wide}`}>
          <div className={styles.intro}>
            <div className={styles.txt}>
              <span className={styles.num}>{stepHouse.num}</span>
              <h3 style={{ whiteSpace: "pre-line" }}>{stepHouse.heading}</h3>
            </div>
            <p>{stepHouse.body}</p>
          </div>
          <HouseScene />
        </div>

        <div className={styles.step}>
          <div className={styles.txt}>
            <span className={styles.num}>{stepRecord.num}</span>
            <h3 style={{ whiteSpace: "pre-line" }}>{stepRecord.heading}</h3>
            <p>{stepRecord.body}</p>
            <div className={styles.facts}>
              {stepRecord.facts?.map((fact) => (
                <span key={fact} className="chip">
                  {fact}
                </span>
              ))}
            </div>
          </div>
          {stepRecord.image && (
            <div className={`${styles.panel} ${styles.flush}`}>
              <img
                src={stepRecord.image.src}
                alt={stepRecord.image.alt}
                width={stepRecord.image.width}
                height={stepRecord.image.height}
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
