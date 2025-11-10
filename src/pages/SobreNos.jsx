import React from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import HamburgerDrawer from "../components/HamburgerDrawer";

const SobreNos = () => {
  return (
    <div style={styles.wrapper}>
      <HamburgerDrawer />

      {/* Container principal */}
      <div style={styles.container}>
        {/* Cabeçalho */}
        <header style={styles.header}>
          <LocationOnOutlinedIcon sx={{ fontSize: 36, color: "#000" }} />
          <h2 style={styles.logoText}>Glimp</h2>
        </header>

        <p style={styles.subtitulo}>
          Grandes Lugares Inspiram Momentos Perfeitos.
        </p>

        {/* Seção - Sobre Nós */}
        <div style={styles.card}>
          <h3>Sobre nós:</h3>
          <p>
            Somos apaixonados por conectar pessoas aos melhores lugares para
            criar experiências inesquecíveis.
          </p>
        </div>

        {/* Missão e Visão */}
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

        {/* Perfis do Instagram */}
        <div style={styles.instagramSection}>
          <h3 style={styles.instagramTitle}>Siga-nos no Instagram</h3>
          <div style={styles.instagramWrapper}>
            <a
              href="https://www.instagram.com/mahh.oliveira07/#"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.instagramLink}
            >
              <InstagramIcon sx={{ color: "#E1306C", fontSize: 30 }} />
              <span>@mahh.oliveira07</span>
            </a>

            <a
              href="https://instagram.com/prieloize"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.instagramLink}
            >
              <InstagramIcon sx={{ color: "#E1306C", fontSize: 30 }} />
              <span>@prieloize</span>
            </a>

            <a
              href="https://instagram.com/gabb_ignacio"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.instagramLink}
            >
              <InstagramIcon sx={{ color: "#E1306C", fontSize: 30 }} />
              <span>@gabb_ignacio</span>
            </a>

            <a
              href="https://instagram.com/livreys"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.instagramLink}
            >
              <InstagramIcon sx={{ color: "#E1306C", fontSize: 30 }} />
              <span>@livreys</span>
            </a>

            <a
              href="https://instagram.com/m.lureys"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.instagramLink}
            >
              <InstagramIcon sx={{ color: "#E1306C", fontSize: 30 }} />
              <span>@m.lureys</span>
            </a>

            <a
              href="https://instagram.com/guilherme_guimaraes11"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.instagramLink}
            >
              <InstagramIcon sx={{ color: "#E1306C", fontSize: 30 }} />
              <span>@guilherme_guimaraes11</span>
            </a>

            <a
              href="https://instagram.com/leo.pedrosoo"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.instagramLink}
            >
              <InstagramIcon sx={{ color: "#E1306C", fontSize: 30 }} />
              <span>@leo.pedrosoo</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SobreNos;

// Estilização

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

  container: {
    flex: 1,
    padding: 50,
    paddingLeft: 200,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f5f5f5",
    overflowY: "auto",
  },

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

  instagramSection: {
    marginTop: 40,
    backgroundColor: "#ddd",
    borderRadius: 16,
    padding: 24,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  instagramTitle: {
    marginBottom: 16,
    color: "#4a5a87",
    fontWeight: "bold",
  },

  instagramWrapper: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
  },

  instagramLink: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    textDecoration: "none",
    color: "#333",
    fontWeight: 500,
  },
};
