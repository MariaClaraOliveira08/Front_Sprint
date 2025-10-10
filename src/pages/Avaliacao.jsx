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
import { useNavigate } from "react-router-dom";

function AvaliacoesUsuario() {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [avaliacaoModal, setAvaliacaoModal] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    buscarAvaliacoesUsuario();
  }, []);

  const buscarAvaliacoesUsuario = async () => {
    setLoading(true);
    try {
      const res = await api.get("/avaliacao"); // rota listByUser
      const dados =
        res.data.avaliacoes?.map((a) => ({
          ...a,
          nome_estabelecimento: a.nome_estabelecimento || "Estabelecimento",
          usuario: a.usuario || "Você",
        })) || [];
      setAvaliacoes(dados);
    } catch (err) {
      console.warn(err.response?.data?.message || "Erro ao buscar avaliações");
      setAvaliacoes([]);
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

  const handleDeleteAvalicao = async (avaliacao) => {
    if (!avaliacao) return;
    try {
      await api.deletarAvaliacao(avaliacao.id_avaliacao);
      setAvaliacoes((prev) =>
        prev.filter((a) => a.id_avaliacao !== avaliacao.id_avaliacao)
      );
      handleCloseModal();
    } catch (err) {
      console.error(
        "Erro ao deletar avaliação:",
        err.response?.data || err.message
      );
      alert("Não foi possível deletar a avaliação.");
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <HamburgerDrawer />

      <Box sx={{ flex: 1, p: { xs: 2, sm: 5 }, maxWidth: 900, margin: "auto" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "#4a5a87", fontWeight: 700 }}
        >
          Minhas Avaliações
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            gap={3}
            mt={3}
            sx={{ maxHeight: "70vh", overflowY: "auto", pr: 1 }}
          >
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
                      {avaliacao.usuario?.[0]?.toUpperCase() || "U"}
                    </Avatar>
                    <Box flex={1}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        Estabelecimento: {avaliacao.nome_estabelecimento}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Usuário: {avaliacao.usuario}
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

                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => handleOpenModal(avaliacao)}
                    >
                      Ver mais
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteAvalicao(avaliacao)}
                    >
                      Deletar
                    </Button>
                  </Box>
                </Paper>
              ))
            )}
          </Box>
        )}

        {/* Modal para detalhes da avaliação */}
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
                maxHeight: "80vh",
                overflowY: "auto",
                bgcolor: "background.paper",
                borderRadius: 3,
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography variant="h6" sx={{ color: "#4a5a87", mb: 1 }}>
                {avaliacaoModal?.nome_estabelecimento || "Estabelecimento"}
              </Typography>

              {avaliacaoModal?.endereco && (
                <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                  Endereço: {avaliacaoModal.endereco}
                </Typography>
              )}

              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="subtitle1">
                  {avaliacaoModal?.usuario || "Você"}
                </Typography>
                <Rating value={avaliacaoModal?.nota || 0} readOnly size="small" />
              </Box>

              <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                {avaliacaoModal?.comentario || "-"}
              </Typography>

              <Box mt={3} sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteAvalicao(avaliacaoModal)}
                  fullWidth
                  sx={{ borderRadius: 2 }}
                >
                  Deletar Avaliação
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleCloseModal}
                  fullWidth
                  sx={{ borderRadius: 2 }}
                >
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
