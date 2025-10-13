import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Modal,
  Paper,
} from "@mui/material";
import api from "../axios/axios";

const ValidacaoCodigo = ({ email, onClose, onVerificationSuccess }) => {
  const [codigo, setCodigo] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleConfirmarCodigo = async () => {
    if (!codigo) {
      setSnackbar({
        open: true,
        message: "Digite o código recebido por e-mail",
        severity: "warning",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/user/confirm", {
        email,
        code: codigo,
      });

      setSnackbar({
        open: true,
        message: response.data.message || "Código confirmado!",
        severity: "success",
      });

      // Chama a função do parent para indicar sucesso
      onVerificationSuccess();
    } catch (err) {
      console.error("Erro ao confirmar código:", err.response?.data || err);
      setSnackbar({
        open: true,
        message:
          "Erro ao confirmar código: " + (err.response?.data?.error || err.message),
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open onClose={onClose} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Paper sx={{ p: 4, width: 350, borderRadius: 2, textAlign: "center" }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Confirme seu cadastro
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Enviamos um código para o e-mail <strong>{email}</strong>
        </Typography>
        <TextField
          fullWidth
          label="Código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleConfirmarCodigo}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Confirmar Código"}
        </Button>

        <Button
          variant="text"
          fullWidth
          sx={{ mt: 1 }}
          onClick={onClose}
        >
          Cancelar
        </Button>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Modal>
  );
};

export default ValidacaoCodigo;