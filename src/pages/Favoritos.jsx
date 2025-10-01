// Favoritos.jsx

import React, { useState, useEffect } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite"; // coração cheio
import HamburgerDrawer from "../components/HamburgerDrawer";
import api from "../axios/axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  const fetchFavoritos = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("Token do usuário ausente");
      setError("Você precisa estar logado para ver seus favoritos.");
      setLoading(false);
      return;
    }

    try {
      const userId = localStorage.getItem("userId"); // 👈 garante que pega o ID do usuário
      const response = await api.get(`/favoritos/${userId}`);
      setFavoritos(response.data.favoritos || []);
    } catch (error) {
      setError("Erro ao carregar seus favoritos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavoritos();
  }, []);

  const favoritosFiltrados = favoritos.filter((fav) => {
    const textoBusca = searchTerm.toLowerCase();
    return (
      fav.nome_estabelecimento.toLowerCase().includes(textoBusca) ||
      (fav.endereco && fav.endereco.toLowerCase().includes(textoBusca))
    );
  });

  // 🔹 Corrigido: Delete favorito de fato
  const toggleFavorito = async (id) => {
    setDeletingId(id);
    try {
      await api.delete(`/favoritos/${id}`); // 👈 agora chama corretamente sua rota DELETE
      setFavoritos((prev) => prev.filter((fav) => fav.id_favorito !== id));
      setSnackbar({ open: true, message: "Favorito removido com sucesso!", severity: "success" });
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
      setSnackbar({ open: true, message: "Erro ao remover favorito. Tente novamente.", severity: "error" });
    } finally {
      setDeletingId(null);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <div style={styles.wrapper}>
      <HamburgerDrawer />
      <main style={styles.container}>
        <header style={styles.header}>
          <LocationOnOutlinedIcon sx={{ fontSize: 32, color: "#000000ff" }} />
          <h1 style={styles.logoText}>Glimp</h1>
        </header>
        <p style={styles.subtitulo}>Grandes Lugares Inspiram Momentos Perfeitos.</p>
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Pesquisar"
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon sx={{ fontSize: 22, color: "#888" }} />
        </div>
        {loading ? (
          <p>Carregando favoritos...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <section style={styles.listaFavoritos}>
            {favoritosFiltrados.length > 0 ? (
              favoritosFiltrados.map((favorito) => (
                <div key={favorito.id_favorito} style={styles.card}>
                  <button
                    onClick={() => toggleFavorito(favorito.id_favorito)}
                    aria-label="Remover favorito"
                    disabled={deletingId === favorito.id_favorito}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      position: "absolute",
                      top: 10,
                      right: 10,
                    }}
                  >
                    <FavoriteIcon sx={{ fontSize: 26, color: "#e91e63" }} />
                  </button>
                  <div style={styles.infoContainer}>
                    <div style={styles.nome}>{favorito.nome_estabelecimento}</div>
                    <div style={styles.endereco}>{favorito.endereco}</div>
                  </div>
                </div>
              ))
            ) : (
              <p>Nenhum favorito encontrado.</p>
            )}
          </section>
        )}
      </main>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f0f2f5",
    marginBottom: -10,
  },
  container: {
    flex: 1,
    padding: 32,
    paddingLeft: 240,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 40,
  },
  logoText: {
    margin: 5,
    fontSize: 32,
    fontWeight: "700",
    color: "#000000ff",
    userSelect: "none",
  },
  subtitulo: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
    marginTop: -40,
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: "10px 20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    maxWidth: 600,
    marginBottom: 40,
    border: "1px solid #ddd",
    marginTop: 10,
    marginLeft: 70,
  },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  listaFavoritos: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 24,
  },
  card: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    display: "flex",
    gap: 40,
    alignItems: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    cursor: "default",
    userSelect: "none",
    marginLeft: -180,
    position: "relative",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    flex: 1,
  },
  nome: {
    fontWeight: "700",
    fontSize: 18,
    color: "#000",
  },
  endereco: {
    fontSize: 16,
    color: "#555",
  },
};

export default Favoritos;
