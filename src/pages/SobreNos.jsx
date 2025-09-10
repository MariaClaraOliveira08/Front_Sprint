import React from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import HamburgerDrawer from "../components/HamburgerDrawer";

const SobreNos = () => {
  return (
    <div style={styles.wrapper}>
      <HamburgerDrawer />

      {/* Conteúdo principal */}
      <div style={styles.container}>
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
  );
};

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Segoe UI, sans-serif",
  },
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 40,
    paddingLeft: 100,
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
  },
  cardSmall: {
    flex: 1,
    backgroundColor: "#ddd",
    padding: 20,
    borderRadius: 8,
  },
};

export default SobreNos;
