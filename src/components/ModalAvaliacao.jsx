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
      const res = await api.get("/avaliacao");
      const dados =
        res.data.avaliacoes?.map((a) => ({
          ...a,
          nome_estabelecimento: a.nome_estabelecimento,
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

      <Box
        sx={{
          flex: 1,
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "100%",
          overflowY: "auto",
          maxHeight: "100vh",
          alignItems: "center", // centraliza os cards
        }}
      >
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
                width: "100%",
                maxWidth: 600, // define largura máxima do card
                margin: "0 auto", // centraliza horizontalmente
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
                <Rating value={avaliacao.nota || 0} readOnly precision={0.5} />
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