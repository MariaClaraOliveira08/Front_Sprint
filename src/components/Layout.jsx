// layout.js
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

export default function Layout() {
  return (
    <Box
      sx={{
        minHeight: "100dvh", // altura da viewport (mobile-friendly)
        display: "grid",
        gridTemplateRows: "auto 1fr auto", // header | main | footer
        overflow: "hidden", // impede scroll global
        bgcolor: "#e5e5e5", // Cor de fundo para a tela inteira
      }}
    >
      <Header />
      <main
        style={{
          display: "grid",
          placeItems: "center", // centraliza qualquer página
          overflow: "hidden", // garante sem scroll dentro do main
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </Box>
  );
}