"use client";

import { Fragment } from "react";
import DemoWindow from "@/components/DemoWindow";
import OtterSprite from "@/components/OtterSprite";
import { otterStates, restScene, type OtterStateId } from "@/lib/content";
import { hms, ms } from "@/lib/time";
import ScenePlayer, { type SceneChapter } from "./ScenePlayer";
import styles from "./RestScene.module.css";

interface RestFrame {
  sprite: OtterStateId;
  mode: string;
  paused: boolean;
  clockSeconds: number;
  inputText: string;
  typing: boolean;
  cursor?: { leftPct: number; topPct: number };
}

const CHAPTERS: SceneChapter[] = restScene.captions.map((caption, i) => ({
  duration: [2600, 3400, 3400, 3400, 3200][i],
  caption,
}));

function frameFor(index: number, p: number): RestFrame {
  switch (index) {
    case 0:
      return {
        sprite: "idle",
        mode: "공부 전",
        paused: true,
        clockSeconds: 0,
        inputText: "공부 시작을 누르면 나타나요",
        typing: false,
      };
    case 1:
      return { sprite: "work", mode: "공부 중", paused: false, clockSeconds: p * 1200, inputText: "입력 중", typing: true };
    case 2:
      return {
        sprite: "sleepy",
        mode: "졸림 · 공부 중",
        paused: false,
        clockSeconds: 1500 + p * 300,
        inputText: `입력 없음 ${ms(300 + p * 299)}`,
        typing: false,
      };
    case 3:
      return {
        sprite: "sleep",
        mode: "자동 휴식",
        paused: true,
        clockSeconds: 1800,
        inputText: `입력 없음 ${ms(600 + p * 240)}`,
        typing: false,
      };
    default: {
      const waking = p < 0.4;
      return {
        sprite: waking ? "surprise" : "work",
        mode: waking ? "깨어나는 중" : "공부 중",
        paused: false,
        clockSeconds: 1800 + Math.max(0, p - 0.4) * 150,
        inputText: waking ? "입력 감지!" : "입력 중",
        typing: !waking,
        cursor:
          p <= 0.55
            ? { leftPct: 28 + (Math.min(p, 0.4) / 0.4) * 30, topPct: 64 - (Math.min(p, 0.4) / 0.4) * 14 }
            : undefined,
      };
    }
  }
}

export default function RestScene() {
  return (
    <ScenePlayer
      ariaLabel={restScene.ariaLabel}
      cardsLayout="five"
      chapters={CHAPTERS}
      renderScene={(index, progress) => {
        const frame = frameFor(index, progress);
        return (
          <div className={styles.rest}>
            <DemoWindow className={styles.win} />
            <div className={styles.timer} aria-hidden="true">
              <small>
                <i className={`${styles.dot} ${frame.paused ? styles.dotPause : ""}`} />
                <span>{frame.mode}</span>
              </small>
              <span className={styles.clock}>{hms(frame.clockSeconds)}</span>
            </div>
            <div className={`${styles.input} ${frame.typing ? styles.inputTyping : ""}`} aria-hidden="true">
              <span className={styles.key}>A</span>
              <span>{frame.inputText}</span>
            </div>
            <div className={styles.otter} aria-hidden="true">
              <OtterSprite state={frame.sprite} decorative />
            </div>
            {frame.cursor && (
              <svg
                className={styles.cursor}
                style={{ left: `${frame.cursor.leftPct}%`, top: `${frame.cursor.topPct}%` }}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M4 2l15 9-6.5 1.5L16 20l-3 1.5-3.4-7.6L4 18z"
                  fill="#fff"
                  stroke="#2b1d16"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            <div className="taskbar" aria-hidden="true" />
          </div>
        );
      }}
      cards={otterStates.map((state) => (
        <Fragment key={state.id}>
          <span className="pic">
            <img src={state.image} alt={state.alt} loading="lazy" />
          </span>
          <span className={`chip${state.chipOn ? " chipOn" : ""}`}>{state.chip}</span>
          <h3>{state.label}</h3>
          <p>{state.description}</p>
        </Fragment>
      ))}
    />
  );
}
