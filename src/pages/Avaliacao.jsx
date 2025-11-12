import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Avatar,
  Rating,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HamburgerDrawer from "../components/HamburgerDrawer";
import api from "../axios/axios";
import ModalAvaliacao from "../components/ModalAvaliacao";

function AvaliacoesUsuario() {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [avaliacaoModal, setAvaliacaoModal] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

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
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
      }}
    >
      <HamburgerDrawer />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          p: { xs: 1, sm: 2, md: 3 },
        }}
      >
        {/* Cabeçalho */}
        <Box
          sx={{
            p: { xs: 1, sm: 2 },
            borderBottom: "1px solid #ccc",
            textAlign: "center",
          }}
        >
          <Typography
            variant={isMobile ? "h5" : "h4"}
            sx={{
              color: "#4a5a87",
              fontWeight: 700,
              mt: { xs: 2, sm: 4 },
            }}
          >
            Minhas Avaliações
          </Typography>
        </Box>

        {/* Corpo */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: { xs: 2, sm: 3 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: { xs: 2, sm: 3 },
          }}
        >
          {loading ? (
            <Box display="flex" justifyContent="center" mt={5}>
              <CircularProgress />
            </Box>
          ) : avaliacoes.length === 0 ? (
            <Typography
              sx={{
                color: "#777",
                textAlign: "center",
                mt: 5,
                px: { xs: 2 },
              }}
            >
              Você ainda não fez nenhuma avaliação.
            </Typography>
          ) : (
            avaliacoes.map((avaliacao) => (
              <Paper
                key={avaliacao.id_avaliacao}
                elevation={4}
                sx={{
                  p: { xs: 2, sm: 3 },
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  width: { xs: "95%", sm: "90%", md: "80%", lg: "70%" },
                  maxWidth: 900,
                  transition: "0.3s",
                  "&:hover": {
                    transform: { md: "scale(1.01)" },
                    boxShadow: 6,
                  },
                }}
              >
                {/* Cabeçalho da avaliação */}
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection={{ xs: "column", sm: "row" }}
                  gap={2}
                  textAlign={{ xs: "center", sm: "left" }}
                >
                  <Avatar sx={{ bgcolor: "#7681A1", width: 50, height: 50 }}>
                    {avaliacao.usuario?.[0]?.toUpperCase() || "U"}
                  </Avatar>
                  <Box flex={1}>
                    <Typography
                      variant={isMobile ? "subtitle1" : "h6"}
                      fontWeight={600}
                    >
                      {avaliacao.nome_estabelecimento}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ wordWrap: "break-word" }}
                    >
                      Usuário: {avaliacao.usuario}
                    </Typography>
                  </Box>
                  <Rating
                    value={avaliacao.nota || 0}
                    readOnly
                    precision={0.5}
                    size={isMobile ? "small" : "medium"}
                  />
                </Box>

                {/* Comentário */}
                <Typography
                  variant="body1"
                  mt={1}
                  sx={{
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    wordBreak: "break-word",
                  }}
                >
                  {avaliacao.comentario || "-"}
                </Typography>

                {/* Botão */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "center", sm: "flex-start" },
                    gap: 1,
                    mt: 1,
                  }}
                >
                  <Button
                    variant="text"
                    size={isMobile ? "small" : "medium"}
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
