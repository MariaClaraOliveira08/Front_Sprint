import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Rating,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";

function ModalAvaliacao({ open, onClose, avaliacao, onDelete }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // Quando clica em "Deletar Avaliação", abre o modal de confirmação
  const handleDeleteClick = () => {
    setOpenDeleteModal(true);
  };

  // Confirma exclusão
  const handleConfirmDelete = () => {
    if (avaliacao) {
      onDelete(avaliacao); // executa a função de deletar
    }
    setOpenDeleteModal(false);
    onClose(); // fecha o modal principal
  };

  // Cancela exclusão
  const handleCancelDelete = () => {
    setOpenDeleteModal(false); 
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 400 }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 450 },
              maxHeight: "80vh",
              overflowY: "auto",
              backgroundColor: "#D9D9D9",
              borderRadius: 3,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" sx={{ color: "#4a5a87", mb: 1 }}>
              {avaliacao?.nome_estabelecimento || "Estabelecimento"}
            </Typography>

            {avaliacao?.endereco && (
              <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                Endereço: {avaliacao.endereco}
              </Typography>
            )}

            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="subtitle1">{avaliacao?.usuario || "Você"}</Typography>
              <Rating value={avaliacao?.nota || 0} readOnly size="small" />
            </Box>

            <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
              {avaliacao?.comentario || "-"}
            </Typography>

            <Box mt={3} sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDeleteClick} // abre o modal de confirmação
                fullWidth
                sx={{ borderRadius: 2 }}
              >
                Deletar Avaliação
              </Button>

              <Button
                variant="outlined"
                onClick={onClose}
                fullWidth
                sx={{ borderRadius: 2 }}
              >
                Fechar
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* Modal de confirmação para deletar */}
      <Modal
        open={openDeleteModal}
        onClose={handleCancelDelete}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 400 }}
      >
        <Fade in={openDeleteModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 400 },
              backgroundColor: "#fff",
              borderRadius: 3,
              boxShadow: 24,
              p: 4,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: "#4a5a87" }}>
              Tem certeza que deseja deletar esta avaliação?
            </Typography>

            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Button
                variant="contained"
                color="error"
                onClick={handleConfirmDelete} 
              >
                Sim
              </Button>
              <Button
                variant="outlined"
                onClick={handleCancelDelete} 
              >
                Não
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default ModalAvaliacao;