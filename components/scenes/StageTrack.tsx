"use client";

import { useEffect, useRef, useState } from "react";
import { stages } from "@/lib/content";
import styles from "./StageTrack.module.css";

const DURATION = 8500;

function ease(t: number) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

/** 집 5단계: 화면에 보이면 수달이 선을 따라 달리며 채우고, 지나간 단계가 하나씩 밝아진다. */
export default function StageTrack() {
  const rootRef = useRef<HTMLDivElement>(null);
  const runnerRef = useRef<HTMLImageElement>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fillRefs = useRef<(HTMLElement | null)[]>([]);
  const [anim, setAnim] = useState(false);
  const [lit, setLit] = useState<boolean[]>(() => stages.items.map(() => false));
  const [runnerSrc, setRunnerSrc] = useState(stages.runner.run);

  useEffect(() => {
    const root = rootRef.current;
    const runner = runnerRef.current;
    if (!root || !runner) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    new Image().src = stages.runner.sit;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 움직임을 쓸 수 있을 때만 애니메이션 모양으로 바꾼다
    setAnim(true);

    let raf = 0;
    let t0 = 0;
    let played = false;

    // 위치·채움 폭은 매 프레임 바뀌므로 ref로 직접 쓰고, 단계 밝기만 state로 둔다
    function place(p: number) {
      const width = root!.clientWidth;
      const rw = runner!.offsetWidth || 56;
      const top = (trackRefs.current[0]?.offsetTop ?? 0) - runner!.offsetHeight + 4;
      const x = Math.min(width - rw, Math.max(0, (p / 100) * width - rw * 0.6));
      runner!.style.transform = `translate3d(${x}px,${top}px,0)`;
      fillRefs.current.forEach((fill, i) => {
        if (fill) fill.style.width = `${Math.max(0, Math.min(1, (p - i * 20) / 20)) * 100}%`;
      });
      const next = stages.items.map((_, i) => p >= i * 20 + (i === 0 ? 2 : 10));
      setLit((prev) => (prev.every((v, i) => v === next[i]) ? prev : next));
    }

    function frame(now: number) {
      if (!t0) t0 = now;
      const t = Math.min(1, (now - t0) / DURATION);
      place(ease(t) * 100);
      if (t < 1) raf = requestAnimationFrame(frame);
      else setRunnerSrc(stages.runner.sit);
    }

    function play() {
      if (played) return;
      played = true;
      setRunnerSrc(stages.runner.run);
      t0 = 0;
      raf = requestAnimationFrame(frame);
    }

    function reset() {
      cancelAnimationFrame(raf);
      played = false;
      setRunnerSrc(stages.runner.run);
      place(0);
    }

    function onResize() {
      if (!played) place(0);
    }

    place(0);
    addEventListener("resize", onResize);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio >= 0.45) play();
          else if (!e.isIntersecting) reset();
        }),
      { threshold: [0, 0.45] }
    );
    io.observe(root);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", onResize);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={rootRef} className={`${styles.stages} ${anim ? styles.anim : ""}`}>
      <img ref={runnerRef} className={styles.runner} src={runnerSrc} alt="" />
      {stages.items.map((item, i) => (
        <div key={item.name} className={`${styles.stg} ${lit[i] ? styles.on : ""}`}>
          <div className={styles.pic}>
            <img src={item.image} alt="" />
          </div>
          <div
            className={styles.track}
            ref={(el) => {
              trackRefs.current[i] = el;
            }}
          >
            <i
              ref={(el) => {
                fillRefs.current[i] = el;
              }}
            />
          </div>
          <b>{item.name}</b>
          <span>{item.pct}</span>
        </div>
      ))}
    </div>
  );
}
