import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div
      style={{
        minHeight: "100dvh", // altura da viewport (mobile-friendly)
        display: "grid",
        gridTemplateRows: "auto 1fr auto", // header | main | footer
        overflow: "hidden", // impede scroll global
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
    </div>
  );
}
