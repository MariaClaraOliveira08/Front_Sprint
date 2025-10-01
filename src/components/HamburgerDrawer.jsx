import React, { useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Home,
  FavoriteBorder,
  ChatBubbleOutline,
  AccountCircle,
  Logout,
  Info,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const HamburgerDrawer = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 🔹 pega a rota atual
  const [open, setOpen] = useState(false);

  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };

  const menuItems = [
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
          {/* Conteúdo principal */}
          <Box sx={{ marginTop: 6 }}>
            <List>
              <ListItemButton
                onClick={() => navigate("/perfil")}
                sx={{
                  bgcolor: location.pathname === "/perfil" ? "#b0b0b0" : "inherit",
                }}
              >
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="Perfil" />
              </ListItemButton>
              <Divider />
              {menuItems.map((item) => (
                <ListItemButton
                  key={item.label}
                  onClick={() => navigate(item.route)}
                  sx={{
                    bgcolor:
                      location.pathname === item.route ? "#b0b0b0" : "inherit",
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              ))}
            </List>
          </Box>

          {/* Botão de sair */}
          <Box>
            <Divider />
            <List>
              <ListItemButton
                onClick={() => {
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
