import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaChevronUp } from "react-icons/fa";
import logoImg from "../assets/img.png";

const Inicio = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      backgroundColor: "#e5e5e5",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      width: "100vw", 
      height: "100vh", 
      margin: 0, 
      padding: 0, 
      position: "relative",
    },
    logo: {
      width: 80,
      height: 80,
      objectFit: "contain",
      marginBottom: 20,
      marginLeft: 60,
      position: "relative",
      top: 100,
    },
    texto: {
      fontFamily: "darker grotesque",
      fontSize: 40,
      color: "#4A4A4A",
      lineHeight: "2.2rem",
      whiteSpace: "pre-line",
      marginLeft: 60,
      position: "relative",
      top: 100,
    },
    botao: {
      width: 45,
      height: 45,
      backgroundColor: "#5e7075",
      borderRadius: "50%",
      border: "none",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      position: "relative",
      top: 40,
    },
    Link: {
      whiteSpace: "nowrap",
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

      {/* Botão com link embaixo */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          marginTop: "200px",
          marginLeft: 950,
        }}
      >
        <button style={styles.botao} onClick={() => navigate("/login")}>
          <FaChevronUp size={10} color="#fff" />
        </button>

        <Link
          to="/home"
          style={{
            textDecoration: "none",
            color: "#4a5a87",
            fontWeight: 600,
            whiteSpace: "nowrap",
            marginTop: 40,
          }}
        >
          Continuar sem conta? Clique aqui!
        </Link>
      </div>
    </div>
  );
};

export default Inicio;