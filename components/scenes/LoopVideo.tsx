"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./LoopVideo.module.css";

type Props = {
  src: string;
  poster: string;
  label: string;
};

/** 소리 없이 반복 재생하는 영상 + 멈춤/재생 버튼. 움직임 줄이기 설정이면 멈춘 채로 시작한다. */
export default function LoopVideo({ src, poster, label }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.removeAttribute("autoplay");
      video.pause();
    }
    setPaused(video.paused);
  }, []);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play();
    else video.pause();
  }

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        aria-label={label}
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
      />
      <button className={styles.btn} type="button" aria-label={paused ? "영상 재생" : "영상 멈추기"} onClick={toggle}>
        {paused ? (
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M3 1.5v11l9.5-5.5z" fill="currentColor" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <rect x="2" y="1" width="3.6" height="12" rx="1" fill="currentColor" />
            <rect x="8.4" y="1" width="3.6" height="12" rx="1" fill="currentColor" />
          </svg>
        )}
      </button>
    </>
  );
}
