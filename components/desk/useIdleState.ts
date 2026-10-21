"use client";

import { useEffect, useRef, useState } from "react";

export type DeskState = "work" | "sleepy" | "sleep" | "surprise";

const SLEEPY_MS = 5000;
const SLEEP_MS = 10000;
const SURPRISE_MS = 600;
const TICK_MS = 250;

const WAKE_EVENTS = ["pointermove", "pointerdown", "keydown", "wheel", "touchstart", "scroll"] as const;

export function useIdleState() {
  const [state, setState] = useState<DeskState>("work");
  const lastInputRef = useRef(0);
  const surpriseUntilRef = useRef(0);

  useEffect(() => {
    lastInputRef.current = Date.now();
    function wake() {
      lastInputRef.current = Date.now();
      setState((current) => {
        if (current === "sleepy" || current === "sleep") {
          surpriseUntilRef.current = Date.now() + SURPRISE_MS;
          return "surprise";
        }
        return current;
      });
    }
    WAKE_EVENTS.forEach((event) => addEventListener(event, wake, { passive: true }));
    return () => WAKE_EVENTS.forEach((event) => removeEventListener(event, wake));
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      const now = Date.now();
      const idle = now - lastInputRef.current;
      setState((current) => {
        if (current === "surprise") {
          return now > surpriseUntilRef.current ? "work" : current;
        }
        if (idle >= SLEEP_MS) return "sleep";
        if (idle >= SLEEPY_MS) return "sleepy";
        return "work";
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, []);

  return state;
}
