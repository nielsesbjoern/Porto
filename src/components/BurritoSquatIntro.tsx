import { useEffect, useRef } from "react";

interface BurritoSquatIntroProps {
  onDone: () => void;
}

const INTRO_MS = 3000;

export function BurritoSquatIntro({ onDone }: BurritoSquatIntroProps) {
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const id = window.setTimeout(() => onDoneRef.current(), INTRO_MS);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div
      className="burrito-intro"
      role="status"
      aria-live="polite"
      aria-label="Clara"
    >
      <div className="burrito-intro__gym" aria-hidden>
        <div className="burrito-intro__rack" />
        <div className="burrito-intro__mat" />
      </div>

      <div className="burrito-intro__stage" aria-hidden>
        <div className="burrito-intro__squatter">
          <div className="burrito-intro__face">
            <img src="/avatars/clara.png" alt="" draggable={false} />
          </div>
          <div className="burrito-intro__arms">
            <span className="burrito-intro__arm burrito-intro__arm--left" />
            <span className="burrito-intro__arm burrito-intro__arm--right" />
          </div>
          <div className="burrito-intro__wrap">
            <span className="burrito-intro__fold burrito-intro__fold--a" />
            <span className="burrito-intro__fold burrito-intro__fold--b" />
            <span className="burrito-intro__fold burrito-intro__fold--c" />
            <span className="burrito-intro__filling" />
          </div>
          <div className="burrito-intro__feet">
            <span />
            <span />
          </div>
        </div>
        <div className="burrito-intro__shadow" />
      </div>

      <p className="burrito-intro__caption meta-mono">Clara · burrito squats</p>
    </div>
  );
}
