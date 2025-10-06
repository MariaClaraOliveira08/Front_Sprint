// 📁 src/components/SuccessUpdateSnackbar.jsx
import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SuccessUpdateSnackbar = ({ open, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
        Usuário atualizado com sucesso!
      </Alert>
    </Snackbar>
  );
};

export default SuccessUpdateSnackbar;
