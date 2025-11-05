import React, { useState, useEffect } from "react";
import {
  Box,
  Divider,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@mui/material";
import {
  Home,
  FavoriteBorder,
  ChatBubbleOutline,
  Logout,
  Info,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../axios/axios";

const HamburgerDrawer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [userImage, setUserImage] = useState(null);

  const toggleDrawer = (isOpen) => () => setOpen(isOpen);

  // 🔹 Busca imagem do usuário logado
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const response = await api.getUsuarioById(userId);
        if (response.data.user) {
          setUserImage(`${api.defaults.baseURL}user/${userId}/imagem?${Date.now()}`);
        }
      } catch (error) {
        console.error("Erro ao buscar imagem do usuário no menu:", error);
      }
    };

    fetchUser();
  }, []);

  const menuItems = [
    {
      label: "Perfil",
      icon: (
        <Avatar
          src={userImage}
          alt="Foto do usuário"
          sx={{ width: 24, height: 24 }}
        />
      ),
      route: "/perfil",
    },
    { label: "Início", icon: <Home />, route: "/home" },
    { label: "Favoritos", icon: <FavoriteBorder />, route: "/favoritos" },
    { label: "Avaliações", icon: <ChatBubbleOutline />, route: "/avaliacao" },
    { label: "Sobre nós", icon: <Info />, route: "/sobre" },
  ];

  return (
    <>
      <IconButton
        onClick={toggleDrawer(true)}
        aria-label="open drawer"
        sx={{ position: "fixed", top: -2.5, left: 10, zIndex: 1400 }}
      >
        <MenuIcon fontSize="large" />
      </IconButton>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 210,
            height: "100%",
            bgcolor: "#d9d9d9",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRight: "1px solid #ccc",
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {/* 🔹 Lista de menus */}
          <Box sx={{ marginTop: 6 }}>
            <List>
              {menuItems.map((item, index) => (
                <React.Fragment key={item.label}>
                  <ListItemButton
                    onClick={() => navigate(item.route)}
                    sx={{
                      bgcolor:
                        location.pathname === item.route ? "#b0b0b0" : "inherit",
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>

                  {/* 🔹 Divisor após o primeiro item (Perfil) */}
                  {index === 0 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Box>

          {/* 🔹 Botão de sair */}
          <Box>
            <Divider />
            <List>
              <ListItemButton
                onClick={() => {
                  localStorage.removeItem("userId");
                  navigate("/");
                  setOpen(false);
                }}
                sx={{ color: "red" }}
              >
                <ListItemIcon>
                  <Logout sx={{ color: "red" }} />
                </ListItemIcon>
                <ListItemText primary="Sair" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default HamburgerDrawer;
