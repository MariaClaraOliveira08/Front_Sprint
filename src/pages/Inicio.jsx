import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/img.png"; 

const Inicio = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "40px",
        boxSizing: "border-box",
        backgroundColor: "rgba(229, 229, 229, 0.7)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Imagem do topo */}
      <Box
        component="img"
        src={logoImg}
        alt="Logo"
        sx={{
          width: 80,
          height: 80,
          objectFit: "contain",
          mb: 2,
          ml: 4,
        }}
      />

      {/* Texto principal */}
      <Typography
        sx={{
          fontSize: 32,
          color: "#4d4d4d",
          fontWeight: 300,
          lineHeight: "2.2rem",
          whiteSpace: "pre-line",
          ml: 4,
        }}
      >
        Grandes Lugares{"\n"}Inspiram Momentos{"\n"}Perfeitos.
      </Typography>

      {/* Botão circular com seta */}
      <Button
        onClick={() => navigate("/login")}
        sx={{
          position: "absolute",
          bottom: 70,
          right: 30,
          width: 55,
          height: 55,
          borderRadius: "50%",
          backgroundColor: "#5e7075",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: 0,
          "&:hover": { backgroundColor: "#4d5f63" },
        }}
      >
        <FaChevronUp size={22} color="#fff" />
      </Button>

      {/* Link "Continuar sem conta" */}
      <Typography
        sx={{
          position: "absolute",
          bottom: 50,
          right: 20,
          cursor: "pointer",
          fontWeight: "bold",
          color: "#5e7075",
          textDecoration: "underline",
          fontSize: 14,
        }}
        onClick={() => navigate("/home")}
      >
        Continuar sem conta
      </Typography>
    </Box>
  );
};

export default Inicio;