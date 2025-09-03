import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import {
  Home,
  FavoriteBorder,
  ChatBubbleOutline,
  Settings,
  AccountCircle,
  Logout,
  Info,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Início", icon: <Home fontSize="small" />, route: "/home" },
    {
      label: "Favoritos",
      icon: <FavoriteBorder fontSize="small" />,
      route: "/favoritos",
    },
    {
      label: "Avaliações",
      icon: <ChatBubbleOutline fontSize="small" />,
      route: "/avaliacoes",
    },
    {
      label: "Configurações",
      icon: <Settings fontSize="small" />,
      route: "/configuracoes",
    },
    { label: "Sobre nós", icon: <Info fontSize="small" />, route: "/sobre" },
  ];

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 180,
        height: "100vh",
        bgcolor: "#d9d9d9",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRight: "1px solid #ccc",
        boxSizing: "border-box",
        padding: 2,
        zIndex: 1000,
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
            marginTop: "10px",
            marginBottom: 2,
          }}
          onClick={() => navigate("/perfil")}
        >
          <AccountCircle fontSize="medium" />
          <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>
            Perfil
          </Typography>
        </Box>
        <Divider />
      </Box>

      {/* Menu */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 4, 
          flexGrow: 1, 
        }}
      >
        {menuItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
            }}
            onClick={() => navigate(item.route)}
          >
            {item.icon}
            <Typography fontSize={16}>{item.label}</Typography>
          </Box>
        ))}
      </Box>

      {/* Rodapé - Sair */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: "red",
          cursor: "pointer",
          top: -3,
        }}
        onClick={() => navigate("/")}
      >
        <Logout fontSize="small" />
        <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>Sair</Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;