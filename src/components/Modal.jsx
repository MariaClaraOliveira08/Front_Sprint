import React from "react";
import { Modal, Box, Typography, Button, Divider, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DetalhesModal = ({ open, onClose, lugar }) => {
  const navigate = useNavigate();

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
          boxShadow: 24,
          p: 3,
        }}
      >
        <Typography variant="h6" mb={2}>{lugar.nome}</Typography>
        <Typography><strong>Endereço:</strong> {lugar.endereco}</Typography>
        <Typography><strong>Categoria:</strong> {lugar.categoria}</Typography>
        <Typography><strong>Telefone:</strong> {lugar.telefone}</Typography>
        <Typography><strong>Horários:</strong> {lugar.horarios}</Typography>
        <Typography><strong>Avaliação:</strong> {lugar.avaliacao}</Typography>

        <Link
          onClick={() => navigate("/mapa", { state: { lugar } })}
          underline="hover"
          sx={{ display: "block", textAlign: "center", mb: 2, color: "#4a5a87", fontWeight: "bold", cursor: "pointer" }}
        >
          Ver no mapa
        </Link>

        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" mb={1}>Comentários:</Typography>
        {lugar.comentarios && lugar.comentarios.length > 0 ? (
          lugar.comentarios.map((c, index) => (
            <Box key={index} mb={1}>
              <Typography><strong>Usuário:</strong> {c.usuario}</Typography>
              <Typography><strong>Nota:</strong> {c.nota}</Typography>
              <Typography><strong>Comentário:</strong> {c.texto}</Typography>
              {index < lugar.comentarios.length - 1 && <Divider sx={{ my: 1 }} />}
            </Box>
          ))
        ) : (
          <Typography>Sem comentários.</Typography>
        )}

        <Button onClick={onClose} variant="contained" sx={{ mt: 2 }}>Fechar</Button>
      </Box>
    </Modal>
  );
};

export default DetalhesModal; 