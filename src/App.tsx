import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { OfflineBar } from "./components/OfflineBar";
import { DayPage } from "./pages/DayPage";
import { HomePage } from "./pages/HomePage";

export default function App() {
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
