import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ClaraGate } from "./components/ClaraGate";
import { DateGate } from "./components/DateGate";
import { OfflineBar } from "./components/OfflineBar";
import { AlbumPage } from "./pages/AlbumPage";
import { DayPage } from "./pages/DayPage";
import { HomePage } from "./pages/HomePage";
import { isUnlocked } from "./utils/unlock";

export default function App() {
  const [unlocked, setUnlocked] = useState(() =>
    typeof window === "undefined" ? false : isUnlocked(),
  );

  const unlock = () => setUnlocked(true);

  return (
    <BrowserRouter>
      {!unlocked ? (
        <Routes>
          <Route path="/" element={<DateGate onUnlock={unlock} />} />
          <Route path="/clara" element={<ClaraGate onUnlock={unlock} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/album" element={<AlbumPage />} />
            <Route path="/day/:dayId" element={<DayPage />} />
            <Route path="/day/:dayId/:slot" element={<DayPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <OfflineBar />
        </>
      )}
    </BrowserRouter>
  );
}
