import { useEffect, useRef } from "react";

export interface BurritoSquatPlayerProps {
  className?: string;
  playing?: boolean;
  showCaption?: boolean;
  /** If set, call once after this many ms while playing. */
  onCompleteAfterMs?: number;
  onComplete?: () => void;
}

export function BurritoSquatPlayer({
  className = "",
  playing = true,
  showCaption = false,
  onCompleteAfterMs,
  onComplete,
}: BurritoSquatPlayerProps) {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!playing || onCompleteAfterMs == null) return;
    const id = window.setTimeout(() => onCompleteRef.current?.(), onCompleteAfterMs);
    return () => window.clearTimeout(id);
  }, [playing, onCompleteAfterMs]);

  return (
    <div
      className={`burrito-player ${playing ? "burrito-player--playing" : ""} ${className}`.trim()}
    >
      <div className="burrito-player__gym" aria-hidden>
        <div className="burrito-player__rack" />
        <div className="burrito-player__mat" />
      </div>

      <div className="burrito-player__stage" aria-hidden>
        <div className="burrito-player__squatter">
          <div className="burrito-player__face">
            <img src="/avatars/clara.png" alt="" draggable={false} />
          </div>
          <div className="burrito-player__arms">
            <span className="burrito-player__arm burrito-player__arm--left" />
            <span className="burrito-player__arm burrito-player__arm--right" />
          </div>
          <div className="burrito-player__wrap">
            <span className="burrito-player__fold burrito-player__fold--a" />
            <span className="burrito-player__fold burrito-player__fold--b" />
            <span className="burrito-player__fold burrito-player__fold--c" />
            <span className="burrito-player__filling" />
          </div>
          <div className="burrito-player__feet">
            <span />
            <span />
          </div>
        </div>
        <div className="burrito-player__shadow" />
      </div>

      {showCaption ? (
        <p className="burrito-player__caption meta-mono">Clara · burrito squats</p>
      ) : null}
    </div>
  );
}
