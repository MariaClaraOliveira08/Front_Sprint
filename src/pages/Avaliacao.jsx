import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Paper,
  Modal,
  Backdrop,
  Fade,
  Avatar,
  CircularProgress,
} from "@mui/material";
import HamburgerDrawer from "../components/HamburgerDrawer";
import api from "../axios/axios";

function Avaliacao({ idUsuario, google_place_id, nomeEstabelecimento }) {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [novaNota, setNovaNota] = useState(0);
  const [novoComentario, setNovoComentario] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [avaliacaoModal, setAvaliacaoModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mediaNota, setMediaNota] = useState(0);

  // Buscar avaliações ao carregar a página
  useEffect(() => {
    fetchAvaliacoes();
  }, []);

  // Função para buscar avaliações
  const fetchAvaliacoes = async () => {
    if (!google_place_id) return;
    setLoading(true);
    try {
      const res = await api.get(`/avaliacoes/${google_place_id}`); // Alterado para corresponder à API
      setAvaliacoes(res.data.avaliacoes);
      setMediaNota(res.data.media_notas || 0);
    } catch (err) {
      console.error("Erro ao carregar avaliações:", err);
    } finally {
      setLoading(false);
    }
  };

  // Função para enviar a nova avaliação
  const handleEnviar = async () => {
    if (!novaNota || !novoComentario) {
      alert("Preencha a nota e o comentário.");
      return;
    }

    const token = localStorage.getItem("jwtToken"); // Pegando o token do localStorage ou sessionStorage

    try {
      await axios.post(
        "/avaliacoes", // Alterado para corresponder à API
        {
          id_usuario: idUsuario,
          google_place_id,
          comentario: novoComentario,
          nota: novaNota,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Enviando o token JWT
          },
        }
      );
      setNovaNota(0);
      setNovoComentario("");
      fetchAvaliacoes(); // Atualiza a lista após enviar
    } catch (err) {
      console.error("Erro ao enviar avaliação:", err);
      alert("Não foi possível enviar a avaliação.");
    }
  };

  // Função para abrir o modal de detalhes da avaliação
  const handleOpenModal = (avaliacao) => {
    setAvaliacaoModal(avaliacao);
    setOpenModal(true);
  };

  // Função para fechar o modal de detalhes
  const handleCloseModal = () => {
    setOpenModal(false);
    setAvaliacaoModal(null);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <HamburgerDrawer />

      <Box sx={{ flex: 1, p: { xs: 2, sm: 5 }, maxWidth: 900, margin: "auto" }}>
        <Typography variant="h4" gutterBottom sx={{ color: "#4a5a87", fontWeight: 700 }}>
          Avaliações
        </Typography>

        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Typography variant="subtitle1">Média das avaliações:</Typography>
          <Rating value={mediaNota} precision={0.5} readOnly />
          <Typography variant="body2">({avaliacoes.length} avaliações)</Typography>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" gap={3} mb={5}>
            {avaliacoes.length === 0 && (
              <Typography sx={{ color: "#777", textAlign: "center" }}>
                Nenhuma avaliação ainda. Seja o primeiro a avaliar!
              </Typography>
            )}

            {avaliacoes.map((avaliacao) => (
              <Paper
                key={avaliacao.id_avaliacao}
                elevation={5}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: 3,
                  borderRadius: 3,
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.02)", boxShadow: 8 },
                }}
              >
                <Box display="flex" alignItems="center" gap={2} mb={1}>
                  <Avatar sx={{ bgcolor: "#7681A1" }}>
                    {avaliacao.usuario[0].toUpperCase()}
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {avaliacao.usuario}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {nomeEstabelecimento}
                    </Typography>
                  </Box>
                  <Rating value={avaliacao.nota} readOnly precision={0.5} />
                </Box>
                <Typography variant="body1" sx={{ mt: 1, mb: 1 }}>
                  {avaliacao.comentario.length > 120
                    ? avaliacao.comentario.substring(0, 120) + "..."
                    : avaliacao.comentario}
                </Typography>
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => handleOpenModal(avaliacao)}
                  sx={{ alignSelf: "flex-start", mt: 1 }}
                >
                  Ver mais
                </Button>
              </Paper>
            ))}
          </Box>
        )}

        {/* Formulário de nova avaliação */}
        <Paper elevation={5} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: "#4a5a87" }}>
            Deixe sua avaliação
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <Rating
              name="avaliacao"
              value={novaNota}
              onChange={(event, newValue) => setNovaNota(newValue)}
              size="large"
            />
            <TextField
              label="Comentário"
              multiline
              rows={4}
              value={novoComentario}
              onChange={(e) => setNovoComentario(e.target.value)}
              fullWidth
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
            <Button
              variant="contained"
              onClick={handleEnviar}
              sx={{ backgroundColor: "#4a5a87", "&:hover": { backgroundColor: "#36406a" }, fontWeight: 600 }}
            >
              Enviar Avaliação
            </Button>
          </Box>
        </Paper>

        {/* Modal de detalhes */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{ timeout: 500 }}
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
                {nomeEstabelecimento}
              </Typography>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="subtitle1">{avaliacaoModal?.usuario}</Typography>
                <Rating value={avaliacaoModal?.nota} readOnly size="small" />
              </Box>
              <Typography variant="body1">{avaliacaoModal?.comentario}</Typography>
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

export default Avaliacao;
