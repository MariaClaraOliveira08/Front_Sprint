import React from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronUp } from "react-icons/fa";
import logoImg from "../assets/img.png";

const Inicio = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      backgroundColor: "#e5e5e5",
      padding: "40px",
      borderRadius: "4px",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "100%",
    //   maxWidth: 700,
      height: "100vh", 
      margin: "0", 
      justifyContent: "center", 
      alignItems: "flex-start", 
    },
    logo: {
      width: 80,
      height: 80,
      objectFit: "contain",
      marginBottom: 20,
      marginLeft: 60
    },
    texto: {
      fontFamily: "Poppins, sans-serif",
      fontSize: 32,
      color: "#4d4d4d",
      fontWeight: 300,
      lineHeight: "2.2rem",
      whiteSpace: "pre-line",
      marginLeft: 60
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

  return (
    <div style={styles.container}>
      <img src={logoImg} alt="Logo" style={styles.logo} />
      <div style={styles.texto}>
        Grandes Lugares{"\n"}
        Inspiram Momentos{"\n"}
        Perfeitos.
      </div>
      <button style={styles.botao} onClick={() => navigate("/")}>
        <FaChevronUp size={20} color="#fff" />
      </button>
    </div>
  );
};

export default Inicio;
