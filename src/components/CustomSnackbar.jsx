import React from "react";
import { Snackbar, Alert as MuiAlert } from "@mui/material";

export default function CustomSnackbar({ open, message, severity, onClose }) {
  return (
    <Snackbar
  open={open}
  autoHideDuration={3000}
  onClose={onClose}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
>

      <MuiAlert
        onClose={onClose}
        severity={severity || "success"}
        sx={{ width: "100%" }}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
}
