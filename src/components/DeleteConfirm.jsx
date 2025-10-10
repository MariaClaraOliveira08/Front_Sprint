import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";
import api from "../axios/axios"; // Certifique-se de importar sua instância do axios

export default function DeleteConfirm({
  open,
  avaliacao,
  onClose,
  onDelete,
  loading = false,
}) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      // Verifique se o id_avaliacao está presente
      if (!avaliacao?.id_avaliacao) {
        throw new Error("ID da avaliação não encontrado.");
      }

      // Realiza a requisição DELETE
      await api.delete(`/avaliacao/${avaliacao.id_avaliacao}`);
      onDelete(avaliacao.id_avaliacao); // Atualiza o estado no componente pai
      onClose(); // Fecha o diálogo
    } catch (error) {
      console.error("Erro ao deletar avaliação:", error);
      alert("Não foi possível deletar a avaliação.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar deleção</DialogTitle>
      <DialogContent>
        <Typography>
          Tem certeza que deseja deletar a avaliação de{" "}
          <strong>{avaliacao?.nome_estabelecimento}</strong> feita por{" "}
          <strong>{avaliacao?.usuario}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={deleting}>
          Cancelar
        </Button>
        <Button color="error" onClick={handleDelete} disabled={deleting}>
          {deleting ? "Deletando..." : "Deletar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
