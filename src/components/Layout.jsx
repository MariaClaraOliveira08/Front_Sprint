import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      <main
        style={{
          display: "flex",
          justifyContent: "center", // centraliza horizontalmente
          alignItems: "center", // centraliza verticalmente
          height: "100vh", // ocupa a altura total da viewport
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
