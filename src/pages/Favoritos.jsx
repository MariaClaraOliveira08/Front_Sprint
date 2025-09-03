import React from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import BarraLateral from "../components/BarraLateral";

const Favoritos = () => {
  return (
    <div style={styles.wrapper}>
      <BarraLateral />

      <main style={styles.container}>
        <header style={styles.header}>
          <LocationOnOutlinedIcon sx={{ fontSize: 32, color: "#000000ff" }} />
          <h1 style={styles.logoText}>Glimp</h1>
        </header>

        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Pesquisar"
            style={styles.searchInput}
          />
          <SearchIcon sx={{ fontSize: 22, color: "#888" }} />
        </div>

        <section style={styles.listaFavoritos}>
          {[...Array(10)].map((_, i) => (
            <div key={i} style={styles.card} tabIndex={0}>
              <FavoriteBorderIcon sx={{ color: "#e91e63", fontSize: 26 }} />
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f0f2f5",
  },
  container: {
    flex: 1,
    padding: 32,
    paddingLeft: 240, // espaço para a barra lateral fixa
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 40,
  },
  logoText: {
    margin: 0,
    fontSize: 32,
    fontWeight: "700",
    color: "#000000ff",
    userSelect: "none",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#cacacaff",
    borderRadius: 25,
    padding: "10px 20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    maxWidth: 600,
    marginBottom: 40,
    border: "1px solid #ddd",
  },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  listaFavoritos: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
    gap: 24,
  },
  card: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    userSelect: "none",
  },
  cardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  },
};

export default Favoritos;
