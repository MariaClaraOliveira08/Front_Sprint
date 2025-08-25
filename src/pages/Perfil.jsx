import React from "react";
import { Box, TextField, Button, Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function Perfil() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#E0E0E0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center", 
        boxSizing: "border-box",
        p: 2,
      }}
    >
      {/* Card central */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 800,
          backgroundColor: "#E0E0E0",
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
          position: "relative",
        }}
      >
        {/* Avatar */}
        <Avatar
          src="/path/to/your/image.jpg"
          alt="Foto do perfil"
          sx={{
            width: 150,
            height: 150,
            mb: 4,
          }}
        />

        {/* Campos */}
        <TextField
          label="Nome"
          defaultValue="Nino&Nina"
          variant="outlined"
          fullWidth
          sx={{ mb: 3, borderRadius: 3 }}
        />
        <TextField
          label="Email"
          defaultValue="nino&nina@gmail.com"
          variant="outlined"
          fullWidth
          sx={{ mb: 3, borderRadius: 3 }}
        />
        <TextField
          label="Senha"
          defaultValue="********"
          type="password"
          variant="outlined"
          fullWidth
          sx={{ mb: 3, borderRadius: 3 }}
        />

        {/* Botões principais */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 4,
            mt: 2,
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            sx={{
              backgroundColor: "#7681A1",
              borderRadius: 5,
              px: 4,
              ":hover": { backgroundColor: "#5f6a8a" },
            }}
          >
            Editar perfil
          </Button>
          <Button
            variant="contained"
            startIcon={<ExitToAppIcon />}
            sx={{
              backgroundColor: "#7681A1",
              borderRadius: 5,
              px: 4,
              ":hover": { backgroundColor: "#5f6a8a" },
            }}
          >
            Sair
          </Button>
        </Box>

        {/* Botão excluir */}
        <Button
          variant="outlined"
          sx={{
            mt: 3,
            color: "red",
            borderColor: "red",
            borderRadius: 5,
            px: 6,
            fontWeight: "bold",
          }}
        >
          Excluir conta
        </Button>
      </Box>
    </Box>
  );
}

export default Perfil;