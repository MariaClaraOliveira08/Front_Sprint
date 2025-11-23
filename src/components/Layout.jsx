import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";

export default function Layout() {
  const location = useLocation();

  const isHome = location.pathname === "/home";
  const isMapa = location.pathname === "/mapa";

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        overflow: "hidden",
        bgcolor: "#e5e5e5",
      }}
    >
      <Header />

      <main
        style={{
          display: "grid",
          placeItems: "center",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <Outlet />
      </main>

      {/* Remove o Footer na Home e no Mapa */}
      {!isHome && !isMapa && <Footer />}
    </Box>
  );
}
