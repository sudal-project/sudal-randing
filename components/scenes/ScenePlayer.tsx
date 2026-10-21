"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./ScenePlayer.module.css";

export interface SceneChapter {
  duration: number;
  caption: string;
}

interface ScenePlayerProps {
  ariaLabel: string;
  chapters: SceneChapter[];
  cardsLayout: "five" | "six";
  renderScene: (chapterIndex: number, progress: number) => ReactNode;
  cards: ReactNode[];
}

export default function ScenePlayer({ ariaLabel, chapters, cardsLayout, renderScene, cards }: ScenePlayerProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(true);

  const rootRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);
  const playingRef = useRef(playing);
  const indexRef = useRef(index);
  const elapsedRef = useRef(0);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    // matchMedia는 브라우저에서만 읽을 수 있어 마운트 시점에 한 번만 동기화한다.
    /* eslint-disable react-hooks/set-state-in-effect */
    const mql = matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    setPlaying(!mql.matches);
    setProgress(mql.matches ? 0.7 : 0);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        visibleRef.current = entry.isIntersecting;
      }),
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    function loop(now: number) {
      const dt = now - last;
      last = now;
      if (playingRef.current && visibleRef.current) {
        elapsedRef.current += dt;
        const chapter = chapters[indexRef.current];
        const p = Math.min(1, elapsedRef.current / chapter.duration);
        setProgress(p);
        if (p >= 1) {
          const next = (indexRef.current + 1) % chapters.length;
          indexRef.current = next;
          elapsedRef.current = 0;
          setIndex(next);
          setProgress(0);
        }
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [chapters]);

  function enterChapter(k: number) {
    const next = (k + chapters.length) % chapters.length;
    indexRef.current = next;
    elapsedRef.current = 0;
    setIndex(next);
    setProgress(reducedMotion ? 0.7 : 0);
    if (!reducedMotion) setPlaying(true);
  }

  return (
    <div className={styles.player} aria-label={ariaLabel} ref={rootRef}>
      <div className={styles.screen}>
        {renderScene(index, progress)}
        <div className={styles.cap}>
          <span className={styles.n}>
            {index + 1} / {chapters.length}
          </span>
          <span className={styles.txt} aria-live="polite">
            {chapters[index].caption}
          </span>
          <button
            className={styles.pp}
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "일시정지" : "재생"}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>
      </div>
      <ol className={`${styles.cards} ${cardsLayout === "six" ? styles.six : styles.five}`}>
        {cards.map((card, k) => (
          <li key={k}>
            <button
              className={styles.cardBtn}
              type="button"
              aria-current={k === index ? "step" : undefined}
              onClick={() => enterChapter(k)}
            >
              {card}
              <i className={styles.fill} style={{ width: `${k < index ? 100 : k === index ? progress * 100 : 0}%` }} />
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width={14} height={14} aria-hidden="true">
      <path d="M4 2.5v11l9-5.5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width={14} height={14} aria-hidden="true">
      <rect x="3" y="2" width="3.5" height="12" rx="1" />
      <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
    </svg>
  );
}
