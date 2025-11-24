import React, { useState, useEffect } from "react";
import {
  useTheme,
  useMediaQuery,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";

import HamburgerDrawer from "../components/HamburgerDrawer";
import api from "../axios/axios";

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

  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");

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
    } catch (err) {
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
    return (
      fav?.nome_estabelecimento?.toLowerCase().includes(textoBusca) ||
      fav?.endereco?.toLowerCase().includes(textoBusca)
    );
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
    } catch {
      setSnackbar({
        open: true,
        message: "Erro ao remover favorito.",
        severity: "error",
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <HamburgerDrawer />

      {/* --------------------------- CONTEÚDO PRINCIPAL --------------------------- */}
      <Box
        sx={{
          flex: 1,
          p: isMobile ? 2 : isTablet ? 4 : 6,
          pl: isMobile ? 2 : isTablet ? 10 : 25,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {/* HEADER IGUAL AO SOBRE NÓS */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <LocationOnOutlinedIcon sx={{ fontSize: 36, color: "#000" }} />
          <Typography
            variant={isMobile ? "h5" : "h4"}
            sx={{ color: "#4a5a87", fontWeight: 700 }}
          >
            Glimp
          </Typography>
        </Box>

        <Typography
          sx={{
            fontSize: isMobile ? 13 : 15,
            color: "#777",
            mb: 3,
            mt: 1,
          }}
        >
          Grandes Lugares Inspiram Momentos Perfeitos.
        </Typography>

        {/* BARRA DE PESQUISA */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: 25,
            padding: "10px 20px",
            maxWidth: isMobile ? "100%" : 500,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            border: "1px solid #ddd",
            mb: 4,
          }}
        >
          <input
            type="text"
            placeholder="Pesquisar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              fontSize: 16,
            }}
          />
          <SearchIcon sx={{ fontSize: 22, color: "#888" }} />
        </Box>

        {/* LISTA DE FAVORITOS */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : isTablet
              ? "1fr 1fr"
              : "1fr 1fr 1fr",
            gap: 3,
            pr: 2,
          }}
        >
          {loading ? (
            <Typography>Carregando...</Typography>
          ) : error ? (
            <Typography color="red">{error}</Typography>
          ) : favoritosFiltrados.length > 0 ? (
            favoritosFiltrados.map((fav) => (
              <Box
                key={fav.id_favorito}
                sx={{
                  backgroundColor: "#fff",
                  p: 3,
                  borderRadius: 3,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
                  {fav.nome_estabelecimento}
                </Typography>
                <Typography sx={{ fontSize: 15, color: "#555" }}>
                  {fav.endereco}
                </Typography>

                {/* BOTÃO REMOVER */}
                <button
                  onClick={() => toggleFavorito(fav.id_favorito)}
                  disabled={deletingId === fav.id_favorito}
                  style={{
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    position: "absolute",
                    top: 12,
                    right: 12,
                  }}
                >
                  <FavoriteIcon sx={{ fontSize: 28, color: "#e91e63" }} />
                </button>
              </Box>
            ))
          ) : (
            <Typography>Nenhum favorito encontrado.</Typography>
          )}
        </Box>
      </Box>

      {/* SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3500}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Favoritos;