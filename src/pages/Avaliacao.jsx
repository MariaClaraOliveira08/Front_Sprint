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
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import HamburgerDrawer from "../components/HamburgerDrawer";
import api from "../axios/axios";
import ModalAvaliacao from "../components/ModalAvaliacao";

function Avaliacoes() {
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

  const handleDeleteAvaliacao = async () => {
    if (!avaliacaoModal) return;
    try {
      await api.deletarAvaliacao(avaliacaoModal.id_avaliacao);
      setAvaliacoes((prev) =>
        prev.filter((a) => a.id_avaliacao !== avaliacaoModal.id_avaliacao)
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
          p: 5,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "100%",
          overflowY: "auto",
          maxHeight: "100vh",
          alignItems: "center",
          backgroundColor: "#f3f4f6",
          fontFamily: "Segoe UI, sans-serif",
        }}
      >
        {/* ✅ Cabeçalho igual ao da Home */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocationOnOutlinedIcon sx={{ fontSize: 36, color: "#000" }} />
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: "#4a5a87", margin: 0 }}
            >
              Glimp
            </Typography>
          </Box>
          <Typography
            variant="subtitle2"
            sx={{ color: "#777", mt: 0.5, textAlign: "center" }}
          >
            Grandes Lugares Inspiram Momentos Perfeitos.
          </Typography>
        </Box>

        {/* 🔹 Título da página */}
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
                maxWidth: 600,
                margin: "0 auto",
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
              </Box>
            </Paper>
          ))
        )}
      </Box>

      <ModalAvaliacao
        open={openModal}
        onClose={handleCloseModal}
        avaliacao={avaliacaoModal}
        onDelete={handleDeleteAvaliacao}
      />
    </Box>
  );
}

export default Avaliacoes;