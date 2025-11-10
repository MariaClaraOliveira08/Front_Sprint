import React from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import HamburgerDrawer from "../components/HamburgerDrawer";

const SobreNos = () => {
  return (
    <div style={styles.wrapper}>
      <HamburgerDrawer />

      {/* Container principal (mesmo padrão da Home) */}
      <div style={styles.container}>
        {/* Cabeçalho idêntico ao da Home */}
        <header style={styles.header}>
          <LocationOnOutlinedIcon sx={{ fontSize: 36, color: "#000" }} />
          <h2 style={styles.logoText}>Glimp</h2>
        </header>

        <p style={styles.subtitulo}>
          Grandes Lugares Inspiram Momentos Perfeitos.
        </p>

        {/* Seções de conteúdo */}
        <div style={styles.card}>
          <h3>Sobre nós:</h3>
          <p>
            Somos apaixonados por conectar pessoas aos melhores lugares para
            criar experiências inesquecíveis.
          </p>
        </div>

        <div style={styles.sectionWrapper}>
          <div style={styles.cardSmall}>
            <h4>Missão</h4>
            <p>
              Facilitar o acesso a lugares incríveis com uma experiência
              intuitiva.
            </p>
          </div>
          <div style={styles.cardSmall}>
            <h4>Visão</h4>
            <p>
              Ser referência em descoberta de locais memoráveis em todo o país.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SobreNos;

// ========================
// 🎨 Estilos atualizados
// ========================
const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f5f5f5",
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },

  // Mesmo padrão da Home e Favoritos
  container: {
    flex: 1,
    padding: 50,
    paddingLeft: 200,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f5f5f5",
    overflowY: "auto",
  },

  // Cabeçalho igual à Home
  header: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  logoText: {
    margin: 0,
    fontSize: 26,
    color: "#4a5a87",
    fontWeight: 700,
  },
  subtitulo: {
    fontSize: 14,
    color: "#777",
    marginBottom: 30,
  },

  // Cards e seções
  card: {
    backgroundColor: "#ddd",
    padding: 24,
    borderRadius: 16,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: 30,
  },
  sectionWrapper: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
  },
  cardSmall: {
    flex: 1,
    minWidth: 250,
    backgroundColor: "#ddd",
    padding: 24,
    borderRadius: 16,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
};