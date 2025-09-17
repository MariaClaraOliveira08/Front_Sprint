import React from "react";
import { Modal, Box, Typography, Button, Divider, Link } from "@mui/material";

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
          width: 450,
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: "#4a5a87" }}>
          {lugar.nome || "Nome não disponível"}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Endereço:</strong> {lugar.endereco || "Não disponível"}
        </Typography>

        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Categoria:</strong> {lugar.categoria || "Não disponível"}
        </Typography>

        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Telefone:</strong> {lugar.telefone || "Não disponível"}
        </Typography>

        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Horários:</strong>{" "}
          {lugar.horarios
            ? Array.isArray(lugar.horarios)
              ? lugar.horarios.join(", ")
              : lugar.horarios
            : "Não disponível"}
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          <strong>Avaliação:</strong>{" "}
          {lugar.avaliacao ? `${lugar.avaliacao}` : "Não disponível"}
        </Typography>

        <Link
          component="button"
          onClick={() => {
            navigate("/mapa", { state: { lugar } }); 
          }}
          underline="hover"
          sx={{
            display: "block",
            textAlign: "center",
            mb: 2,
            color: "#4a5a87",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Ver no mapa
        </Link>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#4a5a87",
            "&:hover": { backgroundColor: "#36406a" },
          }}
          onClick={onClose}
          fullWidth
        >
          Fechar
        </Button>
      </Box>
    </Modal>
  );
};

export default DetalhesModal;
