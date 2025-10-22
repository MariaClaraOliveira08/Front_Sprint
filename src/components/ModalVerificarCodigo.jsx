import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import sheets from "../axios/axios"; // para acessar a API

const ModalVerificarCodigo = ({ open, onClose, email, onSuccess }) => {
  const [codigo, setCodigo] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);

  const handleConfirmarCodigo = async () => {
    if (!codigo.trim()) {
      setErro(true);
      setMensagem("Digite o código de verificação.");
      return;
    }

    try {
      setLoading(true);
      setErro(false);
      setMensagem("");

      const response = await sheets.post("/user/confirm", {
        email,
        code: codigo,
      });

      setMensagem(response.data.message);
      setErro(false);

      setTimeout(() => {
        onSuccess(); // redireciona para login
      }, 1000);
    } catch (err) {
      console.error("Erro ao confirmar código:", err);
      setErro(true);
      setMensagem(
        err.response?.data?.error ||
          "Erro ao confirmar o código. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
        Confirmar Código de Verificação
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          mt: 1,
        }}
      >
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          Digite o código que foi enviado para o e-mail:
          <br />
          <strong>{email}</strong>
        </Typography>

        <TextField
          fullWidth
          label="Código de Verificação"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          variant="outlined"
          sx={{ mt: 1 }}
        />

        {mensagem && (
          <Typography
            variant="body2"
            sx={{
              color: erro ? "red" : "green",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {mensagem}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button onClick={onClose} color="inherit" disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={handleConfirmarCodigo}
          variant="contained"
          disabled={loading}
          sx={{ bgcolor: "#69819A", color: "#000", fontWeight: "bold" }}
        >
          {loading ? <CircularProgress size={20} /> : "Confirmar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalVerificarCodigo;