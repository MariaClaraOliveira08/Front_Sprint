import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Rating,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
  Modal,
} from "@mui/material";
import { Favorite, FavoriteBorder, RateReview } from "@mui/icons-material";
import api from "../axios/axios";

const SidebarAvaliacoes = ({
  googlePlaceId,
  nomeEstabelecimento,
  endereco,
}) => {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [comentario, setComentario] = useState("");
  const [nota, setNota] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [curtido, setCurtido] = useState(false);
  const [idFavorito, setIdFavorito] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  // controle do modal lateral
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userId = localStorage.getItem("userId");

  const fetchAvaliacoes = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/avaliacoes/${googlePlaceId}`);
      setAvaliacoes(res.data.avaliacoes || []);
    } catch (err) {
      console.error("Erro ao buscar avaliações:", err.response || err);
      setAvaliacoes([]);
    } finally {
      setLoading(false);
    }
  };

  const checkFavorito = async () => {
    if (!userId || !googlePlaceId) return;

    try {
      const res = await api.get("/favoritos");
      const favoritos = res.data.favoritos || [];
      const favoritoEncontrado = favoritos.find(
        (f) => f.google_place_id === googlePlaceId
      );

      if (favoritoEncontrado) {
        setCurtido(true);
        setIdFavorito(favoritoEncontrado.id_favorito);
      } else {
        setCurtido(false);
        setIdFavorito(null);
      }
    } catch (err) {
      console.error("Erro ao verificar favorito:", err);
    }
  };

  useEffect(() => {
    if (googlePlaceId) {
      fetchAvaliacoes();
      checkFavorito();
    }
  }, [googlePlaceId]);

  const toggleFavorito = async () => {
    if (!userId) {
      setSnackbar({
        open: true,
        message: "Você precisa estar logado para favoritar um local.",
        severity: "warning",
      });
      return;
    }

    if (!nomeEstabelecimento || !endereco) {
      setSnackbar({
        open: true,
        message:
          "Nome e endereço são obrigatórios para adicionar aos favoritos.",
        severity: "warning",
      });
      return;
    }

    try {
      if (curtido && idFavorito) {
        await api.delete(`/favoritos/${idFavorito}`);
        setCurtido(false);
        setIdFavorito(null);
        setSnackbar({
          open: true,
          message: "Removido dos favoritos",
          severity: "info",
        });
      } else {
        const res = await api.post("/favoritos", {
          google_place_id: googlePlaceId,
          nome_estabelecimento: nomeEstabelecimento,
          endereco: endereco || "",
        });

        setCurtido(true);
        setIdFavorito(res.data.id_favorito);
        setSnackbar({
          open: true,
          message: "Adicionado aos favoritos",
          severity: "success",
        });
      }
    } catch (err) {
      console.error("Erro ao alternar favorito:", err);
      setSnackbar({
        open: true,
        message: "Erro ao atualizar favorito. Tente novamente.",
        severity: "error",
      });
    }
  };

  const handleSubmit = async () => {
    if (!comentario || nota === 0) {
      setSnackbar({
        open: true,
        message: "Preencha comentário e nota",
        severity: "warning",
      });
      return;
    }

    setSubmitting(true);
    try {
      await api.post("/avaliacao", {
        google_place_id: googlePlaceId,
        comentario,
        nota,
        nome_estabelecimento: nomeEstabelecimento,
        endereco: endereco || "",
      });

      setComentario("");
      setNota(0);
      setSnackbar({
        open: true,
        message: "Avaliação enviada com sucesso!",
        severity: "success",
      });
      fetchAvaliacoes();
    } catch (err) {
      console.error("Erro ao enviar avaliação:", err.response || err);
      setSnackbar({
        open: true,
        message: "Erro ao enviar avaliação",
        severity: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <IconButton
        onClick={toggleModal}
        sx={{
          position: "absolute",
          top: 16,
          right: 33, 
          backgroundColor: "white",
          boxShadow: 2,
          "&:hover": { backgroundColor: "#f5f5f5" },
          zIndex: 1200,
        }}
      >
        <RateReview color={isModalOpen ? "primary" : "action"} />
      </IconButton>

      {/* Modal lateral */}
      <Modal
        open={isModalOpen}
        onClose={toggleModal}
        closeAfterTransition
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", sm: 400 },
            height: "100vh",
            bgcolor: "background.paper",
            boxShadow: 4,
            borderRadius: "8px 0 0 8px",
            p: 3,
            overflowY: "auto",
          }}
        >
          <IconButton
            onClick={toggleFavorito}
            sx={{
              position: "absolute",
              top: 50,
              right: 0,
              color: curtido ? "red" : "gray",
            }}
          >
            {curtido ? <Favorite /> : <FavoriteBorder />}
          </IconButton>

          <Typography variant="h6" gutterBottom>
            Avaliações
          </Typography>

          {loading ? (
            <Box display="flex" justifyContent="center" my={2}>
              <CircularProgress />
            </Box>
          ) : avaliacoes.length === 0 ? (
            <Typography color="text.secondary">
              Nenhuma avaliação ainda.
            </Typography>
          ) : (
            avaliacoes.map((a) => (
              <Paper key={a.id_avaliacao} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Avatar sx={{ bgcolor: "#7681A1", width: 30, height: 30 }}>
                    {a.usuario?.[0]?.toUpperCase() || "U"}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2">
                      {a.usuario}{" "}
                      {a.nome_estabelecimento &&
                      a.nome_estabelecimento !== "Nome não informado"
                        ? `- ${a.nome_estabelecimento}`
                        : ""}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {a.endereco || a.google_place_id}
                    </Typography>
                  </Box>
                  <Rating
                    value={a.nota || 0}
                    readOnly
                    size="small"
                    sx={{ ml: "auto" }}
                  />
                </Box>
                <Typography variant="body2">{a.comentario}</Typography>
              </Paper>
            ))
          )}

          <Box mt={3}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Adicionar Avaliação
            </Typography>
            <TextField
              label="Comentário"
              multiline
              rows={3}
              fullWidth
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Rating
              name="nota"
              value={nota}
              onChange={(e, newValue) => setNota(newValue)}
              precision={1}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Enviando..." : "Enviar Avaliação"}
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SidebarAvaliacoes;