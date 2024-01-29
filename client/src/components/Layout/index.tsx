import React from "react";
import { Box, Toolbar } from "@mui/material";

import NavBar from "components/NavBar";
import Footer from "components/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <NavBar />
      <Toolbar />
      {props.children}
      <Box flexGrow={1} />
      <Footer />
    </Box>
  );
}
