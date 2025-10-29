import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import api from "../axios/axios"; // sua instância do Axios

const ModalExcluirFavorito = ({ open, onClose, favorito, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);

  const handleExcluir = async () => {
    if (!favorito?.id_favorito) return;

    try {
      setLoading(true);
      setErro(false);
      setMensagem("");

      await api.delete(`/favoritos/${favorito.id_favorito}`);

      setMensagem("Favorito removido com sucesso!");
      setErro(false);

      setTimeout(() => {
        onSuccess(favorito.id_favorito);
        onClose();
      }, 1000);
    } catch (err) {
      console.error("Erro ao remover favorito:", err);
      setErro(true);
      setMensagem("Erro ao remover o favorito. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
        Excluir Favorito
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
          Deseja realmente excluir o local{" "}
          <strong>{favorito?.nome_estabelecimento}</strong> dos seus favoritos?
        </Typography>

        {mensagem && (
          <Typography
            variant="body2"
            sx={{
              color: erro ? "red" : "green",
              fontWeight: "bold",
              textAlign: "center",
              mt: 1,
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
          onClick={handleExcluir}
          variant="contained"
          disabled={loading}
          sx={{ bgcolor: "#69819A", color: "#000", fontWeight: "bold" }}
        >
          {loading ? <CircularProgress size={20} /> : "Excluir"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalExcluirFavorito;
