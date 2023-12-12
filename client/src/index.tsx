import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import HomePage from "./pages/HomePage/index";
import Search from "./pages/Search/index";
import SearchResults from "./pages/SearchResults/index";
import Error from "./pages/Error/index";
import Create from "./pages/Create/index";
import CreateForm from "./pages/CreateForm/index";
import Listing from "./pages/Listing/index";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
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
            <Route path="houses">
              <Route index element={<Search estateType="houses"/>}/>
              <Route path="results" element={<SearchResults estateType="houses"/>} />
            </Route>
            <Route path="apartments">
              <Route index element={<Search estateType="apartments"/>}/>
              <Route path="results" element={<SearchResults estateType="apartments"/>} />
            </Route>
            <Route path="land">
              <Route index element={<Search estateType="land"/>}/>
              <Route path="results" element={<SearchResults estateType="land"/>} />
            </Route>
          </Route>
          <Route path="create">
            <Route index element={<Create/>}/>
            <Route path="house" element={<CreateForm estateType="houses"/>}/>
            <Route path="apartment" element={<CreateForm estateType="apartments"/>}/>
            <Route path="land" element={<CreateForm estateType="land"/>}/>
          </Route>
          <Route path="listing" element={<Listing/>}/>
          <Route path="*" element={<Error/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);