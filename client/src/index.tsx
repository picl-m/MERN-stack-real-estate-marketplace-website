import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

import Lead from "./pages/Lead/index";
import LeadList from "./pages/LeadList/index";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="chci-nabidku" element={<Lead/>} />
        <Route path="seznam" element={<LeadList/>} />
        <Route path="*" element={<Navigate to="chci-nabidku" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);