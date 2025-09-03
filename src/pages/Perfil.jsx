import React from "react";
import { Box, TextField, Button, Avatar, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function Perfil() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#E0E0E0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 5,
        boxSizing: "border-box",
      }}
    >
      {/* Cabeçalho com gradiente */}
      <Box
        sx={{
          width: "100%",
          height: 150,
          background: "linear-gradient(to bottom, #8c9eff, #536dfe)",
          position: "relative",
        }}
      >
        <Avatar
          src="/path/to/your/image.jpg"
          alt="Foto do perfil"
          sx={{
            width: 120,
            height: 120,
            position: "absolute",
            bottom: -60,
            left: "50%",
            transform: "translateX(-50%)",
            border: "4px solid white",
          }}
        />
      </Box>

      {/* Formulário */}
      <Box
        sx={{
          width: "90%",
          maxWidth: 400,
          mt: 8,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <TextField
          label="Nome"
          defaultValue="Nino&Nina"
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Email"
          defaultValue="nino&nina@gmail.com"
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Senha"
          defaultValue="********"
          type="password"
          variant="outlined"
          fullWidth
        />

        {/* Botões */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            sx={{ backgroundColor: "#8c9eff", boxShadow: "0 3px 6px rgba(0,0,0,0.2)" }}
          >
            Editar perfil
          </Button>
          <Button
      variant="contained"
      startIcon={<ExitToAppIcon />}
      sx={{
        backgroundColor: "#8c9eff",
        boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
        ":hover": {
          backgroundColor: "#7b8dfc", 
        },
      }}
      onClick={() => navigate("/home")}
    >
      Sair
    </Button>
    
        </Box>

        {/* Botão de excluir */}
        <Button
          variant="outlined"
          sx={{ mt: 2, color: "red", borderColor: "red" }}
        >
          Excluir conta
        </Button>
      </Box>
    </Box>
  );
}

export default Perfil;
