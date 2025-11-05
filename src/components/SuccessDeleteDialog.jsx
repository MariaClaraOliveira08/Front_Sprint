import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const SuccessDeleteDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontWeight: "bold", color: "red" }}>
        Conta excluída
      </DialogTitle>
      <DialogContent>
        Sua conta foi excluída com sucesso. Esperamos vê-lo novamente!
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={onClose}>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessDeleteDialog;