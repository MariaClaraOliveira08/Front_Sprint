import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const BarraLateral = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 180,
        height: "100vh",
        bgcolor: "#d9d9d9",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRight: "1px solid #ccc",
        boxSizing: "border-box",
        padding: 2,
      }}
    >
      {/* Topo com perfil */}
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            cursor: "pointer",
            textDecoration: "underline",
            marginTop: "40px",
          }}
          onClick={() => navigate("/perfil")}
        >
          <FaUser size={24} />
          <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>
            Perfil
          </Typography>
        </Box>
        <Divider sx={{ mt: 2 }} />
      </Box>

      {/* Menu central */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2, // espaçamento uniforme entre os itens
        }}
      >
        {/* Apenas o botão "Sobre nós" */}
        <Typography
          sx={{
            cursor: "pointer",
            fontSize: 16,
            position: "relative",
            top: "168px",
          }}
          onClick={() => navigate("/sobre")}
        >
          Sobre nós
        </Typography>
      </Box>

      {/* Rodapé com sair */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: "red",
          cursor: "pointer",
          mb: 2,
          position: "relative",
          top: "-20px", // valor negativo sobe o botão
        }}
        onClick={() => navigate("/")}
      >
        <FiLogOut size={18} />
        <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>Sair</Typography>
      </Box>
    </Box>
  );
};

export default BarraLateral;