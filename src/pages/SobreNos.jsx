import React from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import InstagramIcon from "@mui/icons-material/Instagram"; // ← import do ícone do Instagram
import HamburgerDrawer from "../components/HamburgerDrawer";

const SobreNos = () => {
  return (
    <div style={styles.wrapper}>
      <HamburgerDrawer />

      <div style={styles.container}>
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

          {/* 🔗 Link para Instagram */}
          <div style={styles.socialWrapper}>
            <a
              href="https://www.instagram.com/mahh.oliveira07"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.instagramLink}
            >
              <InstagramIcon sx={{ fontSize: 28, color: "#E4405F" }} />
              <span>@mahh.oliveira07</span>
            </a>

            <a
              href="https://www.instagram.com/prieloize"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.instagramLink}
            >
              <InstagramIcon sx={{ fontSize: 28, color: "#E4405F" }} />
              <span>@prieloize</span>
            </a>

            <a
              href="https://www.instagram.com/gabb_ignacio"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.instagramLink}
            >
              <InstagramIcon sx={{ fontSize: 28, color: "#E4405F" }} />
              <span>@gabb_ignacio</span>
            </a>

            <a
              href="https://www.instagram.com/m.lureys"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.instagramLink}
            >
              <InstagramIcon sx={{ fontSize: 28, color: "#E4405F" }} />
              <span>@m.lureys</span>
            </a>

            <a
              href="https://www.instagram.com/livreys"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.instagramLink}
            >
              <InstagramIcon sx={{ fontSize: 28, color: "#E4405F" }} />
              <span>@livreys</span>
            </a>

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
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 40,
    boxSizing: "border-box",
  },
  content: {
    maxWidth: 800,
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
  socialWrapper: {
    marginTop: 40,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  instagramLink: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    textDecoration: "none",
    color: "#5e758f",
    fontWeight: 500,
  },
};

export default SobreNos;
