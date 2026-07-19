import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { DateGate } from "./components/DateGate";
import { OfflineBar } from "./components/OfflineBar";
import { DayPage } from "./pages/DayPage";
import { HomePage } from "./pages/HomePage";
import { isUnlocked } from "./utils/unlock";

export default function App() {
  const [unlocked, setUnlocked] = useState(() =>
    typeof window === "undefined" ? false : isUnlocked(),
  );

  if (!unlocked) {
    return <DateGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/day/:dayId" element={<DayPage />} />
        <Route path="/day/:dayId/:slot" element={<DayPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <OfflineBar />
    </BrowserRouter>
  );
}
