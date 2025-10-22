import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <main
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          minHeight: 0,
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
