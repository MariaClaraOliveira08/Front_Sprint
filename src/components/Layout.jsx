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
        bgcolor: "#e5e5e5",
      }}
    >

      <Header />

      <main
        style={{
          width: "100%",
          height: "100%",
          display: "block",     // 🔥 deixa o conteúdo fluir normal
          overflowX: "hidden",  // 🔥 só bloqueia rolagem lateral
          overflowY: "auto",    // 🔥 permite rolagem normal quando precisar
        }}
      >
        <Outlet />
      </main>

      {!isHome && !isMapa && <Footer />}
    </Box>
  );
}