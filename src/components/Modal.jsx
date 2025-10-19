import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const DetalhesModal = ({ open, onClose, lugar }) => {
  if (!lugar) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 4,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {lugar.nome}
        </Typography>

        <Typography variant="body2" gutterBottom>
          Endereço: {lugar.endereco}
        </Typography>

        <Typography variant="body2" gutterBottom>
          Telefone: {lugar.telefone}
        </Typography>

        <Typography variant="body2" gutterBottom>
          Horários: {lugar.horarios || "Não disponível"}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={onClose}
        >
          Fechar
        </Button>
      </Box>
    </Modal>
  );
};

export default DetalhesModal;
