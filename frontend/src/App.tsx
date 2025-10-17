import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ParametersPage from "./pages/ParametersPage";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 border-b mb-4">
        <Link to="/parameters">Parameters</Link>
      </nav>
      <Routes>
        <Route path="/parameters" element={<ParametersPage />} />
        <Route path="*" element={<div className="p-6">Home</div>} />
      </Routes>
    </BrowserRouter>
  );
}
