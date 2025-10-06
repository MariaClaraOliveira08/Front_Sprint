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
} from "@mui/material";
import api from "../axios/axios";

const SidebarAvaliacoes = ({ googlePlaceId, nomeEstabelecimento, endereco }) => {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [comentario, setComentario] = useState("");
  const [nota, setNota] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  // Busca avaliações do local
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

  useEffect(() => {
    if (googlePlaceId) fetchAvaliacoes();
  }, [googlePlaceId]);

  // Envia nova avaliação
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
        nome_estabelecimento: nomeEstabelecimento || "Nome não informado",
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

  return (
    <Box
      sx={{
        position: "absolute",
        top: 16,
        right: 16,
        width: { xs: "95%", sm: 500 },
        maxHeight: "90vh",
        overflowY: "auto",
        bgcolor: "background.paper",
        boxShadow: 3,
        borderRadius: 2,
        p: 3,
        zIndex: 1000,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Avaliações
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" my={2}>
          <CircularProgress />
        </Box>
      ) : avaliacoes.length === 0 ? (
        <Typography color="text.secondary">Nenhuma avaliação ainda.</Typography>
      ) : (
        avaliacoes.map((a) => (
          <Paper key={a.id_avaliacao} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Avatar sx={{ bgcolor: "#7681A1", width: 30, height: 30 }}>
                {a.usuario?.[0]?.toUpperCase() || "U"}
              </Avatar>
              <Box>
                <Typography variant="subtitle2">{a.usuario}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {a.nome_estabelecimento || a.endereco || a.google_place_id}
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
    </Box>
  );
};

export default SidebarAvaliacoes;
