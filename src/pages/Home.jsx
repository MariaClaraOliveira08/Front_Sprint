// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SearchIcon from "@mui/icons-material/Search";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ParkIcon from "@mui/icons-material/Park";
import StorefrontIcon from "@mui/icons-material/Storefront";
import api from "../axios/axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import DetalhesModal from "../components/DetalhesModal";
import HamburgerDrawer from "../components/HamburgerDrawer";

export default function Home() {
  const [lugares, setLugares] = useState([]);
  const [busca, setBusca] = useState("");
  const [erro, setErro] = useState(null);
  const [selectedLugar, setSelectedLugar] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // 🔹 Busca os lugares da API
  useEffect(() => {
    const fetchLugares = async () => {
      try {
        const response = await api.get("/lugares");
        setLugares(response.data);
      } catch (error) {
        setErro("Erro ao carregar lugares.");
        setOpenSnackbar(true);
      }
    };
    fetchLugares();
  }, []);

  // 🔹 Filtragem de lugares
  const lugaresFiltrados = lugares.filter((lugar) =>
    lugar.nome.toLowerCase().includes(busca.toLowerCase())
  );

  // 🔹 Categorias simuladas
  const categorias = [
    { nome: "Restaurantes", icone: <RestaurantMenuIcon /> },
    { nome: "Parques", icone: <ParkIcon /> },
    { nome: "Lojas", icone: <StorefrontIcon /> },
  ];

  return (
    <div style={styles.container}>
      <HamburgerDrawer />

      <div style={styles.main}>
        {/* Logo e subtítulo */}
        <div style={styles.logoWrapper}>
          <LocationOnOutlinedIcon style={{ fontSize: 28, color: "#4a5a87" }} />
          <h1 style={styles.logo}>Glimp</h1>
        </div>
        <p style={styles.subtitulo}>Descubra lugares incríveis perto de você</p>

        {/* Barra de busca */}
        <div style={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Buscar lugares..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={styles.search}
          />
          <SearchIcon style={styles.searchIcon} />
        </div>

        {/* Categorias */}
        <div style={styles.categorias}>
          {categorias.map((cat, index) => (
            <button
              key={index}
              style={{
                ...styles.botaoCategoria,
                backgroundColor: "#4a5a87",
                color: "#fff",
              }}
            >
              {cat.icone}
            </button>
          ))}
        </div>

        {/* Subcategorias */}
        <div style={styles.subcategorias}>
          <button style={{ ...styles.botaoSubcategoria, backgroundColor: "#f0f0f0" }}>
            Todos
          </button>
          <button style={{ ...styles.botaoSubcategoria, backgroundColor: "#f0f0f0" }}>
            Abertos agora
          </button>
          <button style={{ ...styles.botaoSubcategoria, backgroundColor: "#f0f0f0" }}>
            Avaliados
          </button>
        </div>

        {/* Lista de lugares */}
        <div style={styles.lugares}>
          {lugaresFiltrados.length > 0 ? (
            lugaresFiltrados.map((lugar, index) => (
              <div key={index} style={styles.lugar}>
                <div style={styles.lugarInfo}>
                  <span style={styles.lugarNome}>{lugar.nome}</span>
                  <span style={styles.lugarHorario}>
                    Horário: {lugar.horario_funcionamento || "Não informado"}
                  </span>
                </div>
                <div style={styles.lugarBotoes}>
                  <button
                    style={{
                      ...styles.botaoAcao,
                      backgroundColor: "#4a5a87",
                    }}
                    onClick={() => setSelectedLugar(lugar)}
                  >
                    Detalhes
                  </button>
                  <button
                    style={{
                      ...styles.botaoAcao,
                      backgroundColor: "#6d83c5",
                    }}
                  >
                    Ver no mapa
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "#777" }}>
              Nenhum lugar encontrado.
            </p>
          )}
        </div>

        {/* Modal de detalhes */}
        {selectedLugar && (
          <DetalhesModal
            lugar={selectedLugar}
            onClose={() => setSelectedLugar(null)}
          />
        )}

        {/* Snackbar de erro */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MuiAlert severity="error" variant="filled">
            {erro}
          </MuiAlert>
        </Snackbar>
      </div>
    </div>
  );
}

// 🎨 Estilos 100% responsivos
const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    minHeight: "100vh",
    width: "100%",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f5f5f5",
  },
  main: {
    flex: 1,
    padding: "2rem",
    paddingLeft: "12rem",
    display: "flex",
    flexDirection: "column",
  },
  logoWrapper: { display: "flex", alignItems: "center", gap: 10 },
  logo: { margin: 0, fontSize: 26, color: "#4a5a87" },
  subtitulo: { fontSize: 14, color: "#777", marginBottom: 20 },
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    width: "90%",
    maxWidth: "700px",
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: "0 15px",
    border: "1px solid #ccc",
    margin: "0 auto 2rem auto",
  },
  search: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "12px 10px",
    fontSize: 14,
  },
  searchIcon: { color: "#555", fontSize: 24, cursor: "pointer", marginLeft: 8 },
  categorias: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
    marginBottom: 20,
  },
  subcategorias: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginBottom: 30,
  },
  botaoCategoria: {
    width: 80,
    height: 80,
    borderRadius: 15,
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    fontSize: 40,
    fontWeight: "bold",
    transition: "0.3s",
  },
  botaoSubcategoria: {
    padding: "8px 16px",
    borderRadius: 20,
    border: "none",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: "bold",
    transition: "0.3s",
  },
  lugares: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    width: "100%",
    maxWidth: 800,
    margin: "0 auto",
    paddingBottom: "2rem",
  },
  lugar: {
    padding: "15px 20px",
    borderRadius: 8,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    transition: "0.2s",
  },
  lugarInfo: { display: "flex", flexDirection: "column", flexGrow: 1 },
  lugarNome: { fontWeight: "bold", fontSize: 16 },
  lugarHorario: { fontSize: 12, color: "#555", marginTop: 4 },
  lugarBotoes: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
  },
  botaoAcao: {
    padding: "8px 15px",
    borderRadius: 8,
    border: "none",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 14,
    minWidth: 100,
  },
};

