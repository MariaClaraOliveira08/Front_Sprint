import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import Logoff from "../components/Logoff";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import CustomSnackbar from "../components/CustomSnackbar"; // <-- Importa o seu componente

const Home = () => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("praia");
  const [lugarSelecionado, setLugarSelecionado] = useState(1);
  const [open, setOpen] = useState(false); // controla o Drawer
  const navigate = useNavigate();

  // Estado do Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const categorias = [
    { id: "comida", emoji: "🍽️" },
    { id: "praia", emoji: "🏖️" },
    { id: "shopping", emoji: "🏛️" },
  ];

  const lugares = [
    { id: 1, nome: "Restaurante Sabor da Casa" },
    { id: 2, nome: "Pizzaria Brazetto" },
    { id: 3, nome: "Loja Do Osmar" },
    { id: 4, nome: "Sesc" },
  ];

  return (
    <div style={styles.container}>
      {/* BOTÃO MENU */}
      <IconButton
        onClick={() => setOpen(true)}
        style={styles.menuButton}
        size="large"
      >
        <GiHamburgerMenu />
      </IconButton>

      {/* DRAWER DO MATERIAL UI */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#D9D9D9",
            width: 250,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        <div>
          <List>
            <ListItem
              button
              onClick={() => {
                navigate("/perfil");
                setOpen(false);
              }}
            >
              <ListItemIcon>
                <FaUser />
              </ListItemIcon>
              <ListItemText primary="Perfil" />
            </ListItem>

            <Divider />

            <ListItem button>
              <ListItemText primary="Início" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                navigate("/sobre");
                setOpen(false);
              }}
            >
              <ListItemText primary="Sobre nós" />
            </ListItem>
          </List>
        </div>

        {/* BOTÃO SAIR FIXO EMBAIXO */}
        <List>
          <ListItem button sx={{ color: "red" }}>
            <ListItemIcon>
              <FiLogOut />
            </ListItemIcon>
            <Logoff />
          </ListItem>
        </List>
      </Drawer>

      {/* CONTEÚDO PRINCIPAL */}
      <div style={styles.main}>
        <div style={styles.logoWrapper}>
          <LocationOnOutlinedIcon sx={{ fontSize: 36, color: "#000" }} />
          <h2 style={styles.logo}>{"Glimp"}</h2>
        </div>
        <p style={styles.subtitulo}>
          Grandes Lugares Inspiram Momentos Perfeitos.
        </p>

        {/* BARRA DE PESQUISA */}
        <div style={styles.searchWrapper}>
          <input type="text" placeholder="Pesquisar..." style={styles.search} />
          <SearchIcon style={styles.searchIcon} />
        </div>

        {/* CATEGORIAS */}
        <div style={styles.categorias}>
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setCategoriaSelecionada(cat.id);
                setSnackbar({
                  open: true,
                  message: `Categoria "${cat.id}" selecionada!`,
                  severity: "info",
                });
              }}
              style={{
                ...styles.botaoCategoria,
                backgroundColor:
                  categoriaSelecionada === cat.id ? "#4a5a87" : "#d9d9d9",
                color: categoriaSelecionada === cat.id ? "#fff" : "#000",
              }}
            >
              {cat.emoji}
            </button>
          ))}
        </div>

        {/* LUGARES */}
        <div style={styles.lugares}>
          {lugares.map((lugar) => (
            <div
              key={lugar.id}
              onClick={() => {
                setLugarSelecionado(lugar.id);
                setSnackbar({
                  open: true,
                  message: `Você selecionou "${lugar.nome}"!`,
                  severity: "success",
                });
              }}
              style={{
                ...styles.lugar,
                backgroundColor:
                  lugarSelecionado === lugar.id ? "#4a5a87" : "#fff",
                color: lugarSelecionado === lugar.id ? "#fff" : "#000",
              }}
            >
              {lugar.nome}
            </div>
          ))}
        </div>
      </div>

      {/* SNACKBAR */}
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100%",
    fontFamily: "Segoe UI, sans-serif",
    overflow: "hidden",
  },
  menuButton: {
    position: "absolute",
    top: 45,
    left: 3,
    zIndex: 1000,
  },
  main: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 50,
    overflow: "hidden",
    width: "100%",
  },
  logoWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    margin: 0,
    fontSize: 26,
    color: "#4a5a87",
  },
  subtitulo: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
  },
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    width: "70%",
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: "0 15px",
    border: "1px solid #ccc",
    marginBottom: 30,
  },
  search: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "12px 10px",
    fontSize: 14,
  },
  searchIcon: {
    color: "#555",
    fontSize: 24,
    cursor: "pointer",
    marginLeft: 8,
  },
  categorias: {
    display: "flex",
    justifyContent: "space-between",
    gap: 20,
    marginBottom: 30,
  },
  botaoCategoria: {
    width: 80,
    height: 80,
    borderRadius: 15,
    border: "none",
    fontSize: 36,
    backgroundColor: "#f4f4f4",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  lugares: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  lugar: {
    padding: "15px 20px",
    borderRadius: 8,
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: "#f4f4f4",
    color: "#333",
    transition: "0.2s",
  },
};

export default Home;
