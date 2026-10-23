import type { CSSProperties, ReactNode } from "react";
import { roadmap } from "@/lib/content";
import shared from "./shared.module.css";
import styles from "./Roadmap.module.css";

function Silhouette({ src, className = "" }: { src: string; className?: string }) {
  return <span className={`${styles.sil} ${className}`} style={{ "--m": `url(${src})` } as CSSProperties} />;
}

function Sparkle({ style }: { style: CSSProperties }) {
  return (
    <svg className={styles.sparkle} style={style} width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 0l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill="currentColor" />
    </svg>
  );
}

function Future({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`${styles.future} ${className}`} aria-hidden="true">
      {children}
      <span className={styles.qb}>?</span>
    </div>
  );
}

// 아직 만들지 않은 버전은 그림자 모양으로만 보여 준다
const pictures: ReactNode[] = [
  <img key="v1" src="/assets/house_4_red.png" alt="" />,
  <Future key="v2" className={styles.vil}>
    <Silhouette src="/assets/house_4_green.png" className={styles.a} />
    <Silhouette src="/assets/house_4_red.png" className={styles.b} />
    <Silhouette src="/assets/house_4_green.png" className={styles.c} />
  </Future>,
  <Future key="v3">
    <div className={styles.polaroid}>
      <Silhouette src="/assets/house_4_red.png" />
    </div>
  </Future>,
  <Future key="v4" className={styles.deco}>
    <Silhouette src="/assets/house_4_green.png" />
    <Sparkle style={{ left: 14, top: 26 }} />
    <Sparkle style={{ right: 24, top: 44, transform: "scale(.7)" }} />
    <Sparkle style={{ left: 28, bottom: 10, transform: "scale(.6)" }} />
  </Future>,
  <Future key="v5" className={styles.duo}>
    <Silhouette src="/assets/otter_full.png" />
    <Silhouette src="/assets/otter_full.png" className={styles.flip} />
  </Future>,
];

export default function Roadmap() {
  return (
    <section className={`${shared.block} ${shared.paperBg}`} id="roadmap">
      <div className="wrap">
        <h2 className={shared.h2}>{roadmap.heading}</h2>
        <p className={shared.lead}>{roadmap.lead}</p>
        <div className={styles.road}>
          <img className={styles.runner} src={roadmap.runner} alt="" />
          {roadmap.versions.map((ver, i) => (
            <div key={ver.v} className={`${styles.ver} ${ver.badge ? styles.now : ""}`}>
              <div className={styles.pic}>{pictures[i]}</div>
              <div className={styles.card}>
                <div className={styles.v}>
                  {ver.v} {ver.badge && <em>{ver.badge}</em>}
                </div>
                <h3>{ver.title}</h3>
                <ul>
                  {ver.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <p className={styles.note}>{roadmap.note}</p>
      </div>
    </section>
  );
}
