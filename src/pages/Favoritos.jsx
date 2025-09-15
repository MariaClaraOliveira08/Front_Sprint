import React from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Favoritos = () => {
  return (
    <div style={styles.wrapper}>
      <HamburgerDrawer />
      <div style={styles.container}>
        <header style={styles.header}>
          <LocationOnOutlinedIcon sx={{ fontSize: 28, color: "#000", marginLeft: -15 }} />
          <h1 style={styles.logoText}>Glimp</h1>
        </header>

        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Pesquisar..."
            style={styles.searchInput}
          />
          <SearchIcon sx={{ fontSize: 18, color: "#888" }} />
        </div>

        <p style={styles.title}>Meus Favoritos:</p>

        <section style={styles.listaFavoritos}>
          {[...Array(3)].map((_, i) => (
            <div key={i} style={styles.card} tabIndex={0}>
              {/* Espaço vazio para simular o card em branco */}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "#e1e1e1",  // Fundo cinza claro que ocupa toda a tela
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 40,
    boxSizing: "border-box",
  },
  container: {
    maxWidth: 600,
    width: "100%",
    backgroundColor: "#e1e1e1",  // Pode até tirar daqui, pois está no wrapper
    borderRadius: 20,
    padding: 30,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    marginBottom: 20,
  },
  
  logoText: {
    fontSize: 24,
    color: "#000",
    margin: 0,
    userSelect: "none",
    fontWeight: 600,
    marginLeft: 2,
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: "8px 15px",
    border: "1px solid #ccc",
    marginBottom: 30,
  },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: 14,
    color: "#555",
    backgroundColor: "transparent",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "500",
    color: "#333",
  },
  listaFavoritos: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  card: {
    backgroundColor: "#fff",
    height: 48,
    borderRadius: 12,
    cursor: "pointer",
    outline: "none",
  },
};

export default Favoritos;
