import React from "react";
import { Modal, Box, Typography, Button, Fade, Backdrop } from "@mui/material";
import axios from "axios";

const ConfirmModal = ({ open, onClose, onConfirm, message, title }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 450 },
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ color: "#4a5a87", mb: 2 }}>
            {title || "Confirmar Ação"}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, textAlign: "center" }}>
            {message || "Você tem certeza?"}
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={onClose}
              sx={{ borderRadius: 2 }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={onConfirm}
              sx={{ borderRadius: 2 }}
            >
              Confirmar
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ConfirmModal;
