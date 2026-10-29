"use client";

import { useEffect, useRef, useState } from "react";
import { buildScene } from "@/lib/content";
import styles from "./BuildScene.module.css";

const { marks, stageImages, otter } = buildScene;

function stageFor(pct: number) {
  let s = 0;
  marks.forEach((mark, i) => {
    if (pct >= mark) s = i;
  });
  return s;
}

function two(n: number) {
  return String(n).padStart(2, "0");
}

function clockText(secs: number) {
  const t = Math.round(secs);
  return `${two(Math.floor(t / 3600))}:${two(Math.floor(t / 60) % 60)}:${two(t % 60)}`;
}

/** 첫 화면: 수달이 집 한 채를 단계별로 짓고, 아래 보드에 진행도와 공부 시간이 올라간다. */
export default function BuildScene() {
  const [{ pct, secs }, setBuild] = useState({ pct: 0, secs: 0, hold: 0 });
  const [reduce, setReduce] = useState(false);
  const [pop, setPop] = useState(0);
  const [visible, setVisible] = useState(false);
  const lastStage = useRef(0);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    [otter.axe, otter.log, otter.rest].forEach((src) => {
      new Image().src = src;
    });

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- 브라우저 설정을 읽은 뒤에만 정할 수 있다
      setReduce(true);
      setBuild({ pct: 45, secs: 810, hold: 0 });
      return;
    }

    // 화면에 보일 때만 짓는다
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (sceneRef.current) io.observe(sceneRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reduce) return;
    // 다 지으면 잠깐 멈췄다가 타이머와 함께 처음부터 다시 짓는다 (집 한 채 = 30분)
    const id = setInterval(() => {
      setBuild((b) => {
        if (b.pct >= 100) {
          return b.hold >= 14 ? { pct: 0, secs: 0, hold: 0 } : { ...b, hold: b.hold + 1 };
        }
        return { pct: Math.min(100, b.pct + 1), secs: b.secs + 18, hold: 0 };
      });
    }, 120);
    return () => clearInterval(id);
  }, [visible, reduce]);

  const stage = stageFor(pct);

  useEffect(() => {
    if (stage !== lastStage.current) {
      lastStage.current = stage;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- 단계가 바뀔 때마다 튀어 오르는 효과를 다시 건다
      if (!reduce) setPop((n) => n + 1);
    }
  }, [stage, reduce]);

  const done = stage === 4;
  const worker = done ? otter.rest : pct % 20 < 10 ? otter.axe : otter.log;

  return (
    <>
      <div ref={sceneRef} className={styles.scene} role="img" aria-label={buildScene.ariaLabel}>
        <div className={styles.plot} style={{ left: "22.9%", top: "52.5%" }}>
          <img src={buildScene.doneHouse} alt="" />
        </div>
        <div className={styles.plot} style={{ left: "41.9%", top: "52.5%" }}>
          {stageImages.map((src, i) => (
            <img
              key={i === stage ? `${src}-${pop}` : src}
              className={`${styles.stage} ${i === stage ? styles.on : ""} ${i === stage && pop > 0 ? styles.pop : ""}`}
              src={src}
              alt=""
            />
          ))}
          <img src={stageImages[4]} alt="" style={{ visibility: "hidden" }} />
        </div>
        <div className={styles.worker} style={{ left: "50.5%", top: "58.5%" }}>
          <img className={`${styles.bob} ${done ? styles.rest : ""}`} src={worker} alt="" />
        </div>
      </div>

      <div className={styles.board} aria-hidden="true">
        <div className={styles.boardInner}>
          <div className={styles.card}>
            <div className={styles.buildHead}>
              <span>{buildScene.heading}</span>
              <span>{Math.floor(pct)}%</span>
            </div>
            <div className={styles.bar}>
              <i style={{ width: `${pct}%` }} />
            </div>
            <div className={styles.chips}>
              {buildScene.chips.map((chip, i) => (
                <span key={chip} className={`${styles.chip} ${i === stage ? styles.chipOn : ""}`}>
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.timer}>
            <small>{buildScene.timerLabel}</small>
            <b>{clockText(secs)}</b>
          </div>
        </div>
      </div>
    </>
  );
}
