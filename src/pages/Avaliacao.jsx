import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Avatar,
  Rating,
  Button,
} from "@mui/material";
import HamburgerDrawer from "../components/HamburgerDrawer";
import api from "../axios/axios";
import ModalAvaliacao from "../components/ModalAvaliacao";

function AvaliacoesUsuario() {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [avaliacaoModal, setAvaliacaoModal] = useState(null);

  useEffect(() => {
    buscarAvaliacoesUsuario();
  }, []);

  const buscarAvaliacoesUsuario = async () => {
    setLoading(true);
    try {
      const nomeUsuario = localStorage.getItem("nomeUsuario") || "Você";
      const res = await api.get("/avaliacao");
      const dados =
        res.data.avaliacoes?.map((a) => ({
          ...a,
          nome_estabelecimento: a.nome_estabelecimento,
          usuario: a.usuario || nomeUsuario,
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

  const handleDeleteAvalicao = async () => {
    if (!avaliacaoModal) return;
    try {
      await api.deletarAvaliacao(avaliacaoModal.id_avaliacao);
      setAvaliacoes((prev) =>
        prev.filter((a) => a.id_avaliacao !== avaliacaoModal.id_avaliacao)
      );
      handleCloseModal();
    } catch (err) {
      alert("Não foi possível deletar a avaliação.");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <HamburgerDrawer />

      <Box
        sx={{
          flex: 1,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid #ccc",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: "#4a5a87", fontWeight: 700, marginTop: 5 }}
          >
            Minhas Avaliações
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 3, // ← aumentei o padding interno
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          {loading ? (
            <Box display="flex" justifyContent="center" mt={5}>
              <CircularProgress />
            </Box>
          ) : avaliacoes.length === 0 ? (
            <Typography sx={{ color: "#777", textAlign: "center", mt: 5 }}>
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
                  width: "90%", // ← ocupa mais da tela
                  maxWidth: 900, // ← aumentei de 600 pra 900
                  "&:hover": { transform: "scale(1.01)", boxShadow: 6 },
                }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: "#7681A1" }}>
                    {avaliacao.usuario?.[0]?.toUpperCase() || "U"}
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {avaliacao.nome_estabelecimento}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Usuário: {avaliacao.usuario}
                    </Typography>
                  </Box>
                  <Rating
                    value={avaliacao.nota || 0}
                    readOnly
                    precision={0.5}
                  />
                </Box>

                <Typography variant="body1" mt={1}>
                  {avaliacao.comentario ? avaliacao.comentario : "-"}
                </Typography>

                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => handleOpenModal(avaliacao)}
                  >
                    Ver mais
                  </Button>
                </Box>
              </Paper>
            ))
          )}
        </Box>
      </Box>

      <ModalAvaliacao
        open={openModal}
        onClose={handleCloseModal}
        avaliacao={avaliacaoModal}
        onDelete={handleDeleteAvalicao}
      />
    </Box>
  );
}

export default AvaliacoesUsuario;