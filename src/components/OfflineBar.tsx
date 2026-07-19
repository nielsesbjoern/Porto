import { useEffect, useState } from "react";
import { useI18n } from "../i18n";
import { isAppleTouchDevice, isStandaloneDisplay } from "../utils/device";
import { warmMapTiles } from "../utils/warmMapTiles";

/**
 * Connectivity + one-tap “prepare offline” so the SW caches shells
 * and map tiles before you lose signal in Porto.
 */
export function OfflineBar() {
  const { t } = useI18n();
  const [online, setOnline] = useState(
    typeof navigator === "undefined" ? true : navigator.onLine,
  );
  const [swReady, setSwReady] = useState(false);
  const [preparing, setPreparing] = useState(false);
  const [prepared, setPrepared] = useState(() => {
    try {
      return localStorage.getItem("andrade-schade-porto:offline-ready") === "1";
    } catch {
      return false;
    }
  });
  const [flashReady, setFlashReady] = useState(false);
  const [showHomeHint, setShowHomeHint] = useState(false);
  const [ios] = useState(() => isAppleTouchDevice());
  const [standalone] = useState(() => isStandaloneDisplay());

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready
        .then(() => setSwReady(true))
        .catch(() => setSwReady(false));
    } else {
      // Older browsers: still allow tile warm via prepare
      setSwReady(true);
    }

    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  const prepareOffline = async () => {
    if (preparing) return;
    setPreparing(true);
    try {
      const paths = [
        "/",
        "/day/1",
        "/day/1/morning",
        "/day/1/evening",
        "/day/2",
        "/day/2/morning",
        "/day/2/evening",
      ];
      await Promise.all(
        paths.map((path) =>
          fetch(path, { credentials: "same-origin" }).catch(() => null),
        ),
      );
      await Promise.all(
        [
          "/avatars/couple.png",
          "/avatars/niels.png",
          "/avatars/miriam.png",
          "/icons/pwa-192.png",
          "/icons/pwa-512.png",
          "/apple-touch-icon.png",
        ].map((u) => fetch(u).catch(() => null)),
      );
      await warmMapTiles({ force: true });
      localStorage.setItem("andrade-schade-porto:offline-ready", "1");
      setPrepared(true);
      setFlashReady(true);
      if (ios && !standalone) setShowHomeHint(true);
      window.setTimeout(() => setFlashReady(false), 3500);
    } finally {
      setPreparing(false);
    }
  };

  const hide =
    online &&
    prepared &&
    swReady &&
    !flashReady &&
    !preparing &&
    !(showHomeHint && ios && !standalone);

  if (hide) return null;

  return (
    <div
      className={`meta-mono fixed inset-x-0 bottom-0 z-[2000] border-t px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-center ${
        online
          ? "border-[color:var(--color-line)] bg-[color:var(--color-paper)]/95 text-[color:var(--color-blue)]"
          : "border-[color:var(--color-burgundy)] bg-[color:var(--color-burgundy)] text-[color:var(--color-paper)]"
      }`}
      role="status"
    >
      {!online ? (
        <span>{t.ui.offlineMode}</span>
      ) : !swReady ? (
        <span>{t.ui.offlineInstalling}</span>
      ) : flashReady ? (
        <span>{t.ui.offlineReady}</span>
      ) : showHomeHint && ios && !standalone ? (
        <div className="mx-auto flex max-w-md flex-col items-center gap-2">
          <p className="normal-case tracking-normal leading-snug">
            {t.ui.iosAddHome}
          </p>
          <button
            type="button"
            onClick={() => setShowHomeHint(false)}
            className="min-h-11 underline-offset-2 hover:underline"
          >
            {t.ui.iosAddHomeDismiss}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={prepareOffline}
          disabled={preparing}
          className="min-h-11 w-full max-w-md underline-offset-2 hover:underline disabled:opacity-60"
        >
          {preparing ? t.ui.offlinePreparing : t.ui.offlinePrepare}
        </button>
      )}
    </div>
  );
}
