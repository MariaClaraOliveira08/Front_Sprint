import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Modal,
  Backdrop,
  Fade,
  Avatar,
  CircularProgress,
  Rating,
  Button,
} from "@mui/material";
import HamburgerDrawer from "../components/HamburgerDrawer";
import api from "../axios/axios";

function AvaliacoesUsuario() {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [avaliacaoModal, setAvaliacaoModal] = useState(null);
  const [idUsuario, setIdUsuario] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId") || localStorage.getItem("idUsuario");
    if (userId) {
      setIdUsuario(userId);
      buscarAvaliacoesUsuario(userId);
    }
  }, []);

  const buscarAvaliacoesUsuario = async (id_usuario) => {
    setLoading(true);
    try {
      const res = await api.get(`/avaliacoes/${id_usuario}`);
      console.log("Resposta da API:", res.data);

      // Garante que sempre é um array
      setAvaliacoes(res.data.avaliacoes || []);
    } catch (err) {
      console.error("Erro ao buscar avaliações do usuário:", err.response || err);
      setAvaliacoes([]); // fallback para array vazio
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (avaliacao) => {
    setAvaliacaoModal(avaliacao);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setAvaliacaoModal(null);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <HamburgerDrawer />

      <Box sx={{ flex: 1, p: { xs: 2, sm: 5 }, maxWidth: 900, margin: "auto" }}>
        <Typography variant="h4" gutterBottom sx={{ color: "#4a5a87", fontWeight: 700 }}>
          Minhas Avaliações
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" gap={3} mt={3}>
            {avaliacoes.length === 0 ? (
              <Typography sx={{ color: "#777", textAlign: "center" }}>
                Você ainda não fez nenhuma avaliação.
              </Typography>
            ) : (
              avaliacoes.map((avaliacao) => (
                <Paper
                  key={avaliacao.id_avaliacao}
                  elevation={4}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    transition: "0.3s",
                    "&:hover": { transform: "scale(1.01)", boxShadow: 6 },
                  }}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{ bgcolor: "#7681A1" }}>
                      {(avaliacao.usuario?.[0]?.toUpperCase()) || "U"}
                    </Avatar>
                    <Box flex={1}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {avaliacao.nome_estabelecimento || "Estabelecimento"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {avaliacao.google_place_id || "-"}
                      </Typography>
                    </Box>
                    <Rating value={avaliacao.nota || 0} readOnly precision={0.5} />
                  </Box>

                  <Typography variant="body1" mt={1}>
                    {avaliacao.comentario
                      ? avaliacao.comentario.length > 120
                        ? avaliacao.comentario.substring(0, 120) + "..."
                        : avaliacao.comentario
                      : "-"}
                  </Typography>

                  <Button
                    variant="text"
                    size="small"
                    onClick={() => handleOpenModal(avaliacao)}
                    sx={{ alignSelf: "flex-start" }}
                  >
                    Ver mais
                  </Button>
                </Paper>
              ))
            )}
          </Box>
        )}

        {/* Modal de detalhes */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{ timeout: 400 }}
        >
          <Fade in={openModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: "90%", sm: 450 },
                bgcolor: "background.paper",
                borderRadius: 3,
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography variant="h6" sx={{ color: "#4a5a87", mb: 1 }}>
                {avaliacaoModal?.nome_estabelecimento || "Estabelecimento"}
              </Typography>

              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="subtitle1">{avaliacaoModal?.usuario || "Usuário"}</Typography>
                <Rating value={avaliacaoModal?.nota || 0} readOnly size="small" />
              </Box>

              <Typography variant="body1">{avaliacaoModal?.comentario || "-"}</Typography>

              <Box mt={3}>
                <Button variant="outlined" onClick={handleCloseModal} fullWidth sx={{ borderRadius: 2 }}>
                  Fechar
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </Box>
  );
}

export default AvaliacoesUsuario;
