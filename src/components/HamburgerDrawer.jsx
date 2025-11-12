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
  const [mostrarModal, setMostrarModal] = useState(false);
  const [userImage, setUserImage] = useState(null);

  const toggleDrawer = (isOpen) => () => setOpen(isOpen);

  // Busca a imagem do usuário logado
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const response = await api.getUsuarioById(userId);
        if (response.data.user) {
          setUserImage(
            `${api.defaults.baseURL}user/${userId}/imagem?${Date.now()}`
          );
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

  const handleConfirmarLogout = () => {
    const userId = localStorage.getItem("userId");
    console.log("Usuário desconectado:", userId);

    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("authenticated");
    sessionStorage.clear();

    setMostrarModal(false);
    setOpen(false);
    navigate("/", { replace: true });
  };

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
          {/* Lista dos menus */}
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
                  {index === 0 && <Divider />} 
                </React.Fragment>
              ))}
            </List>
          </Box>

          {/* Botão de logout */}
          <Box>
            <Divider />
            <List>
              <ListItemButton
                onClick={(e) => {
                  e.stopPropagation();
                  setMostrarModal(true);
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

      {/* Modal de confirmação de logout */}
      {mostrarModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3 style={styles.titulo}>Encerrar sessão</h3>
            <p style={styles.texto}>Você realmente deseja sair da sua conta?</p>

            <div style={styles.botoes}>
              <button
                style={styles.botaoCancelar}
                onClick={() => setMostrarModal(false)}
              >
                Cancelar
              </button>
              <button
                style={styles.botaoConfirmar}
                onClick={handleConfirmarLogout}
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

//Estilização do modal
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "25px 30px",
    borderRadius: 10,
    width: 350,
    boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
    textAlign: "center",
    fontFamily: "Segoe UI, sans-serif",
  },
  titulo: {
    margin: 0,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  texto: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  botoes: {
    display: "flex",
    justifyContent: "space-between",
    gap: 15,
  },
  botaoCancelar: {
    flex: 1,
    padding: "10px",
    borderRadius: 8,
    border: "1px solid #ccc",
    backgroundColor: "#f3f4f6",
    cursor: "pointer",
    fontWeight: "bold",
  },
  botaoConfirmar: {
    flex: 1,
    padding: "10px",
    borderRadius: 8,
    border: "none",
    backgroundColor: "red",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default HamburgerDrawer;