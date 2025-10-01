import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import api from "../axios/axios"; // seu axios configurado

export default function ValidacaoEmail({ open, onClose, email, onSuccess }) {
  const [codigo, setCodigo] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleConfirmar = async () => {
    setErro("");
    setLoading(true);

    try {
      // Chama a API real de verificação
      const response = await api.post("/verificar-email", {
        email,
        codigo,
      });

      if (response.data.success) {
        onSuccess(); // código correto → redireciona para login
      } else {
        setErro(response.data.message || "Código inválido. Tente novamente.");
      }
    } catch (err) {
      console.error("Erro ao validar código:", err);
      setErro("Erro na validação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 3,
          p: 4,
          width: "100%",
          maxWidth: 400,
          mx: "auto",
          mt: "20vh",
          textAlign: "center",
          boxShadow: 5,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Verificação de E-mail
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          Enviamos um código de verificação para <b>{email}</b>.
          <br />
          Digite-o abaixo para confirmar seu cadastro.
        </Typography>

        <TextField
          fullWidth
          label="Código de Verificação"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          sx={{ mb: 2 }}
        />

        {erro && (
          <Typography sx={{ color: "red", mb: 2, fontSize: 14 }}>
            {erro}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          onClick={handleConfirmar}
          disabled={loading || !codigo}
          sx={{
            bgcolor: "#69819A",
            color: "#000",
            fontWeight: "bold",
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          {loading ? <CircularProgress size={24} sx={{ color: "#000" }} /> : "Confirmar"}
        </Button>

        <Button
          fullWidth
          onClick={onClose}
          sx={{
            mt: 1.5,
            textTransform: "none",
            fontWeight: "bold",
            color: "#62798B",
          }}
        >
          Cancelar
        </Button>
      </Box>
    </Modal>
  );
}
