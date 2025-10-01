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
  Alert
} from "@mui/material";
import api from "../axios/axios";

const SidebarAvaliacoes = ({ googlePlaceId, userId }) => {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comentario, setComentario] = useState("");
  const [nota, setNota] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  // Buscar avaliações do estabelecimento
  const fetchAvaliacoes = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/avaliacoes/${googlePlaceId}`);
      const dados = res.data.avaliacoes?.map(a => ({
        ...a,
        usuario: a.usuario || "Usuário",
        nome_estabelecimento: a.nome_estabelecimento || "Estabelecimento"
      })) || [];
      setAvaliacoes(dados);
    } catch (err) {
      console.error("Erro ao buscar avaliações:", err.response || err);
      setAvaliacoes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (googlePlaceId) fetchAvaliacoes();
  }, [googlePlaceId]);

  // Adicionar avaliação do usuário
  const handleSubmit = async () => {
    if (!comentario || nota === 0) {
      setSnackbar({ open: true, message: "Preencha o comentário e a nota", severity: "warning" });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setSnackbar({ open: true, message: "Você precisa estar logado para avaliar", severity: "warning" });
      return;
    }

    setSubmitting(true);
    try {
      await api.post(
        "/avaliacao",
        { id_usuario: userId, google_place_id: googlePlaceId, comentario, nota },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Limpar campos após envio
      setComentario("");
      setNota(0);
      setSnackbar({ open: true, message: "Avaliação enviada com sucesso!", severity: "success" });

      // Atualiza lista de avaliações
      fetchAvaliacoes();
    } catch (err) {
      console.error("Erro ao enviar avaliação:", err.response || err);
      setSnackbar({ open: true, message: "Erro ao enviar avaliação", severity: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        width: { xs: "90%", sm: 400 },
        height: "100vh",
        bgcolor: "#f9f9f9",
        p: 3,
        overflowY: "auto",
        zIndex: 1200,
        boxShadow: "0 0 10px rgba(0,0,0,0.3)"
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>Avaliações</Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" my={2}>
          <CircularProgress />
        </Box>
      ) : avaliacoes.length === 0 ? (
        <Typography sx={{ color: "#777" }}>Nenhuma avaliação ainda.</Typography>
      ) : (
        avaliacoes.map(avaliacao => (
          <Paper key={avaliacao.id_avaliacao} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Avatar sx={{ bgcolor: "#7681A1", width: 30, height: 30 }}>
                {avaliacao.usuario?.[0]?.toUpperCase() || "U"}
              </Avatar>
              <Box>
                <Typography variant="subtitle2">{avaliacao.usuario}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {avaliacao.nome_estabelecimento}
                </Typography>
              </Box>
              <Rating value={avaliacao.nota || 0} readOnly size="small" sx={{ ml: "auto" }} />
            </Box>
            <Typography variant="body2">{avaliacao.comentario}</Typography>
          </Paper>
        ))
      )}

      {/* Adicionar nova avaliação */}
      <Box mt={3}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Adicionar Avaliação</Typography>
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
          precision={0.5}
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
    </Box>
  );
};

export default SidebarAvaliacoes;
