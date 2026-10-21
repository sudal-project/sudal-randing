"use client";

import { useEffect, useRef, useState } from "react";
import DemoWindow from "@/components/DemoWindow";
import OtterSprite from "@/components/OtterSprite";
import { deskDemoHints, deskDemoStateText, houseStages } from "@/lib/content";
import { hms } from "@/lib/time";
import { useIdleState, type DeskState } from "./useIdleState";
import styles from "./DeskDemo.module.css";

const GOAL_SECONDS = 30; // 집 한 채 = 30분을 30초로 압축 (1초 = 공부 1분)
const DONE_FREEZE_MS = 1600;
const TICK_MS = 250;

function stageFor(pct: number) {
  let current = houseStages[0];
  for (const stage of houseStages) {
    if (pct >= stage.pct) current = stage;
  }
  return current;
}

export default function DeskDemo() {
  const state = useIdleState();
  const stateRef = useRef<DeskState>(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const [studySeconds, setStudySeconds] = useState(0);
  const [housePct, setHousePct] = useState(0);
  const [houses, setHouses] = useState(0);

  const houseSecondsRef = useRef(0);
  const housesRef = useRef(0);
  const doneUntilRef = useRef(0);
  const prevRef = useRef(0);

  useEffect(() => {
    prevRef.current = Date.now();
    const id = setInterval(() => {
      const now = Date.now();
      const dt = (now - prevRef.current) / 1000;
      prevRef.current = now;

      if (stateRef.current !== "sleep" && now > doneUntilRef.current) {
        setStudySeconds((s) => s + dt);
        houseSecondsRef.current += dt;
        if (houseSecondsRef.current >= GOAL_SECONDS) {
          houseSecondsRef.current = GOAL_SECONDS;
          housesRef.current += 1;
          setHouses(housesRef.current);
          setHousePct(100);
          doneUntilRef.current = now + DONE_FREEZE_MS;
          setTimeout(() => {
            houseSecondsRef.current = 0;
            setHousePct(0);
          }, DONE_FREEZE_MS);
        }
      }
      if (now > doneUntilRef.current) {
        setHousePct(Math.min(100, Math.round((houseSecondsRef.current / GOAL_SECONDS) * 100)));
      }
    }, TICK_MS);
    return () => clearInterval(id);
  }, []);

  const stage = stageFor(housePct);
  const houseLabel = `${(houses % 6) + 1}번째 집 · ${stage.label}`;
  const villageText = `마을 ${houses % 6}/6`;

  return (
    <div>
      <div className={styles.desk} aria-label="수달공방 체험 데모: 바탕화면에서 수달이 공부를 함께하는 모습">
        <DemoWindow className={styles.win} />

        <div className={styles.housechip}>
          <div className={styles.hi}>
            <img src={stage.image} alt="짓고 있는 집" />
          </div>
          <div>
            <b>{houseLabel}</b>
            <span>{housePct}%</span>
            <div className={styles.bar}>
              <i style={{ width: `${housePct}%` }} />
            </div>
          </div>
        </div>

        <div className={styles.buddy}>
          <div className={styles.bubble}>
            <div className={styles.bubbleTop}>
              <span>
                <i className={`${styles.dot} ${state === "sleep" ? styles.dotPause : ""}`} />
                {deskDemoStateText[state]}
              </span>
              <span>{villageText}</span>
            </div>
            <div className={styles.clock}>{hms(studySeconds)}</div>
          </div>
          <div className={styles.stage}>
            <OtterSprite state={state} decorative className={styles.spriteImg} />
          </div>
        </div>

        <div className="taskbar" aria-hidden="true" />
      </div>
      <p className={styles.hint}>{deskDemoHints[state]}</p>
    </div>
  );
}
