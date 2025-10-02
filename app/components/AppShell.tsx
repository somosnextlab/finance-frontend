"use client";
import { Box } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{ xs: "1fr", md: "256px 1fr" }}
      gridTemplateRows="64px 1fr 48px"
      minHeight="100dvh"
    >
      <Box gridColumn="1 / -1" gridRow="1">
        <Header />
      </Box>
      <Box display={{ xs: "none", md: "block" }} gridRow="2" gridColumn="1">
        <Sidebar />
      </Box>
      <Box gridRow="2" gridColumn={{ xs: "1", md: "2" }} component="main" p={2}>
        {children}
      </Box>
      <Box gridColumn="1 / -1" gridRow="3">
        <Footer />
      </Box>
    </Box>
  );
}
