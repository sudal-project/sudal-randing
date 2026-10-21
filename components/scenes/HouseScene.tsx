"use client";

import { Fragment } from "react";
import OtterSprite from "@/components/OtterSprite";
import { houseScene, houseStages } from "@/lib/content";
import { ms } from "@/lib/time";
import ScenePlayer, { type SceneChapter } from "./ScenePlayer";
import styles from "./HouseScene.module.css";

const BUILD_DURATIONS = [2600, 2600, 2600, 2600, 2400, 5200];
const BUILD_RANGES: Array<[number, number]> = [
  [0, 20],
  [20, 45],
  [45, 70],
  [70, 100],
];

const CHAPTERS: SceneChapter[] = houseScene.captions.map((caption, i) => ({
  duration: BUILD_DURATIONS[i],
  caption,
}));

type HouseFrame =
  | { mode: "build"; pct: number; stageNumber: number }
  | { mode: "village"; plotCount: number; showVillageDone: boolean };

function frameFor(index: number, p: number): HouseFrame {
  if (index <= 3) {
    const [a, b] = BUILD_RANGES[index];
    return { mode: "build", pct: a + (b - a) * p, stageNumber: index + 1 };
  }
  if (index === 4) {
    return { mode: "build", pct: 100, stageNumber: 5 };
  }
  const plotCount = Math.min(6, 1 + Math.floor((p / 0.75) * 6));
  return { mode: "village", plotCount, showVillageDone: p >= 0.8 };
}

export default function HouseScene() {
  return (
    <ScenePlayer
      ariaLabel={houseScene.ariaLabel}
      cardsLayout="six"
      chapters={CHAPTERS}
      renderScene={(index, progress) => {
        const frame = frameFor(index, progress);
        if (frame.mode === "village") {
          return (
            <div className={styles.village} aria-hidden="true">
              <div className={styles.vframe}>
                <img src={houseScene.village.image} alt="" />
                <div className={styles.badge}>완성 {frame.plotCount} / 6</div>
                {houseScene.village.plots.slice(0, frame.plotCount).map(([x, y], i) => (
                  <div key={i} className={styles.plot} style={{ left: `${x}%`, bottom: `${100 - y}%` }}>
                    <img src="/assets/house/stage5.webp" alt="" />
                  </div>
                ))}
                {frame.showVillageDone && <div className={styles.villageDone}>{houseScene.village.doneCaption}</div>}
              </div>
            </div>
          );
        }

        const stage = houseStages[frame.stageNumber - 1];
        const pct = frame.pct;
        return (
          <div className={styles.build} aria-hidden="true">
            <div className={styles.hud}>
              <b>{pct >= 100 ? houseScene.hudDoneLabel : houseScene.hudBuildingLabel}</b>
              <span className={styles.track}>
                <i style={{ width: `${pct}%` }} />
              </span>
              <b>{Math.round(pct)}%</b>
              <span className={styles.clock}>
                {ms(pct * 18)} / 30:00
              </span>
            </div>
            <div className={styles.worker}>
              <OtterSprite state="work" decorative />
            </div>
            <div className={styles.lot}>
              <img key={stage.id} className={styles.pop} src={stage.image} alt="" />
            </div>
            {pct >= 100 && <div className={styles.sparkle}>{houseScene.sparkleDoneCaption}</div>}
          </div>
        );
      }}
      cards={[
        ...houseStages.map((stage) => (
          <Fragment key={stage.id}>
            <span className="pic">
              <img src={stage.image} alt={stage.alt} loading="lazy" />
            </span>
            <span className={`chip${stage.chipOn ? " chipOn" : ""}`}>{stage.pct}%</span>
            <h3>{stage.label}</h3>
            <p>{stage.description}</p>
          </Fragment>
        )),
        <Fragment key="village">
          <span className="pic thumb">
            <img src={houseScene.villageCard.image} alt={houseScene.villageCard.alt} loading="lazy" />
          </span>
          <span className="chip chipOn">{houseScene.villageCard.chip}</span>
          <h3>{houseScene.villageCard.label}</h3>
          <p>{houseScene.villageCard.description}</p>
        </Fragment>,
      ]}
    />
  );
}
