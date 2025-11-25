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

      {/* HEADER FIXO */}
      <Header />

      {/* MAIN COM ESPAÇO PARA NÃO FICAR ATRÁS DO HEADER */}
      <main
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          overflowX: "hidden",
          overflowY: "auto",

          // 🔥 ESSA LINHA RESOLVE O PROBLEMA DO TÍTULO CORTADO
          paddingTop: 45, 
        }}
      >
        <Outlet />
      </main>

      {/* FOOTER EXCETO EM HOME E MAPA */}
      {!isHome && !isMapa && <Footer />}
    </Box>
  );
}
