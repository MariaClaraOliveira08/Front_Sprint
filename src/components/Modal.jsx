import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Divider,
  Stack,
  Paper,
} from "@mui/material";
import {
  LocationOn,
  Phone,
  AccessTime,
  Info,
  Close,
} from "@mui/icons-material";

const DetalhesModal = ({ open, onClose, lugar }) => {
  if (!lugar) return null;

  // Função para exibir horários de forma organizada
  const renderHorarios = (horarios) => {
    if (!horarios) return "Não disponível";

    // Caso venha string simples
    if (typeof horarios === "string") {
      return (
        <Typography variant="body2" sx={{ mt: 1 }}>
          {horarios}
        </Typography>
      );
    }

    // Caso venha como array (ex: ["Seg: 8h - 18h", "Ter: 8h - 18h"])
    if (Array.isArray(horarios)) {
      return (
        <Stack spacing={0.5} sx={{ mt: 1 }}>
          {horarios.map((h, index) => (
            <Paper
              key={index}
              variant="outlined"
              sx={{
                p: 1,
                borderRadius: 1.5,
                bgcolor: "#f8f9fa",
                borderColor: "#e0e0e0",
              }}
            >
              <Typography variant="body2">{h}</Typography>
            </Paper>
          ))}
        </Stack>
      );
    }

    // Caso venha como objeto (ex: { seg: "8h-18h", ter: "8h-18h" })
    if (typeof horarios === "object") {
      return (
        <Stack spacing={0.5} sx={{ mt: 1 }}>
          {Object.entries(horarios).map(([dia, hora], index) => (
            <Paper
              key={index}
              variant="outlined"
              sx={{
                p: 1,
                borderRadius: 1.5,
                bgcolor: "#f8f9fa",
                borderColor: "#e0e0e0",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {dia.charAt(0).toUpperCase() + dia.slice(1)}:
              </Typography>
              <Typography variant="body2">{hora}</Typography>
            </Paper>
          ))}
        </Stack>
      );
    }

    return "Não disponível";
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        backdropFilter: "blur(4px)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 420,
          bgcolor: "#fff",
          borderRadius: 3,
          p: 4,
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          transition: "all 0.3s ease",
          border: "1px solid #e0e0e0",
        }}
      >
        {/* Cabeçalho */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#1976d2",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Info fontSize="small" /> {lugar.nome}
          </Typography>

          <Button
            onClick={onClose}
            color="error"
            size="small"
            sx={{
              minWidth: "auto",
              p: 0.5,
              borderRadius: "50%",
              "&:hover": { backgroundColor: "rgba(255,0,0,0.1)" },
            }}
          >
            <Close fontSize="small" />
          </Button>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        {/* Informações */}
        <Stack spacing={1.5}>
          <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocationOn color="action" fontSize="small" /> 
            <strong>Endereço:</strong> {lugar.endereco}
          </Typography>

          <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Phone color="action" fontSize="small" /> 
            <strong>Telefone:</strong> {lugar.telefone || "Não informado"}
          </Typography>

          <Box>
            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
            >
              <AccessTime color="action" fontSize="small" /> 
              <strong>Horários:</strong>
            </Typography>
            {renderHorarios(lugar.horarios)}
          </Box>
        </Stack>

        {/* Rodapé */}
        <Box textAlign="center" sx={{ mt: 3 }}>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              bgcolor: "#1976d2",
              px: 4,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
              "&:hover": {
                bgcolor: "#125ea8",
              },
            }}
          >
            Fechar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DetalhesModal;
