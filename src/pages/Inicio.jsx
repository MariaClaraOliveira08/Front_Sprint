import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronUp } from "react-icons/fa";
import logoImg from "../assets/img.png";
import Mapa from "../components/Mapa"; // 👈 Importe o componente Mapa

const Inicio = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Mantém o scroll desabilitado, pois o mapa ocupará a tela inteira
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const styles = {
    // Container do Mapa (irá ocupar a tela toda)
    mapContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      zIndex: 1, // Z-index baixo para ficar por trás do conteúdo
    },
    // Container para o texto, logo e botão (sobreposto ao mapa)
    contentContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      zIndex: 2, // Z-index alto para ficar por cima do mapa
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: "40px",
      boxSizing: "border-box",
      backgroundColor: "rgba(229, 229, 229, 0.7)", // Adiciona uma transparência ao fundo para o mapa aparecer
    },
    logo: {
      width: 80,
      height: 80,
      objectFit: "contain",
      marginBottom: 20,
      marginLeft: 60,
    },
    texto: {
      fontFamily: "Poppins, sans-serif",
      fontSize: 32,
      color: "#4d4d4d",
      fontWeight: 300,
      lineHeight: "2.2rem",
      whiteSpace: "pre-line",
      marginLeft: 60,
    },
    botao: {
      position: "absolute",
      bottom: 70,
      right: 30,
      width: 45,
      height: 45,
      backgroundColor: "#5e7075",
      borderRadius: "50%",
      border: "none",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    },
  };

  const apiUrl = 'http://localhost:3000/api/estabelecimentos'; // URL da sua API

  return (
    <>
      <div style={styles.mapContainer}>
        <Mapa apiUrl={apiUrl} />
      </div>
      <div style={styles.contentContainer}>
        <img src={logoImg} alt="Logo" style={styles.logo} />
        <div style={styles.texto}>
          Grandes Lugares{"\n"}
          Inspiram Momentos{"\n"}
          Perfeitos.
        </div>
        <button style={styles.botao} onClick={() => navigate("/login")}>
          <FaChevronUp size={20} color="#fff" />
        </button>
      </div>
    </>
  );
};

export default Inicio; 