import React from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import HamburgerDrawer from "../components/HamburgerDrawer";

const SobreNos = () => {
  return (
    <div style={styles.wrapper}>
      <HamburgerDrawer />

      {/* Fundo cinza claro expandido */}
      <div style={styles.container}>
        {/* Container centralizado com largura fixa */}
        <div style={styles.content}>
          <div style={styles.logoWrapper}>
            <LocationOnOutlinedIcon sx={{ fontSize: 36, color: "#000" }} />
            <h2 style={styles.logo}>Glimp</h2>
          </div>

          <p style={styles.subtitulo}>
            Grandes Lugares Inspiram Momentos Perfeitos.
          </p>

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
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    fontFamily: "Segoe UI, sans-serif",
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    height: "100vh",
    overflowY: "auto",
    display: "flex",
    justifyContent: "center", // centraliza o conteúdo
    alignItems: "flex-start", // alinha ao topo
    padding: 40,
    boxSizing: "border-box",
  },
  content: {
    maxWidth: 800, // limita largura do conteúdo centralizado
    width: "100%",
  },
  logoWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  logo: {
    margin: 0,
    fontSize: 24,
    color: "#4a5a87",
    lineHeight: 1,
  },
  subtitulo: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#ddd",
    padding: 20,
    borderRadius: 8,
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
    padding: 20,
    borderRadius: 8,
  },
};

export default SobreNos;
