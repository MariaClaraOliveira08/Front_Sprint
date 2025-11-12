import React, { useState, useEffect } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
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
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const fetchFavoritos = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Você precisa estar logado para ver seus favoritos.");
      setLoading(false);
      return;
    }

    try {
      const res = await api.get("/favoritos");
      setFavoritos(res.data.favoritos || []);
      console.log(res.data.favoritos);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar favoritos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavoritos();
  }, []);

  const favoritosFiltrados = favoritos.filter((fav) => {
    const textoBusca = searchTerm.toLowerCase();
    const nome = fav?.nome_estabelecimento?.toLowerCase() || "";
    const endereco = fav?.endereco?.toLowerCase() || "";
    return nome.includes(textoBusca) || endereco.includes(textoBusca);
  });

  const toggleFavorito = async (id) => {
    setDeletingId(id);
    try {
      await api.delete(`/favoritos/${id}`);
      setFavoritos((prev) => prev.filter((fav) => fav.id_favorito !== id));
      setSnackbar({
        open: true,
        message: "Favorito removido com sucesso!",
        severity: "success",
      });
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Erro ao remover favorito.",
        severity: "error",
      });
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

      {/* Ícone de coração REMOVIDO */}

      <main style={styles.container}>
        <header style={styles.header}>
          <LocationOnOutlinedIcon sx={{ fontSize: 32, color: "#000" }} />
          <h1 style={styles.logoText}>Glimp</h1>
        </header>

        <p style={styles.subtitulo}>
          Grandes Lugares Inspiram Momentos Perfeitos.
        </p>

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
              favoritosFiltrados.map((fav) => (
                <div key={fav.id_favorito} style={styles.card}>
                  <div style={styles.infoContainer}>
                    <div style={styles.nome}>{fav.nome_estabelecimento}</div>
                    <div style={styles.endereco}>{fav.endereco}</div>
                  </div>

                  <button
                    onClick={() => toggleFavorito(fav.id_favorito)}
                    disabled={deletingId === fav.id_favorito}
                    style={styles.deleteButton}
                  >
                    <FavoriteIcon sx={{ fontSize: 26, color: "#e91e63" }} />
                  </button>
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
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
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
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f0f2f5",
    position: "relative",
  },
  container: {
    flex: 1,
    padding: 32,
    paddingLeft: 100,
    display: "flex",
    flexDirection: "column",
  },
  header: { display: "flex", alignItems: "center", gap: 12, marginBottom: 40 },
  logoText: { margin: 5, fontSize: 32, fontWeight: 700, color: "#000" },
  subtitulo: { fontSize: 14, color: "#777", marginBottom: 20, marginTop: -40 },
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
    fontWeight: 500,
  },
  listaFavoritos: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 24,
    maxHeight: "70vh",
    overflowY: "auto",
    paddingRight: 16,
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
    position: "relative",
  },
  infoContainer: { display: "flex", flexDirection: "column", gap: 6, flex: 1 },
  nome: { fontWeight: 700, fontSize: 18, color: "#000" },
  endereco: { fontSize: 16, color: "#555" },
  deleteButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    position: "absolute",
    top: 10,
    right: 10,
  },
};

export default Favoritos;
