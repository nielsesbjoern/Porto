import { useEffect, useRef, useState } from "react";

interface BurritoSquatIntroProps {
  onDone: () => void;
}

const INTRO_MS = 3000;
const FRAME_MS = 120;

/** One rep: down then up through pose frames. */
const FRAME_CYCLE = [
  "/avatars/clara-squat/clara-squat-01-stand.jpg",
  "/avatars/clara-squat/clara-squat-02-mid.jpg",
  "/avatars/clara-squat/clara-squat-03-bottom.jpg",
  "/avatars/clara-squat/clara-squat-03b-bottom.jpg",
  "/avatars/clara-squat/clara-squat-03-bottom.jpg",
  "/avatars/clara-squat/clara-squat-02-mid.jpg",
] as const;

const UNIQUE_FRAMES = [...new Set(FRAME_CYCLE)];

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function BurritoSquatIntro({ onDone }: BurritoSquatIntroProps) {
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const doneId = window.setTimeout(() => onDoneRef.current(), INTRO_MS);
    if (prefersReducedMotion()) {
      return () => window.clearTimeout(doneId);
    }
    const frameId = window.setInterval(() => {
      setFrameIndex((i) => (i + 1) % FRAME_CYCLE.length);
    }, FRAME_MS);
    return () => {
      window.clearTimeout(doneId);
      window.clearInterval(frameId);
    };
  }, []);

  const activeSrc = FRAME_CYCLE[frameIndex];

  return (
    <div
      className="burrito-intro"
      role="status"
      aria-live="polite"
      aria-label="Clara"
    >
      <div className="burrito-intro__glow" aria-hidden />

      <div className="burrito-intro__stage" aria-hidden>
        <div className="burrito-intro__frame">
          <div className="burrito-intro__stack">
            {UNIQUE_FRAMES.map((src) => (
              <img
                key={src}
                className={`burrito-intro__photo ${
                  src === activeSrc ? "burrito-intro__photo--active" : ""
                }`}
                src={src}
                alt=""
                draggable={false}
              />
            ))}
          </div>
          <div className="burrito-intro__shadow" />
        </div>
      </div>

      <p className="burrito-intro__caption meta-mono">Clara · burrito squats</p>
    </div>
  );
}
