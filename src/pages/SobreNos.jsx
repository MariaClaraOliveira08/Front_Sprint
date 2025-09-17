import React, { useState } from "react";
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
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import CustomSnackbar from "../components/CustomSnackbar"; // ajuste o caminho conforme sua estrutura

const SobreNos = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [open, setOpen] = useState(false); // controla Drawer
  const navigate = useNavigate();

  return (
    <div style={styles.wrapper}>
      {/* Botão hamburguer */}
      <IconButton
        onClick={() => setOpen(true)}
        style={styles.menuButton}
        size="large"
      >
        <GiHamburgerMenu />
      </IconButton>

      {/* Drawer */}
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

            <ListItem
              button
              onClick={() => {
                navigate("/home");
                setOpen(false);
              }}
            >
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

        {/* Botão sair embaixo */}
        <List>
          <ListItem button sx={{ color: "red" }}>
            <ListItemIcon>
              <FiLogOut />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItem>
        </List>
      </Drawer>

      {/* Conteúdo principal */}
      <div style={styles.container}>
        <h2 style={styles.logo}>Glimp</h2>
        <p style={styles.subtitulo}>
          Grandes Lugares Inspiram Momentos Perfeitos.
        </p>

        <div style={styles.card}>
          <h3>Sobre nós:</h3>
          <p>
            Somos apaixonados por conectar pessoas aos melhores lugares para
            criar experiências inesquecíveis.
          </p>
        </div>

        <div style={styles.sectionWrapper}>
          <div style={styles.cardSmall}>
            <h4>Missão</h4>
            <p>
              Facilitar o acesso a lugares incríveis com uma experiência
              intuitiva.
            </p>
          </div>
          <div style={styles.cardSmall}>
            <h4>Visão</h4>
            <p>
              Ser referência em descoberta de locais memoráveis em todo o país.
            </p>
          </div>
        </div>
      </div>

      {/* Snackbar */}
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
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Segoe UI, sans-serif",
  },
  menuButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1000,
  },
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 40,
  },
  logo: {
    margin: 0,
    fontSize: 24,
  },
  subtitulo: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#ddd",
    padding: 20,
    borderRadius: 8,
    marginBottom: 30,
  },
  sectionWrapper: {
    display: "flex",
    gap: 20,
  },
  cardSmall: {
    flex: 1,
    backgroundColor: "#ddd",
    padding: 20,
    borderRadius: 8,
  },
};

export default SobreNos;