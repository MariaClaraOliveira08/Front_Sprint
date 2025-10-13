import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import api from "../axios/axios";

export default function RedefinirSenhaModal({ open, onClose, onSuccess }) {
  const [step, setStep] = useState(1); // 1 = enviar email, 2 = redefinir senha
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Step 1: enviar código para o email
  const handleEnviarCodigo = async () => {
    if (!email.trim()) {
      setSnackbar({ open: true, message: "Informe o email.", severity: "error" });
      return;
    }
    setLoading(true);
    try {
      await api.post("/user/redefinir", { email: email.trim().toLowerCase() });
      setSnackbar({ open: true, message: `Código enviado para ${email}`, severity: "success" });
      setStep(2);
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: err.response?.data?.error || "Falha ao enviar código",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Step 2: redefinir senha
  const handleRedefinirSenha = async () => {
    if (!codigo.trim() || !novaSenha.trim()) {
      setSnackbar({ open: true, message: "Todos os campos são obrigatórios.", severity: "error" });
      return;
    }
    setLoading(true);
    try {
      await api.post("/user/reset-password", {
        email: email.trim().toLowerCase(),
        code: codigo,
        novaSenha,
      });
      setSnackbar({ open: true, message: "Senha redefinida com sucesso!", severity: "success" });
      setEmail("");
      setCodigo("");
      setNovaSenha("");
      setStep(1);
      onClose();
      onSuccess();
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: err.response?.data?.error || "Código inválido ou expirado",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setEmail("");
    setCodigo("");
    setNovaSenha("");
    onClose();
  };

  return (
    <>
      <Modal open={open} onClose={handleClose} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box
          sx={{
            width: 400,
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {step === 1 ? (
            <>
              <Typography variant="h6" textAlign="center">Redefinir Senha</Typography>
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                disabled={loading}
              />
              <Button
                variant="contained"
                onClick={handleEnviarCodigo}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Enviar Código"}
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h6" textAlign="center">Digite o Código e Nova Senha</Typography>
              <TextField
                label="Código"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                fullWidth
                disabled={loading}
              />
              <TextField
                label="Nova Senha"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                type="password"
                fullWidth
                disabled={loading}
              />
              <Button
                variant="contained"
                onClick={handleRedefinirSenha}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Redefinir Senha"}
              </Button>
            </>
          )}

          <Button color="error" onClick={handleClose}>
            Cancelar
          </Button>
        </Box>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
