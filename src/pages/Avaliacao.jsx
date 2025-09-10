import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import HamburgerDrawer from "../components/HamburgerDrawer";  // Importação do componente

function Avaliacao({ nomeUsuario, nomeEstabelecimento }) {
  const [avaliacoes, setAvaliacoes] = useState([]);  // Inicializado como vazio
  const [novaNota, setNovaNota] = useState(0);
  const [novoComentario, setNovoComentario] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [avaliacaoModal, setAvaliacaoModal] = useState(null);

  const handleEnviar = () => {
    if (!novaNota || !novoComentario) {
      alert("Preencha a nota e o comentário.");
      return;
    }

    // Aqui usamos os valores passados como props: nomeUsuario e nomeEstabelecimento
    setAvaliacoes([
      { nome: nomeUsuario, estabelecimento: nomeEstabelecimento, nota: novaNota, comentario: novoComentario },
      ...avaliacoes,
    ]);

    // Limpa os campos de entrada
    setNovaNota(0);
    setNovoComentario("");
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
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        mt: 5,
        px: 2,
      }}
    >
      {/* Chamando o HamburgerDrawer aqui */}
      <HamburgerDrawer />

      <Typography variant="h4" gutterBottom>
        Avaliações
      </Typography>

      {/* Lista de avaliações */}
      <Paper elevation={3} sx={{ mb: 4 }}>
        <List>
          {avaliacoes.map((avaliacao, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="subtitle1">{avaliacao.nome}</Typography>
                      <Rating value={avaliacao.nota} readOnly size="small" />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography>{avaliacao.estabelecimento}</Typography>
                      <Button
                        variant="text"
                        size="small"
                        color="primary"
                        onClick={() => handleOpenModal(avaliacao)}
                      >
                        Ver mais
                      </Button>
                    </Box>
                  }
                />
              </ListItem>
              {index < avaliacoes.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Formulário de nova avaliação */}
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="h6">Deixe sua avaliação:</Typography>
        <Rating
          name="avaliacao"
          value={novaNota}
          onChange={(event, newValue) => setNovaNota(newValue)}
        />
        <TextField
          label="Comentário"
          multiline
          rows={4}
          value={novoComentario}
          onChange={(e) => setNovoComentario(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={handleEnviar}
          sx={{ backgroundColor: "#7681A1" }}
        >
          Enviar Avaliação
        </Button>
      </Box>

      {/* Modal de detalhes da avaliação */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 3,
            }}
          >
            <Typography variant="h6">{avaliacaoModal?.estabelecimento}</Typography>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="subtitle1">{avaliacaoModal?.nome}</Typography>
              <Rating value={avaliacaoModal?.nota} readOnly size="small" />
            </Box>
            <Typography variant="body1">{avaliacaoModal?.comentario}</Typography>
            <Box mt={2}>
              <Button
                variant="outlined"
                onClick={handleCloseModal}
                fullWidth
              >
                Fechar
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}

export default Avaliacao;
