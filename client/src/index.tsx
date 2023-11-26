import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import HomePage from "./pages/HomePage/index"
import Search from "./pages/Search/index"
import Lead from "./pages/Lead/index";
import LeadList from "./pages/LeadList/index";

const theme = createTheme({
  
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<HomePage/>} />
          <Route path="search" element={<Search/>} />
          <Route path="chci-nabidku" element={<Lead/>} />
          <Route path="seznam" element={<LeadList/>} />
          {/*<Route path="*" element={<Navigate to="" />} />*/}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);