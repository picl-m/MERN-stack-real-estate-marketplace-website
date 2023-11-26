import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import HomePage from "./pages/HomePage/index";
import Search from "./pages/Search/index";
import SearchResults from "./pages/SearchResults/index";
import Error from "./pages/Error/index";
//import Lead from "./pages/Lead/index";
//import LeadList from "./pages/LeadList/index";

const theme = createTheme({

})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="search">
            <Route path="houses" element={<Search estateType="houses"/>}>
              <Route path="results" element={<SearchResults estateType="houses"/>} />
            </Route>
            <Route path="apartments" element={<Search estateType="apartments"/>}>
              <Route path="results" element={<SearchResults estateType="apartments"/>} />
            </Route>
            <Route path="land" element={<Search estateType="land"/>}>
              <Route path="results" element={<SearchResults estateType="land"/>} />
            </Route>
          </Route>
          <Route path="*" element={<Error/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);